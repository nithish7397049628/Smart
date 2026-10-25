# Smart City 360 – Smart Civic Issue Reporting and Resolution System

> **Tagline:** *"Your Voice. Our City. A Better Tomorrow."*

Smart City 360 is an enterprise-grade, modern, and accessible civic technology web platform that bridges citizens and municipal authorities. It empowers citizens to report everyday civic problems (potholes, water leaks, power hazards, sewage overflows, fallen trees, garbage) with real GPS coordinates, interactive map pins, and photographic evidence, while providing government officials with a command centre to prioritize, route, and resolve issues transparently.

---

## 🌟 Key Innovative Features

### 1. Intelligent Community-Based Priority System (Main Innovation)
Removes arbitrary municipal prioritization through an automated 5-factor mathematical formula:

$$\text{Priority Score} = (\text{Frequency} \times 30\%) + (\text{Unresolved Backlog} \times 25\%) + (\text{Severity} \times 20\%) + (\text{Recency} \times 15\%) + (\text{Citizen Upvotes} \times 10\%)$$

- **Critical Priority (80–100):** Snapped high-voltage power cables, flooded residential basements, major road cavern collapses.
- **High Priority (60–79):** Broken water supply mains, missing traffic signals at busy intersections, fallen tree branches on wires.
- **Medium Priority (35–59):** Overflowing garbage dumpsters, extinguished streetlights, drainage blockages.
- **Low Priority (0–34):** Minor public park maintenance, cosmetic footpath repairs.
- **Dynamic Recalculation:** Scores adjust automatically whenever new citizen reports arrive, community members confirm an issue (+1 Upvote), or statuses transition.

### 2. Interactive Live Map (Leaflet.js + OpenStreetMap)
- Color-coded priority pins:
  - 🔴 **Red:** Critical-priority areas (Score 80–100)
  - 🟠 **Orange:** High-priority areas (Score 60–79)
  - 🟡 **Yellow:** Medium-priority areas (Score 35–59)
  - 🟢 **Green:** Low-priority areas (Score 0–34)
  - 🔵 **Blue:** Officially resolved complaints
- **Heatmap Layer:** Toggle between discrete marker pins and a continuous density heatmap layer (`leaflet.heat`) highlighting concentrated crisis zones across the city.
- **Priority Zone Flyers:** Sidebar drawer with quick-fly buttons for worst-affected areas (e.g. *T. Nagar Commercial Hub*, *Velachery Stormwater Basin*, *Tambaram Transit Junction*).
- **Search & Filter:** Instant search by landmark, neighbourhood name, or PIN code, plus category and priority filters.

### 3. Civic Complaint Registration & Real-Time Duplicate Detection
- Interactive Leaflet map point picker with draggable pin.
- **Browser Geolocation:** 1-click GPS lock with satellite accuracy.
- **Proactive Duplicate Detection:** As soon as coordinates or a category are picked, the system scans for unresolved issues within 300 metres and prompts the user to **"Support Existing Issue (+1)"** rather than cluttering municipal queues.
- Photo upload with file type/size validation (max 3 images, 5MB each).
- Automatic generation of unique alphanumeric Tracking ID (e.g. `SC360-2026-A8F2K`).

### 4. Complaint Status Tracking & Audit History
- Dedicated tracking page searchable by Tracking ID or Mobile Number.
- **7-Stage Lifecycle Stepper:**
  1. `Submitted` ➔ 2. `Acknowledged` ➔ 3. `Under Review` ➔ 4. `Assigned to Department` ➔ 5. `In Progress` ➔ 6. `Resolved` ➔ 7. `Closed`
- Displays assigned municipal department, official engineer remarks, and resolution proof photos.
- **Citizen Reopen Option:** If a problem remains unaddressed, citizens can reopen the ticket to alert senior municipal inspectors.
- Immutable audit log tracking every status transition with actor name and timestamps.

### 5. Community Reports Feed & DPDP Privacy Protection
- Public civic feed for browsing and confirming problems.
- Upvote counter that boosts an issue's priority score.
- **Strict Citizen Privacy:** In accordance with Digital Personal Data Protection standards, phone numbers and email addresses are masked from public view (e.g. `+91 984*****77`).

### 6. Government Officials & Administrator Portal
- **Telemetry Overview:** Real-time counters for Total, Pending, Review, In Progress, Resolved, and High-Priority tickets.
- **Chart.js Visualizations:**
  - Category Distribution (Doughnut chart)
  - Priority Distribution Index (Bar chart)
  - Department Workload & Resolution Performance (Horizontal bar)
- **Queue Management:** Filter, assign departments, update statuses, add engineer remarks, and upload resolution proof photos.
- **Government Department API Bridge:** Forwarding engine supporting 9 civic departments with simulated external gateway logging (`TANGEDCO`, `PWD`, `MCC`).
- **CSV Data Export:** 1-click download of filtered complaint records for administrative review.
- **Priority Algorithm Configurator:** Admin panel to adjust weights (frequency, unresolved, severity, recency, upvotes) and trigger instant recalculation.

### 7. Multilingual Support (6 Indian Languages)
Instant in-browser language switching without page reloads:
- English
- தமிழ் (Tamil)
- हिन्दी (Hindi)
- తెలుగు (Telugu)
- ಕನ್ನಡ (Kannada)
- മലയാളം (Malayalam)

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, Vanilla CSS3 (Custom Design Tokens, Navy/Teal palette, Glassmorphism), Modern JavaScript (ES6+), Leaflet.js (OpenStreetMap), Leaflet.heat, Chart.js.
- **Backend:** Node.js, Express.js, Multer (file uploads), JWT (JSON Web Tokens), Bcrypt.js (password hashing), CORS.
- **Database:**
  - **MySQL Mode:** Full enterprise MySQL schema (`backend/database/schema.sql`) and initial data (`seed.sql`) covering 13 tables.
  - **Embedded Local Persistence Mode:** Automatic file-backed JSON/SQL storage (`backend/database/data.json`) ensuring 100% zero-configuration execution if a MySQL service is not currently running.

---

## 📁 Project Structure

```
smart-city-360/
├── backend/
│   ├── config/
│   │   └── db.js                        # Database abstraction (MySQL & Local persistence)
│   ├── database/
│   │   ├── schema.sql                   # 13 relational MySQL tables
│   │   ├── seed.sql                     # Seed departments, categories, users, zones
│   │   └── data.json                    # Active persistent data store
│   ├── middleware/
│   │   └── authMiddleware.js            # JWT verification & role authorization
│   ├── routes/
│   │   ├── authRoutes.js                # Register, login, me
│   │   ├── complaintRoutes.js           # Complaint CRUD, upload, support, duplicates
│   │   ├── officialRoutes.js            # Status updates, Gov API bridge, CSV export
│   │   ├── settingsRoutes.js            # Admin weight calibration & gateway logs
│   │   └── statsRoutes.js               # Dynamic stats, charts data, heatmaps
│   ├── services/
│   │   ├── governmentIntegrationService.js # External e-Grievance routing
│   │   └── priorityService.js           # 5-factor scoring & spatial analytics
│   ├── uploads/                         # Stored complaint and resolution images
│   └── server.js                        # Express server entry point
├── frontend/
│   ├── index.html                       # Home page with hero, live stats & ranked cards
│   ├── report.html                      # Complaint registration & Leaflet pin picker
│   ├── map.html                         # Full-screen interactive map & heatmap
│   ├── priority.html                    # Priority areas & formula explanation
│   ├── track.html                       # Complaint tracking timeline & reopen ticket
│   ├── community.html                   # Public community feed & upvote support
│   ├── dashboard.html                   # Government officials portal & Chart.js
│   ├── login.html                       # Sign in with 1-click demo buttons
│   ├── register.html                    # Citizen account registration
│   ├── about.html                       # Vision, FAQ & DPDP privacy policy
│   ├── css/
│   │   ├── style.css                    # Design system (Navy/Teal/White/Grey)
│   │   └── responsive.css               # Tablet and mobile breakpoints
│   ├── js/
│   │   ├── app.js                       # Common utilities, auth state, modals, toasts
│   │   ├── i18n.js                      # 6-language translation dictionary engine
│   │   ├── map.js                       # Leaflet markers, clustering & heatmap layer
│   │   ├── report.js                    # Complaint submission & duplicate detection
│   │   ├── track.js                     # Lifecycle timeline & audit history
│   │   ├── community.js                 # Public feed search & live support votes
│   │   ├── dashboard.js                 # Charts, queue management & CSV export
│   │   └── auth.js                      # Auth controller & demo logins
│   └── assets/
│       └── images/                      # SVG logo, hero vector, and problem assets
├── .env.example                         # Environment configuration template
├── .env                                 # Local runtime configuration
├── package.json
└── README.md
```

---

## 🚀 Quick Start & Installation

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment (Optional)
The application includes a pre-configured `.env` set to `DB_TYPE=auto`. If you do not have MySQL installed, it will automatically run in zero-config file mode with all features working.

To connect to a live MySQL database:
1. Open MySQL and run `backend/database/schema.sql` and `backend/database/seed.sql`.
2. Edit `.env`:
   ```ini
   DB_TYPE=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=smart_city_360
   ```

### Step 3: Start the Web Server
```bash
npm start
```
The console will display:
```
⚡ Smart City 360 running in zero-config file storage mode (backed by backend/database/data.json).
================================================================
🚀 Smart City 360 Web Application is LIVE on port 3000
🌐 Local URL: http://localhost:3000
📍 Interactive Live Map: http://localhost:3000/map.html
📋 Report Issue: http://localhost:3000/report.html
🔍 Track Complaint: http://localhost:3000/track.html
🏛️ Officials Dashboard: http://localhost:3000/dashboard.html
================================================================
```

---

## 🔑 Demo Login Credentials

For testing and evaluation, the login page (`/login.html`) includes **1-Click Quick Demo Login Buttons**:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@smartcity360.gov.in` | `admin123` | Full control, weight tuner, logs, CSV export |
| **Municipal Official** | `official@smartcity360.gov.in` | `official123` | Queue updater, department assignment, resolution evidence |
| **Citizen** | `citizen@gmail.com` | `citizen123` | Submit issues, track complaints, upvote community reports |

---

## 🌐 Navigating the Web Application

- **Home Page (`/index.html`):** Dynamic counters, ranked community cards, how-it-works cycle, language picker.
- **Report a Problem (`/report.html`):** 15 categories, draggable Leaflet map pin, GPS geolocation, real-time duplicate warning, photo dropzone.
- **Interactive Live Map (`/map.html`):** Color-coded priority pins, heatmap toggle, zone flyers, marker popups with detail modal.
- **Priority Areas (`/priority.html`):** Formula breakdown, ranked neighbourhood tables, safety risk counters.
- **Track Complaint (`/track.html`):** 7-stage lifecycle stepper, resolution evidence photos, audit log, citizen reopen button.
- **Community Reports (`/community.html`):** Public civic grid with live upvote counter and privacy masking.
- **Government Dashboard (`/dashboard.html`):** Chart.js analytics, grievance queue, status updater modal, CSV export.
- **About, Privacy & FAQ (`/about.html`):** Municipal departments, DPDP Act privacy statement, citizen help FAQs.

---

## 🛡️ Security & Privacy Measures

1. **Digital Personal Data Protection (DPDP):** Citizen phone numbers and emails are masked in all public API responses.
2. **SQL Injection Prevention:** Parameterized queries in all MySQL interactions.
3. **Role-Based Access Control:** Administrative endpoints protected by JWT role verification.
4. **File Upload Security:** Multer checks MIME type (JPEG/PNG/WebP only) and enforces a strict 5MB limit.
5. **Anti-Spam Verification:** Prevents duplicate community upvotes from the same phone/IP address.
