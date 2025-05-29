# 🎬 PopcornTime — Cinema Ticket Booking System

A study web application for booking seats in a movie theater. Built with **React**, **TypeScript**, and **Tailwind CSS**. Movie data is fetched from the TMDB API, and booking information is currently stored in **LocalStorage**.

## 🛠️ Tech Stack

### 🔹 Frontend

- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- React Toastify

### 🔸 Backend _(Planned)_

- Firebase (Firestore, Authentication)

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
cd PopcornTime
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

> 🔐 Firebase is not integrated yet. All booking data is currently saved in LocalStorage. Firebase integration is planned.

## 📦 Core Features

- Movie listing with detailed information
- Modal window with trailer, description, rating, budget, and more
- Interactive seat selection in the cinema hall
- Booking confirmation form with validation (Name, Phone, Email)
- Notifications using React Toastify
- Booking data stored in LocalStorage
- Fully responsive and modern UI

## 🧭 Routing

- `/` — Home page with movie listings
- `/booking/:id` — Seat selection for a specific movie
- `/confirm/:id` — Booking confirmation form

## 🔮 Roadmap

- Firebase integration
- User authentication
- Admin dashboard
- Movie/session management
- Review and rating system
- Search and filtering
- Pagination
- Error handling
- Performance optimization
- Accessibility improvements (a11y)

## 🤝 Contributing

1. Fork this repository
2. Create a new feature branch
3. Commit your changes
4. Push your branch
5. Submit a Pull Request
