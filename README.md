# Tuitron

### Tuitions Management Platform

Tuitron is a modern tuition management platform designed to connect students with tutors. Students can explore available tutors, browse tuition opportunities, apply for tutoring jobs, manage their tuition requests, and make payments through the platform.

Tutors can create their profiles, discover suitable tuition opportunities, submit applications, and manage their tutoring activities through a dedicated dashboard.

The platform also provides administrative tools for managing users, tutors, tuition listings, applications, and platform activities.

---

## Features

### 👨‍🎓 Student

* Create an account and log in
* Browse available tuitions
* View detailed tuition information
* Apply for suitable tutors
* Manage personal tuition listings
* View approved tutors
* Track payment history
* Make tuition payments
* View tutor profiles
* Social login support
* Manage account authentication

### 👨‍🏫 Tutor

* Register as a tutor
* Create and manage tutor profile
* Browse available tuition opportunities
* Apply for tuition jobs
* View applied tuitions
* Track application status
* Manage approved tuition opportunities
* Access tutor dashboard
* View relevant platform information

### 🛡️ Admin

* Admin dashboard
* User management
* Manage tutors
* Review tutor applications
* Approve tutors
* Manage platform users
* Monitor platform statistics
* Manage tuition-related activities

### 🎨 User Interface

* Responsive design
* Modern dashboard layouts
* Dark/light theme support
* Reusable UI components
* Animated sections
* Responsive navigation
* Toast notifications
* Modal dialogs
* Form validation
* Interactive cards and sections

---

## Technology Stack

### Frontend

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| React 19       | UI development             |
| Vite 7         | Development and build tool |
| React Router 7 | Client-side routing        |
| Tailwind CSS 4 | Styling                    |
| Framer Motion  | Animations                 |
| AOS            | Scroll animations          |
| Lucide React   | Icons                      |
| React Icons    | Additional icons           |
| Swiper         | Sliders and carousels      |

### Data & API

| Technology     | Purpose                                   |
| -------------- | ----------------------------------------- |
| Axios          | HTTP requests                             |
| TanStack Query | Server-state management and data fetching |
| Firebase       | Authentication and Firebase services      |

### Forms & UI

| Technology               | Purpose                  |
| ------------------------ | ------------------------ |
| React Hook Form          | Form management          |
| Radix UI                 | Accessible UI primitives |
| Class Variance Authority | Component variants       |
| clsx                     | Conditional classes      |
| tailwind-merge           | Tailwind class merging   |
| React Toastify           | Toast notifications      |
| SweetAlert2              | Alerts and confirmations |

---

## Project Structure

```text
Tuitron/
│
├── public/
│   └── fabicon.png
│
├── src/
│   │
│   ├── assets/
│   │   ├── find the perfect tutor for your learning journey.jpg
│   │   ├── learn smarter with trusted and skilled tutors.jpg
│   │   ├── logo-primary.png
│   │   ├── logo-white.png
│   │   └── teach earn and grow your career.jpg
│   │
│   ├── Components/
│   │   │
│   │   ├── ApplyModal/
│   │   │   └── ApplyModal.jsx
│   │   │
│   │   ├── Banner/
│   │   │   └── Banner.jsx
│   │   │
│   │   ├── BecomeTutor/
│   │   │   └── BecomeTutor.jsx
│   │   │
│   │   ├── ContactSection/
│   │   │   └── ContactSection.jsx
│   │   │
│   │   ├── FAQ/
│   │   │   └── FAQ.jsx
│   │   │
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── FormInput/
│   │   │   └── FormInput.jsx
│   │   │
│   │   ├── FormSelect/
│   │   │   └── FormSelect.jsx
│   │   │
│   │   ├── FormTextarea/
│   │   │   └── FormTextarea.jsx
│   │   │
│   │   ├── HowToWorks/
│   │   │   └── HowToWorks.jsx
│   │   │
│   │   ├── LatestTuitions/
│   │   │   └── LatestTuitions.jsx
│   │   │
│   │   ├── LatestTutors/
│   │   │   └── LatestTutors.jsx
│   │   │
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── PlatformStats/
│   │   │   └── PlatformStats.jsx
│   │   │
│   │   ├── SocialLogin/
│   │   │   └── SocialLogin.jsx
│   │   │
│   │   ├── Testimonials/
│   │   │   └── Testimonials.jsx
│   │   │
│   │   ├── ThemeProvider/
│   │   │   └── ThemeProvider.jsx
│   │   │
│   │   ├── TuitionCard/
│   │   │   └── TuitionCard.jsx
│   │   │
│   │   ├── TutorCard/
│   │   │   └── TutorCard.jsx
│   │   │
│   │   ├── UI/
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Dialog.jsx
│   │   │   ├── DropdownMenu.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Label.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Textarea.jsx
│   │   │   └── ThemeToggle.jsx
│   │   │
│   │   └── WhyChooseTuitron/
│   │       └── WhyChooseTuitron.jsx
│   │
│   ├── Contexts/
│   │   └── AuthContext/
│   │       ├── AuthContext.jsx
│   │       └── AuthProvider.jsx
│   │
│   ├── firebase/
│   │   └── firebase.init.js
│   │
│   ├── hooks/
│   │   ├── useAuth.jsx
│   │   ├── useAxiosSecure.jsx
│   │   └── useRole.jsx
│   │
│   ├── Layouts/
│   │   ├── AuthLayout/
│   │   │   └── AuthLayout.jsx
│   │   │
│   │   ├── DashboardLayout/
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   └── RootLayout/
│   │       └── RootLayout.jsx
│   │
│   ├── lib/
│   │   └── utils.js
│   │
│   ├── Pages/
│   │   ├── 404Error/
│   │   │   └── 404Error.jsx
│   │   │
│   │   ├── About/
│   │   │   └── About.jsx
│   │   │
│   │   ├── AddNewTuition/
│   │   │   └── AddNewTuition.jsx
│   │   │
│   │   ├── BeATutor/
│   │   │   └── BeATutor.jsx
│   │   │
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── TutorDashboard.jsx
│   │   │   │
│   │   │   ├── AppliedTutors/
│   │   │   │   └── AppliedTutors.jsx
│   │   │   │
│   │   │   ├── ApprovedTutors/
│   │   │   │   └── ApprovedTutors.jsx
│   │   │   │
│   │   │   ├── MyTuitions/
│   │   │   │   └── MyTuitions.jsx
│   │   │   │
│   │   │   ├── Payment/
│   │   │   │   ├── Payment.jsx
│   │   │   │   ├── PaymentCancelled.jsx
│   │   │   │   └── PaymentSuccess.jsx
│   │   │   │
│   │   │   ├── PaymentHistory/
│   │   │   │   └── PaymentHistory.jsx
│   │   │   │
│   │   │   └── UsersManagement/
│   │   │       └── UsersManagement.jsx
│   │   │
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   │
│   │   ├── Login/
│   │   │   └── Login.jsx
│   │   │
│   │   ├── Register/
│   │   │   └── Register.jsx
│   │   │
│   │   ├── TuitionDetails/
│   │   │   └── TuitionDetails.jsx
│   │   │
│   │   ├── Tuitions/
│   │   │   └── Tuitions.jsx
│   │   │
│   │   ├── TutorProfile/
│   │   │   └── TutorProfile.jsx
│   │   │
│   │   └── Tutors/
│   │       └── Tutors.jsx
│   │
│   ├── Routes/
│   │   ├── AdminRoute.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── PublicRoute.jsx
│   │   ├── Router.jsx
│   │   └── TutorRoute.jsx
│   │
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Architecture

Tuitron follows a component-based React architecture.

### Components

Reusable interface elements are organized inside `src/Components`.

Examples include:

* Navigation
* Footer
* Tuition cards
* Tutor cards
* Forms
* Modals
* Dashboard UI
* Buttons
* Inputs
* Select components
* Theme controls

### Pages

Application-level pages are organized inside `src/Pages`.

The application contains separate areas for:

* Public pages
* Authentication
* Tuition management
* Tutor management
* Dashboards
* Payments
* User management

### Layouts

The application uses different layouts depending on the page type:

```text
RootLayout
├── Public pages
└── General application content

AuthLayout
├── Login
└── Register

DashboardLayout
├── Student Dashboard
├── Tutor Dashboard
└── Admin Dashboard
```

### Routing

Routes are centralized in:

```text
src/Routes/
```

The project uses route guards for access control:

* `PublicRoute`
* `PrivateRoute`
* `TutorRoute`
* `AdminRoute`

This allows different areas of the platform to be protected according to authentication and user roles.

---

## Authentication

Firebase is used for authentication.

Firebase configuration is located at:

```text
src/firebase/firebase.init.js
```

Authentication state is managed through:

```text
src/Contexts/AuthContext/
```

The project also provides:

```text
src/hooks/useAuth.jsx
```

for accessing authentication functionality throughout the application.

Social authentication is handled through:

```text
src/Components/SocialLogin/
```

---

## API Communication

Axios is used for communicating with the backend API.

The project also includes:

```text
src/hooks/useAxiosSecure.jsx
```

for authenticated API requests.

TanStack Query is included for managing server-side data and asynchronous state.

Typical data flow:

```text
React Component
      ↓
Custom Hook
      ↓
Axios
      ↓
Backend API
      ↓
Database
```

---

## Role-Based Access

Tuitron supports multiple user roles.

### Student

Students can:

* Browse tutors
* Browse tuitions
* Create tuition requests
* Manage their tuitions
* Apply for tutors
* Make payments

### Tutor

Tutors can:

* Manage their profile
* Browse tuitions
* Apply for tuition opportunities
* Manage applications
* View approved opportunities

### Admin

Admins can:

* Manage users
* Manage tutors
* Monitor platform activities
* Manage platform data
* Access administrative dashboards

Role-related functionality is handled through:

```text
src/hooks/useRole.jsx
```

and the route guards inside:

```text
src/Routes/
```

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project

```bash
cd tuitron-client
```

### 3. Install dependencies

Using npm:

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root.

Example:

```env
VITE_API_URL=your_backend_api_url

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Use the actual environment variable names expected by `firebase.init.js` and the application's API configuration.

> Never commit `.env.local` or other files containing private credentials to Git.

---

## Development

Start the development server:

```bash
npm run dev
```

Or:

```bash
pnpm dev
```

Vite will start the development server and provide the local URL in the terminal.

---

## Linting

Run ESLint:

```bash
npm run lint
```

Or:

```bash
pnpm lint
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Or:

```bash
pnpm build
```

The production-ready files will be generated in:

```text
dist/
```

---

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

Or:

```bash
pnpm preview
```

---

## Available Scripts

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start Vite development server |
| `npm run build`   | Create production build       |
| `npm run lint`    | Run ESLint                    |
| `npm run preview` | Preview production build      |

---

## UI and Design

Tuitron uses Tailwind CSS for styling and Radix UI primitives for accessible interactive components.

Reusable UI components are located in:

```text
src/Components/UI/
```

The project includes:

* Buttons
* Cards
* Badges
* Dialogs
* Dropdown menus
* Inputs
* Labels
* Select fields
* Textareas
* Theme toggle

The platform also supports light and dark themes through:

```text
src/Components/ThemeProvider/
```

---

## Animation

Tuitron uses both **Framer Motion** and **AOS** for animations.

Framer Motion is primarily used for React component animations and interactive elements.

AOS is used for scroll-based reveal animations.

---

## Payment

Payment-related pages are located at:

```text
src/Pages/dashboard/Payment/
```

The payment flow includes:

```text
Payment.jsx
PaymentSuccess.jsx
PaymentCancelled.jsx
```

Payment history is available through:

```text
src/Pages/dashboard/PaymentHistory/
```

---

## Main Application Flow

```text
Visitor
   │
   ├── Browse Tuitions
   ├── Browse Tutors
   ├── View Tuition Details
   ├── View Tutor Profile
   │
   └── Authentication
          │
          ├── Student
          │    ├── Add Tuition
          │    ├── Manage Tuitions
          │    ├── Apply Tutors
          │    └── Payments
          │
          ├── Tutor
          │    ├── Tutor Profile
          │    ├── Browse Tuitions
          │    ├── Apply
          │    └── Manage Applications
          │
          └── Admin
               ├── Dashboard
               ├── User Management
               ├── Tutor Management
               └── Platform Management
```

---

## Recommended Development Practices

* Keep reusable UI components inside `Components`.
* Keep page-level components inside `Pages`.
* Use custom hooks for reusable application logic.
* Keep authentication logic inside `AuthContext`.
* Protect private pages using route guards.
* Use TanStack Query for server-state management.
* Keep API communication centralized through Axios utilities/hooks.
* Avoid committing environment files or credentials.
* Run linting and production builds before pushing changes.

---

## Project Status

Tuitron is actively developed as a tuition management platform with student, tutor, and administrator functionality.

---

## License

This project is proprietary unless otherwise specified by the project owner.
