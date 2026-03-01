import { Router } from "express";
import { prisma } from "../../lib/prisma.ts";

const router = Router();

// ================= Helper =================
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

    // Generate unique confirmation number
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

    // Mark room as unavailable
    await prisma.room.update({
      where: { id: Number(roomId) },
      data: { available: false },
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
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

    // If cancelled, mark room as available again
    if (status === "cancelled") {
      await prisma.room.update({
        where: { id: booking.roomId },
        data: { available: true },
      });
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
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await prisma.booking.delete({ where: { id: Number(req.params.id) } });

    // Free up the room
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
