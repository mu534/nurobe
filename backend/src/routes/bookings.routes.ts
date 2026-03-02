import { Router } from "express";
import { prisma } from "../../lib/prisma.ts";
import {
  sendBookingConfirmation,
  sendAdminNotification,
  sendCancellationEmail,
} from "../services/email.service.ts";

const router = Router();

function generateConfirmationNo(): string {
  return `NRB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

// ================= CREATE BOOKING (Public) =================
router.post("/", async (req, res) => {
  try {
    const {
      guestName,
      email,
      phone,
      specialRequests,
      roomId,
      checkIn,
      checkOut,
      guests,
    } = req.body;

    console.log("📥 Booking request received:", {
      guestName,
      email,
      roomId,
      checkIn,
      checkOut,
    });

    if (!guestName || !email || !phone || !roomId || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const room = await prisma.room.findUnique({
      where: { id: Number(roomId) },
    });
    if (!room) return res.status(404).json({ message: "Room not found" });
    if (!room.available)
      return res.status(400).json({ message: "Room is not available" });

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (nights <= 0) return res.status(400).json({ message: "Invalid dates" });

    const subtotal = room.price * nights;
    const tax = subtotal * 0.1;
    const totalPrice = subtotal + tax;

    let confirmationNo = generateConfirmationNo();
    while (await prisma.booking.findUnique({ where: { confirmationNo } })) {
      confirmationNo = generateConfirmationNo();
    }

    const booking = await prisma.booking.create({
      data: {
        confirmationNo,
        guestName,
        email,
        phone,
        specialRequests: specialRequests ?? "",
        roomId: Number(roomId),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: Number(guests),
        nights,
        subtotal,
        tax,
        totalPrice,
        status: "pending",
        paymentStatus: "unpaid",
      },
      include: { room: true },
    });

    await prisma.room.update({
      where: { id: Number(roomId) },
      data: { available: false },
    });

    console.log("✅ Booking created:", confirmationNo);
    console.log("📧 Attempting to send emails...");
    console.log("   RESEND_API_KEY set?", !!process.env.RESEND_API_KEY);
    console.log("   FROM_EMAIL:", process.env.FROM_EMAIL);
    console.log("   HOTEL_EMAIL:", process.env.HOTEL_EMAIL);
    console.log("   Sending confirmation to:", email);

    // Send emails — await them so we can catch errors clearly
    try {
      await sendBookingConfirmation({
        guestName,
        email,
        confirmationNo,
        roomName: room.name,
        checkIn,
        checkOut,
        nights,
        guests: Number(guests),
        subtotal,
        tax,
        totalPrice,
      });
      console.log("✅ Confirmation email sent to:", email);
    } catch (emailErr) {
      console.error("❌ Confirmation email FAILED:", emailErr);
    }

    try {
      await sendAdminNotification({
        guestName,
        email,
        phone,
        confirmationNo,
        roomName: room.name,
        checkIn,
        checkOut,
        nights,
        guests: Number(guests),
        totalPrice,
        specialRequests: specialRequests ?? "",
      });
      console.log("✅ Admin notification sent to:", process.env.HOTEL_EMAIL);
    } catch (emailErr) {
      console.error("❌ Admin notification FAILED:", emailErr);
    }

    res.status(201).json(booking);
  } catch (err) {
    console.error("❌ Booking creation failed:", err);
    res.status(500).json({ message: "Failed to create booking" });
  }
});

// ================= GET ALL BOOKINGS (Admin) =================
router.get("/", async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { room: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// ================= GET SINGLE BOOKING =================
router.get("/:id", async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(req.params.id) },
      include: { room: true },
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch booking" });
  }
});

// ================= UPDATE BOOKING STATUS (Admin) =================
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const booking = await prisma.booking.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(status ? { status } : {}),
        ...(paymentStatus ? { paymentStatus } : {}),
      },
      include: { room: true },
    });

    if (status === "cancelled") {
      await prisma.room.update({
        where: { id: booking.roomId },
        data: { available: true },
      });

      try {
        await sendCancellationEmail({
          guestName: booking.guestName,
          email: booking.email,
          confirmationNo: booking.confirmationNo,
          roomName: booking.room.name,
          checkIn: booking.checkIn.toISOString(),
          checkOut: booking.checkOut.toISOString(),
        });
        console.log("✅ Cancellation email sent to:", booking.email);
      } catch (emailErr) {
        console.error("❌ Cancellation email FAILED:", emailErr);
      }
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update booking" });
  }
});

// ================= DELETE BOOKING (Admin) =================
router.delete("/:id", async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(req.params.id) },
      include: { room: true },
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await prisma.booking.delete({ where: { id: Number(req.params.id) } });

    await prisma.room.update({
      where: { id: booking.roomId },
      data: { available: true },
    });

    res.json({ message: "Booking deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete booking" });
  }
});

export default router;
