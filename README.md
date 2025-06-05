# Project Descriptions

SeenIt adalah aplikasi web sederhana berbasis CRUD yang memungkinkan pengguna menyimpan dan mengelola daftar film favorit mereka secara mudah. Pengguna dapat menambahkan, melihat, mengedit, dan menghapus informasi film seperti judul, genre, tahun rilis, dan rating. Dalam pengembangannya, DevOps akan diterapkan melalui integrasi pipeline CI/CD untuk mempercepat proses deployment dan menjaga kualitas aplikasi secara berkelanjutan. 

## Table of Contents

-   [Features](#features)
-   [Setup Instructions](#setup-instructions)
-   [Live Demo](#live-demo)
-   [License](#license)

## Features

-   Home Page : Menampilkan daftar film populer yang diambil dari TMDB API.
-   Fitur Search : Pengguna dapat mencari film berdasarkan judul atau kata kunci.
-   Detail Page Film : Menggunakan Server-Side Rendering (SSR) dengan Incremental Static Regeneration (ISR) untuk menampilkan informasi detail tentang film yang dipilih.
-   Fitur Watchlist : Memungkinkan pengguna untuk menambahkan atau menghapus film dari daftar favorit atau watchlist.
-   Toggle Theme : Fitur opsional untuk beralih antara light mode dan dark mode.
-   Register/Login : Mengharuskan pengguna untuk mendaftar/masuk dengan akun Email masing-masing.
-   Fitur Rating & Review Film : Memungkinkan pengguna untuk memberikan rating dan review film yang sudah ditonton.
-   History Page : Menampilkan riwayat film yang sudah ditonton dan diberi review oleh pengguna.
-   Logout : Memungkinkan pengguna untuk keluar dari halaman web SeenIt.

## Setup Instructions

To run this project locally, follow these steps:

-   Clone the repository:

```bash
git clone https://github.com/feliciaeve/devops-seenit.git
cd devops-seenit
```

-   Install dependencies:

```bash
npm install
```

or : 

```bash
npm install --legacy-peer-deps
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


To run this project using Docker, follow these steps : 

-   Clone the repository:

```bash
git clone https://github.com/feliciaeve/devops-seenit.git
cd devops-seenit
```

-   Install dependencies:

```bash
npm install
```

or : 

```bash
npm install --legacy-peer-deps
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

This project is licensed under the MIT License - see the LICENSE file for details. Thank you for checking out my movie search and details app! I hope you enjoy exploring it as much as I enjoyed building it.
