# Campus Pulse — QR-Based Smart Campus Navigation Platform

> **Hackverse 2026 Submission Repository**

---

## 📌 Repository Information

- **Team ID:** `HV2026-TEAM-CAMPUSPULSE`
- **Team Name:** `Team Campus Pulse`
- **Problem Statement ID:** `HV2026-PS-042` (Smart Campus & Indoor Navigation System)
- **Problem Statement Title:** QR-Based Indoor Campus Navigation & Accessibility Infrastructure

---

## 🚀 Project Description

**Campus Pulse** is a full-stack smart campus navigation platform engineered to eliminate indoor navigation confusion for university students, faculty, visitors, and individuals with disabilities. 

### Key Features:
- 📷 **Instant QR Anchor Positioning**: Scan physical QR placement tags affixed to main gates, library doors, or lecture halls to establish indoor location coordinates without GPS drift.
- 🧭 **Dijkstra Shortest Path Engine**: Calculates optimal turn-by-turn walking directions between 10 major campus hubs across 17 network corridors.
- ♿ **Wheelchair Accessibility Mode**: Filters out staircases and steep paths, automatically rerouting users along ramps, wide automated doors, and elevators.
- ⚠️ **Dynamic Route Detour Handling**: Real-time corridor closure management automatically bypasses active maintenance zones or temporary hazards.
- 🤖 **Smart Campus Assistant**: Natural language intent recognition engine (*"I need a quiet place to study"*, *"Where is emergency medical aid?"*) with instant route calculation.
- 🍃 **Green & Modern UI Aesthetics**: Clean mint green & sky blue sustainability palette with fluid mobile-responsive map controls.
- 🔒 **Role-Based Authentication**: Dual-tab Sign In / Sign Up portal with JWT access control and protected routes.

---

## 🛠️ Technologies Used

### Frontend:
- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS + Vanilla CSS Tokens
- **Mapping:** Leaflet.js + OpenStreetMap SVG Graph Canvas
- **QR Scanner:** html5-qrcode
- **Icons:** Lucide React Icons
- **HTTP Client:** Axios

### Backend:
- **Runtime:** Node.js + Express.js
- **Database:** MongoDB + Mongoose (with embedded MongoMemoryServer & In-Memory fallback)
- **Authentication:** JSON Web Tokens (JWT) + Bcrypt.js
- **Algorithms:** Graph-Based Dijkstra Shortest Path Engine

---

## 📁 Repository File Structure

```
HV2026-TEAM-CAMPUSPULSE/
│
├── README.md                 # Primary project documentation (Hackverse 2026 spec)
├── .gitignore                # Git ignore rules
│
├── frontend/                 # React + Vite + Tailwind CSS Frontend App
│   ├── src/                  # Source code (Components, Context, Pages, Services)
│   └── vite.config.js        # Vite configuration
│
├── backend/                  # Node.js + Express REST API & Dijkstra Engine
│   ├── src/                  # Controllers, Models, Routes, Services
│   ├── server.js             # REST API entry point (Port 5000)
│   ├── test.js               # Backend automated test suite
│   └── .env                  # MongoDB Atlas URI & JWT secret configuration
│
├── database/                 # Database Schemas & Seeding Scripts
│   ├── seed.js               # MongoDB collection populator script
│   └── schema.md             # Mongoose collection schemas documentation
│
├── tests/                    # Project Test Suites & Automated Tests
│   └── test-runner.js        # Global test execution script
│
├── assets/                   # Static Media & Printable QR Tags
│   └── qr-anchors/           # Printable physical QR tags for campus doors
│
├── docs/                     # Documentation & Architecture Diagrams
│   ├── project-report.md     # Detailed technical report
│   └── architecture.md       # System architecture & data flow diagrams
│
└── deployment/               # Deployment & Container Configuration
    └── deployment-guide.md   # Production deployment instructions
```

---

## 🔧 Setup Instructions

### Prerequisites:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/team-campus-pulse/campus-pulse-app.git
   cd campus-pulse-app
   ```

2. **Install Root Monorepo & Service Dependencies:**
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

---

## 🏃 Run Instructions

### 1. Start Full-Stack Application (Simultaneous Dev Mode):
From the root directory, run:
```bash
npm run dev
```
- **Frontend App**: `http://localhost:3000`
- **Backend REST API**: `http://localhost:5000/api`

### 2. Seed Database (Optional):
To seed or reset your MongoDB Atlas cloud database:
```bash
cd backend
node seed.js
```

### 3. Run Automated Tests:
```bash
cd backend
node test.js
```

---

## 👥 Team Members

| Name | Role | Email |
| :--- | :--- | :--- |
| **Nikhil (Team Lead)** | Full-Stack Developer & UI Designer | `nikhil@campus.edu` |
| **Alex Johnson** | Backend & Dijkstra Navigation Engineer | `alex@campus.edu` |
| **Sarah Jenkins** | Frontend & Accessibility Lead | `sarah@campus.edu` |

---

## 🌐 Demo / Deployment Information

- **Frontend Development Server:** `http://localhost:3000`
- **Backend Express REST API:** `http://localhost:5000/api`
- **MongoDB Atlas Cluster:** `cluster0.p3wjozu.mongodb.net/campus_pulse`
- **Demo Credentials:**
  - **Admin Login:** `admin@campus.edu` / `admin123`
  - **Student Login:** `alex@campus.edu` / `student123`
