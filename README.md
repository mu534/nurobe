# 🏨 Nurobe Hotel

A full-stack hotel management and booking system built with React, Node.js, Express, Prisma, and PostgreSQL. Includes admin dashboard, room management, booking system, email notifications, and Google OAuth authentication.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Email Notifications](#email-notifications)
- [Admin Dashboard](#admin-dashboard)
- [Deployment](#deployment)

---

## ✨ Features

### Guest Features
- Browse available rooms with filtering by type, price, and guests
- View detailed room information with amenities and images
- Book rooms without requiring an account
- Receive booking confirmation emails with confirmation code
- Google OAuth sign-in
- Email/password registration and login

### Admin Features
- Secure admin dashboard with role-based access
- Room management — create, edit, delete rooms with image uploads
- Booking management — view, confirm, cancel bookings
- Payment tracking — revenue overview, monthly charts
- Email notifications for new bookings and cancellations
- Export booking data as CSV

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| Recharts | Dashboard charts |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | API server |
| TypeScript | Type safety |
| Prisma ORM | Database access |
| PostgreSQL | Database |
| JWT | Authentication tokens |
| Passport.js | Google OAuth strategy |
| Bcrypt | Password hashing |
| Cloudinary | Image storage |
| Resend | Transactional emails |
| Multer | File upload handling |

---

## 📁 Project Structure

```
nurobe/
├── frontend/                   # React application
│   ├── src/
│   │   ├── api/                # API call functions
│   │   │   ├── index.ts        # Axios instance
│   │   │   ├── rooms.ts        # Room API calls
│   │   │   └── bookings.ts     # Booking API calls
│   │   ├── app/
│   │   │   ├── components/     # Reusable UI components
│   │   │   │   ├── NavBar.tsx
│   │   │   │   ├── admin/      # Admin-specific components
│   │   │   │   └── ...
│   │   │   └── pages/          # Page components
│   │   │       ├── LandingPage.tsx
│   │   │       ├── RoomsPage.tsx
│   │   │       ├── RoomDetails.tsx
│   │   │       ├── BookingPage.tsx
│   │   │       ├── LoginPage.tsx
│   │   │       ├── AuthCallbackPage.tsx
│   │   │       └── admin/
│   │   │           ├── AdminDashboard.tsx
│   │   │           ├── AdminRooms.tsx
│   │   │           ├── AdminBookings.tsx
│   │   │           └── AdminPayments.tsx
│   │   ├── context/
│   │   │   ├── AuthContext.tsx  # Auth context + hook
│   │   │   ├── AuthProvider.tsx # Auth state provider
│   │   │   └── auth.types.ts   # Auth type definitions
│   │   ├── types/
│   │   │   └── types.ts        # Shared types (Room, Booking)
│   │   ├── App.tsx             # Routes
│   │   └── main.tsx            # Entry point
│   └── package.json
│
├── backend/                    # Express API server
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── rooms.routes.ts
│   │   │   ├── bookings.routes.ts
│   │   │   └── payments.routes.ts
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts  # JWT + admin guard
│   │   ├── services/
│   │   │   └── email.service.ts    # Resend email templates
│   │   ├── lib/
│   │   │   └── prisma.ts           # Prisma client instance
│   │   ├── passport.config.ts      # Google OAuth strategy
│   │   └── server.ts               # Express app entry
│   ├── prisma/
│   │   └── schema.prisma           # Database schema
│   └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Cloudinary account
- Resend account
- Google Cloud Console project (for OAuth)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/nurobe-hotel.git
cd nurobe-hotel
```

### 2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Set up environment variables
Create `.env` files in both `frontend/` and `backend/` directories (see [Environment Variables](#environment-variables) section).

### 4. Set up the database
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 5. Create admin user
```sql
-- Run this in your PostgreSQL database
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-admin@email.com';
```

Or register first, then update via Prisma Studio:
```bash
npx prisma studio
```

### 6. Run the development servers

```bash
# Backend (from /backend)
npm run dev

# Frontend (from /frontend)
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/nurobe_db

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BACKEND_URL=http://localhost:5000
CLIENT_URL=http://localhost:5173

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend (emails)
RESEND_API_KEY=re_your_resend_api_key
FROM_EMAIL=onboarding@resend.dev
HOTEL_EMAIL=your-hotel@email.com
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🗄 Database Setup

### Schema Overview

```prisma
model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  password  String    @default("")
  phone     String    @default("")
  role      String    @default("USER")   # "USER" or "ADMIN"
  avatar    String?                       # Google profile photo URL
  googleId  String?   @unique
  createdAt DateTime  @default(now())
  bookings  Booking[]
}

model Room {
  id        Int       @id @default(autoincrement())
  name      String
  type      String
  price     Float
  maxGuests Int
  size      String
  bedType   String
  available Boolean   @default(true)
  image     String                        # comma-separated Cloudinary URLs
  amenities String    @default("WiFi,TV,Air Conditioning,Private Bathroom,Room Service")
  bookings  Booking[]
}

model Booking {
  id              Int      @id @default(autoincrement())
  confirmationNo  String   @unique       # e.g. NRB-A1B2C3D4E
  guestName       String
  email           String
  phone           String
  specialRequests String   @default("")
  checkIn         DateTime
  checkOut        DateTime
  guests          Int
  nights          Int
  subtotal        Float
  tax             Float
  totalPrice      Float
  status          String   @default("pending")   # pending | confirmed | checked-in | completed | cancelled
  paymentStatus   String   @default("unpaid")    # unpaid | paid | refunded
  roomId          Int
  userId          Int?
}
```

### Run migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 📡 API Reference

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login with email/password |
| GET | `/api/auth/google` | Public | Start Google OAuth flow |
| GET | `/api/auth/google/callback` | Public | Google OAuth callback |
| GET | `/api/auth/me` | Public | Verify token, get user |

### Rooms
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/rooms` | Public | Get all rooms |
| GET | `/api/rooms/:id` | Public | Get single room |
| POST | `/api/rooms` | Admin | Create room (with images) |
| PUT | `/api/rooms/:id` | Admin | Update room |
| DELETE | `/api/rooms/:id` | Admin | Delete room |

### Bookings
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/bookings` | Public | Create booking |
| GET | `/api/bookings` | Admin | Get all bookings |
| GET | `/api/bookings/:id` | Admin | Get single booking |
| PATCH | `/api/bookings/:id/status` | Admin | Update booking status |
| DELETE | `/api/bookings/:id` | Admin | Delete booking |

---

## 🔑 Authentication

The app uses **JWT-based authentication** with two roles:

| Role | Access |
|------|--------|
| `USER` | Browse rooms, make bookings, view profile |
| `ADMIN` | Full access including admin dashboard |

### Token Flow
1. User logs in → backend returns JWT token
2. Frontend stores token in `localStorage`
3. All protected requests include `Authorization: Bearer <token>` header
4. `authMiddleware` verifies token on protected routes
5. `adminMiddleware` checks `role === "ADMIN"` on admin routes

### Google OAuth Flow
1. User clicks "Continue with Google"
2. Frontend redirects to `/api/auth/google`
3. Passport redirects to Google consent screen
4. Google redirects to `/api/auth/google/callback`
5. Backend creates/updates user, generates JWT
6. Backend redirects to `/auth/callback?token=...`
7. Frontend stores token, updates auth state

---

## 📧 Email Notifications

Powered by **Resend**. Three email types are sent automatically:

| Email | Trigger | Recipient |
|-------|---------|-----------|
| Booking Confirmation | Guest creates booking | Guest |
| Admin Notification | Guest creates booking | Hotel admin |
| Cancellation | Admin cancels booking | Guest |

### Development Note
During development with `onboarding@resend.dev`, emails only deliver to your Resend signup email. To send to any email, verify your domain at [resend.com](https://resend.com).

---

## 🖥 Admin Dashboard

Access at `/admin` — requires `ADMIN` role.

### Pages
- **Dashboard** — booking stats, monthly revenue chart, recent bookings
- **Rooms** — create/edit/delete rooms with Cloudinary image upload
- **Bookings** — manage all bookings, update status, send cancellation emails
- **Payments** — revenue overview, payment status tracking, CSV export

### Creating an Admin Account
1. Register normally at `/login`
2. Update your role in the database:
```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
```

---

## ☁️ Deployment

### Backend (Railway / Render)
1. Push code to GitHub
2. Connect repo to Railway or Render
3. Add all environment variables
4. Set build command: `npm install && npx prisma generate`
5. Set start command: `npm start`

### Frontend (Vercel / Netlify)
1. Push code to GitHub
2. Connect repo to Vercel
3. Set `VITE_API_URL` to your deployed backend URL
4. Deploy

### After Deploying
- Update `CLIENT_URL` and `BACKEND_URL` in backend env
- Update Google OAuth authorized redirect URI in Google Cloud Console
- Verify your sending domain on Resend for production emails

---

## 📄 License

MIT License — feel free to use this project as a template.

---

## 👤 Author

Built by **Mudasir Najimudin**
