# Movie Search and Details App

This project is a responsive movie search and details application built using Next.js 13/14 and the TMDB API. It features a clean user interface, infinite scrolling for movie lists, and detailed movie information, including cast and recommendations.

## Table of Contents

-   [Features](#features)
-   [Setup Instructions](#setup-instructions)
-   [API Endpoints](#api-endpoints)
-   [Live Demo](#live-demo)
-   [License](#license)

## Features

-   Homepage with Infinite Scrolling: Displays a list of popular movies fetched from the TMDB API with infinite scrolling or a "Load More" button.
-   Search Functionality: Users can search for movies by title, displaying results with the same infinite scrolling behavior.
-   Movie Details Page: Utilizes Server-Side Rendering (SSR) with Incremental Static - Regeneration (ISR) to show detailed information about selected movies.
-   Watchlist Feature: Allows users to add or remove movies from their favorites or watchlist with optimistic UI, managed through server actions.
-   Dark Mode Toggle: Optional feature to switch between light and dark themes, persisting user preferences using cookies or localStorage.

## Setup Instructions

To run this project locally, follow these steps:

-   Clone the repository:

```bash
git clone https://github.com/Tajmirul/assignment-ngrk.git
cd assignment-ngrk
```

-   Install dependencies:

```bash
npm install
```

-   Create a .env.local file in the root directory and add your TMDB API key:

```text
TMDB_API_KEY=your_api_key_here
```

-   Start the development server:

```bash
npm run dev
```

-   Open your browser and navigate to http://localhost:3000.

## API Endpoints

The application interacts with the following TMDB API endpoints:

-   Search Movies: https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=...
-   Popular Movies: https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY
-   Movie Details: https://api.themoviedb.org/3/movie/{movie_id}?api_key=YOUR_API_KEY
-   Movie Credits (Cast): https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=YOUR_API_KEY
-   Movie Recommendations: https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=YOUR_API_KEY

## Live Demo

You can view the live application at:

```
https://assignment-ngrk.vercel.app
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. Thank you for checking out my movie search and details app! I hope you enjoy exploring it as much as I enjoyed building it.
