# 🎬 StudioSpace — Creative Workspace Sharing Platform

<p align="center">
  <b>Discover. Book. Create.</b>
  <br />
  A dedicated marketplace for creators to discover, explore, and reserve professional creative spaces.
</p>

<p align="center">
  <a href="YOUR_LIVE_SITE_URL">
    <img src="https://img.shields.io/badge/Live%20Website-Visit%20StudioSpace-6366F1?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Website" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Express.js-Backend-404D59?style=for-the-badge&logo=express" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

---

## 📖 Overview

**StudioSpace** is a full-stack peer-to-peer creative workspace sharing platform designed for filmmakers, photographers, podcasters, musicians, audio engineers, and visual artists.

Finding the right production environment can be challenging. StudioSpace bridges this gap by connecting creative professionals with studio owners who offer specialized spaces for different production needs.

Whether someone needs a professional photography studio, a cinema soundstage, a podcast lounge, a music recording suite, or an art workshop, StudioSpace makes discovering and reserving the perfect workspace simple and convenient.

The platform provides a seamless experience for both creators and studio hosts through dynamic studio discovery, secure authentication, comprehensive listing management, and a collision-resistant booking system.

**Our goal is simple: Give every creator access to the right space to bring their ideas to life.**

## ✨ Key Features

### 🔍 Dynamic Studio Discovery
- Explore creative workspaces through an interactive studio catalog.
- Browse studios by category, including Photo Studios, Film Stages, Podcast Lounges, Music Suites, and Art Workshops.
- View detailed studio information, pricing, location, ratings, and available amenities.
- Discover featured studios through the homepage showcase.

### 📅 Smart Booking & Reservation Management
- Reserve creative workspaces with flexible date and time selection.
- Real-time booking conflict validation to prevent overlapping reservations.
- Automatic booking duration and total cost calculation.
- Manage personal reservations through a dedicated My Bookings dashboard.
- Track booking statuses, including Pending, Confirmed, Completed, and Cancelled.

### 🏢 Studio Listing Management (CRUD)
- Hosts can create and publish their own studio listings.
- Update existing studio information and workspace details.
- Delete listings with a confirmation dialog.
- Manage hourly rates, security deposits, capacity, amenities, and studio images.
- View and manage personally owned listings through My Listings.

### 🔐 Secure Authentication & Authorization
- User authentication powered by Better Auth.
- Google authentication support where configured.
- JWT-based server-side authorization.
- Secure HTTPOnly cookie-based token storage.
- Protected API endpoints using custom authentication middleware.
- Persistent authenticated sessions across page reloads.

### 🎨 Personalized User Experience
- Fully responsive interface for desktop, tablet, and mobile.
- Light and dark theme customization.
- Consistent typography, card layouts, and reusable UI components.
- Interactive hero slider and studio showcase.
- Modern toast notifications for success and error feedback.
- Custom loading skeletons and empty states.

### ⚡ Additional Highlights
- Interactive studio gallery and amenity presentation.
- Host and creator information management.
- Dynamic studio pricing and booking summaries.
- MongoDB-powered data persistence.
- Image hosting integration with ImgBB.
- Custom confirmation dialogs and user-friendly error handling.

---


## 🛠️ Technology Stack

StudioSpace is built using a modern full-stack JavaScript architecture.

### Frontend
| Technology | Purpose |
|---|---|
| Next.js (App Router) | Frontend framework and routing |
| React 19 | Component-based UI development |
| Tailwind CSS | Utility-first styling |
| DaisyUI | UI components and themes |
| Swiper.js | Interactive hero slider |
| Better Auth | Client-side authentication |
| React Hot Toast | Notification management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | RESTful API development |
| MongoDB Atlas | Database and data persistence |
| MongoDB Native Driver | Database operations |
| JSON Web Token (JWT) | Server-side authorization |
| Cookie Parser | HTTP cookie management |
| CORS | Cross-origin request handling |
| dotenv | Environment configuration |

### Third-Party Services
- **ImgBB:** Image hosting and upload management.
- **MongoDB Atlas:** Cloud database infrastructure.
- **Vercel / Render:** Application deployment.

---

## 🏗️ Project Architecture

StudioSpace follows a separated client-server architecture, keeping frontend presentation and backend business logic independent.

```text
StudioSpace/
│
├── studiospace-client/             # Next.js Frontend
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── add-studio/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── my-bookings/
│   │   │   ├── my-listings/
│   │   │   ├── studios/
│   │   │   │   ├── [id]/
│   │   │   │   └── edit/[id]/
│   │   │   ├── layout.jsx
│   │   │   └── page.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── AutoTokenSync.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroSlider.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── StudioCard.jsx
│   │   │   └── ThemeToggle.jsx
│   │   │
│   │   └── lib/
│   │       └── auth-client.js
│   │
│   └── package.json
│
└── cat-harry-server/                # Express.js Backend
    │
    ├── middlewares/
    │   └── verifyToken.js
    │
    ├── routes/
    │   ├── bookings.js
    │   └── studios.js
    │
    ├── index.js
    └── package.json
```

---

## 🔒 Security & Booking Logic

One of the most important technical aspects of StudioSpace is its booking conflict prevention mechanism.

### 1. JWT Authentication with HTTPOnly Cookies

To protect sensitive server-side operations, StudioSpace uses JWT-based authentication.

The authentication flow:

1. A user authenticates through Better Auth.
2. The client synchronizes the authenticated session with the backend.
3. The backend issues a signed JWT.
4. The JWT is stored inside a secure HTTPOnly cookie.
5. Protected API endpoints validate the token through custom middleware.
6. Unauthorized requests are rejected with an appropriate HTTP 401 response.

This approach helps prevent client-side JavaScript from directly accessing the authentication token.

### 2. Collision-Free Booking System

StudioSpace implements a time-overlap validation mechanism to prevent double-booking of the same studio.

Before saving a reservation, the backend checks whether an existing Pending or Confirmed booking overlaps with the requested time slot.

**Time Overlap Condition:**

An existing reservation conflicts with a requested reservation when:

```text
Existing Start Time < Requested End Time

AND

Existing End Time > Requested Start Time
```

**MongoDB Implementation:**

```javascript
const conflictingBooking = await bookingsCollection.findOne({
  studioId: studioId,
  bookingDate: bookingDate,

  status: { $in: ["Confirmed", "Pending"] },

  $and: [
    { startTime: { $lt: endTime } },
    { endTime: { $gt: startTime } },
  ],
});

if (conflictingBooking) {
  return res.status(409).json({
    message: `Collision detected: reserved between ${conflictingBooking.startTime} and ${conflictingBooking.endTime}.`,
  });
}
```

If an overlapping reservation exists, the booking request is rejected with HTTP 409 Conflict.

This validation helps ensure that the same studio cannot be reserved for overlapping time slots.

---

## 🔗 API Endpoints

### Authentication & Token Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/jwt` | Issues an HTTPOnly JWT cookie |
| POST | `/api/auth/logout` | Clears the authentication cookie |
| PATCH | `/api/auth/update-profile` | Updates user profile information |

### Studios

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/studios` | Retrieve all studios | Public |
| GET | `/api/studios/:id` | Retrieve studio details | Public |
| GET | `/api/studios/my-listings` | Retrieve user's listings | Private |
| POST | `/api/studios` | Create a new studio | Private |
| PUT | `/api/studios/:id` | Update a studio | Private |
| DELETE | `/api/studios/:id` | Delete a studio | Private |

### Bookings

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/bookings/user` | Retrieve user reservations | Private |
| POST | `/api/bookings` | Create a studio reservation | Private |
| PATCH | `/api/bookings/:id/cancel` | Cancel a reservation | Private |

---

## ⚙️ Installation & Local Development

Follow these instructions to run StudioSpace on your local machine.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- An ImgBB API key

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL

cd StudioSpace
```

### 2. Backend Configuration

Navigate to the backend directory:

```bash
cd cat-harry-server

npm install
```

Create a `.env` file inside the `cat-harry-server` directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secure_jwt_secret

NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

Backend server:

```text
http://localhost:5000
```

### 3. Frontend Configuration

Open another terminal and navigate to the frontend directory:

```bash
cd studiospace-client

npm install
```

Create a `.env.local` file inside the `studiospace-client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

BETTER_AUTH_URL=http://localhost:3000
```

Start the frontend application:

```bash
npm run dev
```

Frontend application:

```text
http://localhost:3000
```

### 4. Open the Application

Visit the following URL in your browser:

**http://localhost:3000**

You are now ready to explore StudioSpace locally!

---

## 🧪 Demo & Examiner Credentials

Use the following credentials to explore the application's authenticated features.

| Account | Email | Password |
|---|---|---|
| Demo User | YOUR_DEMO_EMAIL | YOUR_DEMO_PASSWORD |
| Demo Host | YOUR_HOST_EMAIL | YOUR_HOST_PASSWORD |

> Replace these placeholders with your actual test account credentials before publishing the repository. Never expose private production credentials.

---

## 🚀 Future Improvements

StudioSpace has room to grow with additional creator-focused features.

Some potential enhancements include:

- [ ] PDF booking invoice generation.
- [ ] Saved studios and personalized wishlists.
- [ ] Advanced studio availability calendar.
- [ ] Online payment gateway integration.
- [ ] Enhanced host verification system.
- [ ] Advanced studio reviews and ratings.
- [ ] Email and booking status notifications.

---

## 👨‍💻 Developer

**Developed with ❤️ by Sajib Kumar Saha**

Computer Science & Engineering Graduate | Full-Stack Web Development Enthusiast | Passionate SQA Engineer

<p align="left">
  <a href="YOUR_GITHUB_PROFILE_URL">
    <img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
  <a href="YOUR_LINKEDIN_PROFILE_URL">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn" />
  </a>
</p>

---

<p align="center">
  <b>StudioSpace — Your Space. Your Vision. Your Creation.</b>
  <br />
  Made for creators, built for creativity. 🎬
</p>
