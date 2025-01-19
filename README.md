# GeoProfile

## Overview

**GeoProfile** is a React-based application designed to allow admins to manage user profiles while offering seamless user browsing functionality. Users can view listed profiles containing basic details such as name, email, phone, city, state, country, and interests. Precise locations of users can be tracked using the `react-google-maps` API, ensuring an engaging and smooth user experience.

Admins have access to a secured dashboard (protected using a passkey) where they can add, update, and delete user profiles.

---

## Features

- **User Management:**

  - Admins can add, update, and delete user profiles.
  - Each profile includes:
    - Basic details: Name, Email, Phone, City, State, Country, Interests.
    - Precise Location: Longitude and Latitude fields integrated with the Google Maps API.

- **Map Integration:**

  - View the user's precise location on an interactive map using `react-google-maps`.

- **Public Browsing:**

  - Anyone can browse the list of profiles and explore their details.

- **Admin Dashboard:**
  - Secured with a passkey for exclusive access.
  - Provides full control over user profiles.

---

## Tech Stack

This application is built using the following technologies:

- **Frontend:**

  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/) with [TailwindCSS Animate](https://github.com/benface/tailwindcss-animate)
  - [Radix UI](https://www.radix-ui.com/) for accessible UI components
  - [React Google Maps](https://github.com/visgl/react-google-maps) for map integration
  - [Zustand](https://github.com/pmndrs/zustand) for state management
  - [React Hook Form](https://react-hook-form.com/) for form handling
  - [React Hot Toast](https://react-hot-toast.com/) for notifications

- **Backend:**

  - [Appwrite](https://appwrite.io/):
    - **Database**: To store user profiles.
    - **Storage**: To handle media uploads.

- **Others:**
  - [ESLint](https://eslint.org/) for linting
  - [React Router](https://reactrouter.com/) for navigation

---

## Installation and Setup

### Prerequisites

- Node.js (v18+ recommended)
- Google Cloud Platform (GCP) project with a Maps API key & custom map ID
- Appwrite instance for database and storage setup

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/GeoProfile.git
   cd GeoProfile
   ```

2. **Install dependencies:**

   ```bash
   git clone https://github.com/AbhishekNavgan95/GeoProfile
   cd GeoProfile
   ```

3. **Set up environment variables:**

- VITE_MAP_ID=
- VITE_MAP_API=
- VITE_APPWRITE_API=
- VITE_DATABASE_ID=
- VITE_BUCKET_ID=
- VITE_USER_COLLECTION_ID=
- VITE_APPWRITE_ENDPOINT=
- VITE_PASSKEY=123456

4. **Run the development server:**

   ```bash
   npm run dev
   ```

### Usage

1. Admin Access:

    Use the secured passkey to log in to the Admin Dashboard.
    Add, update, or delete user profiles.
    Browsing:

    Visit the public section to explore user profiles.
    Use the integrated Google Map to view user locations.

2. Browsing:

    Visit the public section to explore user profiles.

    Use the integrated Google Map to view user locations.


### Acknowledgments
- Google Maps API for map integration
- Appwrite for backend services
- Radix UI for UI components
