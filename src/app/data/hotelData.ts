export interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
  amenities: string[];
  maxGuests: number;
  size: string;
  bedType: string;
  available: boolean;
  gallery: string[];
}

export interface Booking {
  id: number;
  guestName: string;
  email: string;
  roomId: number;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "checked-in" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
}

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  date: string;
  method: string;
  status: string;
}

export const rooms: Room[] = [
  {
    id: 1,
    name: "Standard Room",
    type: "standard",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1638277000768-005d326db4b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NzA1NDYzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Comfortable and cozy room perfect for solo travelers or couples. Features modern amenities and a peaceful atmosphere.",
    amenities: [
      "WiFi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
      "Room Service",
    ],
    maxGuests: 2,
    size: "25 m²",
    bedType: "Queen Bed",
    available: true,
    gallery: [
      "https://images.unsplash.com/photo-1638277000768-005d326db4b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NzA1NDYzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWx1eGUlMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzcwNTgwOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 2,
    name: "Deluxe Room",
    type: "deluxe",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWx1eGUlMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzcwNTgwOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Spacious deluxe room with premium amenities and stunning views. Ideal for a luxurious stay.",
    amenities: [
      "WiFi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
      "Room Service",
      "Balcony",
      "Breakfast Included",
    ],
    maxGuests: 3,
    size: "35 m²",
    bedType: "King Bed",
    available: true,
    gallery: [
      "https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWx1eGUlMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzcwNTgwOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1638277000768-005d326db4b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NzA1NDYzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 3,
    name: "Executive Suite",
    type: "suite",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1758448511255-ac2a24a135d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4ZWN1dGl2ZSUyMHN1aXRlfGVufDF8fHx8MTc3MDU3MTQyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Elegant executive suite with separate living area, perfect for business travelers or those seeking extra comfort.",
    amenities: [
      "WiFi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
      "Room Service",
      "Balcony",
      "Breakfast Included",
      "Work Desk",
      "Coffee Maker",
    ],
    maxGuests: 3,
    size: "50 m²",
    bedType: "King Bed",
    available: true,
    gallery: [
      "https://images.unsplash.com/photo-1758448511255-ac2a24a135d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4ZWN1dGl2ZSUyMHN1aXRlfGVufDF8fHx8MTc3MDU3MTQyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWx1eGUlMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzcwNTgwOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 4,
    name: "Family Room",
    type: "family",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1765852550350-be1815fe67ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGZhbWlseSUyMHJvb218ZW58MXx8fHwxNzcwNjA3OTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Spacious family room with multiple beds, perfect for families traveling together. Comfortable and child-friendly.",
    amenities: [
      "WiFi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
      "Room Service",
      "Breakfast Included",
      "Extra Bed Available",
    ],
    maxGuests: 5,
    size: "45 m²",
    bedType: "2 Queen Beds",
    available: true,
    gallery: [
      "https://images.unsplash.com/photo-1765852550350-be1815fe67ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGZhbWlseSUyMHJvb218ZW58MXx8fHwxNzcwNjA3OTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1638277000768-005d326db4b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NzA1NDYzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 5,
    name: "Presidential Suite",
    type: "suite",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1748652252546-6bea5d896bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHByZXNpZGVudGlhbCUyMHN1aXRlfGVufDF8fHx8MTc3MDU1MjMxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "The ultimate luxury experience. Our presidential suite offers unmatched comfort, panoramic views, and exclusive amenities.",
    amenities: [
      "WiFi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
      "Room Service",
      "Balcony",
      "Breakfast Included",
      "Work Desk",
      "Coffee Maker",
      "Jacuzzi",
      "Butler Service",
    ],
    maxGuests: 4,
    size: "80 m²",
    bedType: "King Bed + Sofa Bed",
    available: true,
    gallery: [
      "https://images.unsplash.com/photo-1748652252546-6bea5d896bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHByZXNpZGVudGlhbCUyMHN1aXRlfGVufDF8fHx8MTc3MDU1MjMxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758448511255-ac2a24a135d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGV4ZWN1dGl2ZSUyMHN1aXRlfGVufDF8fHx8MTc3MDU3MTQyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: 6,
    name: "Standard Plus",
    type: "standard",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1638277000768-005d326db4b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NzA1NDYzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Enhanced standard room with additional amenities and more space. Great value for comfort-seeking guests.",
    amenities: [
      "WiFi",
      "TV",
      "Air Conditioning",
      "Private Bathroom",
      "Mini Bar",
      "Room Service",
      "Breakfast Included",
    ],
    maxGuests: 2,
    size: "30 m²",
    bedType: "Queen Bed",
    available: false,
    gallery: [
      "https://images.unsplash.com/photo-1638277000768-005d326db4b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJlZHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NzA1NDYzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];

export const bookings: Booking[] = [
  {
    id: 1,
    guestName: "Abebe Kebede",
    email: "abebe@email.com",
    roomId: 1,
    roomName: "Standard Room",
    checkIn: "2026-02-15",
    checkOut: "2026-02-18",
    guests: 2,
    totalPrice: 240,
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: 2,
    guestName: "Sara Mohamed",
    email: "sara@email.com",
    roomId: 3,
    roomName: "Executive Suite",
    checkIn: "2026-02-20",
    checkOut: "2026-02-25",
    guests: 2,
    totalPrice: 1000,
    status: "pending",
    paymentStatus: "pending",
  },
  {
    id: 3,
    guestName: "Daniel Tesfaye",
    email: "daniel@email.com",
    roomId: 2,
    roomName: "Deluxe Room",
    checkIn: "2026-02-10",
    checkOut: "2026-02-12",
    guests: 2,
    totalPrice: 240,
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: 4,
    guestName: "Meron Assefa",
    email: "meron@email.com",
    roomId: 4,
    roomName: "Family Room",
    checkIn: "2026-02-14",
    checkOut: "2026-02-16",
    guests: 4,
    totalPrice: 300,
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: 5,
    guestName: "Yonas Girma",
    email: "yonas@email.com",
    roomId: 5,
    roomName: "Presidential Suite",
    checkIn: "2026-03-01",
    checkOut: "2026-03-05",
    guests: 2,
    totalPrice: 1400,
    status: "pending",
    paymentStatus: "pending",
  },
];

export const payments: Payment[] = [
  {
    id: 1,
    bookingId: 1,
    amount: 240,
    date: "2026-02-10",
    method: "Credit Card",
    status: "Completed",
  },
  {
    id: 2,
    bookingId: 3,
    amount: 240,
    date: "2026-02-08",
    method: "Bank Transfer",
    status: "Completed",
  },
  {
    id: 3,
    bookingId: 4,
    amount: 300,
    date: "2026-02-12",
    method: "Credit Card",
    status: "Completed",
  },
];
