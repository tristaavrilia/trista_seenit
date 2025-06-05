# Project Descriptions

**SeenIt** is a simple web-based CRUD application that allows users to easily save and manage their favorite movies list. Users can add, view, edit, and delete movie information such as title, genre, release year, and rating.

This project was created by :
1. [Trista Avrilia](https://github.com/tristaavrilia)
2. [Natasha Yosefani](https://github.com/natashayp)
3. [Felicia Evelina](https://github.com/feliciaeve)
4. [Gabriella Jessica](https://github.com/jessicaprawira)

For further ReadMe Configuration, access [ReadMeDocumentation](https://docs.google.com/document/d/1GmmY0IYDoZJtSCq2BVYl8QxmrIkEi-r4kTgvxh6x9m0/edit?usp=sharing)

## Table of Contents

-   [Features](#features)
-   [Setup Instructions](#setup-instructions)
-   [Live Demo](#live-demo)
-   [License](#license)

## Features

-   Home Page : Displays a list of popular movies fetched from the TMDB API.
-   Search Feature : Allows users to search for movies by title or keyword.
-   Movie Detail Page : Uses Server-Side Rendering (SSR) with Incremental Static Regeneration (ISR) to show detailed information about the selected movie.
-   Watchlist Feature : Enables users to add or remove movies from their favorites or watchlist.
-   Theme Toggle : Optional feature to switch between light mode and dark mode.
-   Register/Login : Requires users to register or log in with their email account.
-   Rating & Review Feature : Allows users to give ratings and reviews for movies they have watched.
-   History Page : Displays a history of movies the user has watched and reviewed.
-   Logout : Allows users to sign out from the SeenIt web application.

## Setup Instructions

**To run this project locally, follow these steps:**

1. Clone the repository

```bash
git clone https://github.com/feliciaeve/devops-seenit.git
cd devops-seenit
```

2. Go to clone directory

```bash
cd devops-seenit
```

3. Install dependencies

```bash
npm install
```

  or : 

```bash
npm install --legacy-peer-deps
```

4. Create a .env.local file in the root directory and add your TMDB API key

```text
TMDB_API_KEY=your_api_key_here
```

You can obtain a TMDB API key by visiting:
[TMDB API KEY](https://www.themoviedb.org/settings/api)


5. Start the development server

```bash
npm run dev
```

6. Open your browser and navigate to http://localhost:3000.


**To run this project using Docker, follow these steps :** 

1. Clone the repository

```bash
git clone https://github.com/feliciaeve/devops-seenit.git
```

2. Go to clone directory

```bash
cd devops-seenit
```

3. Install dependencies

```bash
npm install
```

  or : 

```bash
npm install --legacy-peer-deps
```

4. Open the docker desktop
   
5. Build docker images

```bash
docker compose build —no-cache
```

6. Run the docker

```bash
docker compose up
```

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
https://seenit-656120882618.asia-southeast2.run.app
```

## License

The project was forked from https://github.com/Tajmirul/movies-tmdb 


Thank you for checking out!
