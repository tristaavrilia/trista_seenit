'use client';

import { useEffect, useState } from 'react';
import InfiniteMovies from '@/components/InfiniteMovies';
import MovieCard from '@/components/MovieCard';
import LoginGuard from '@/components/LoginGuard';
import { TMovie } from '@/lib/schemas/movie-schemas';

export default function HomePage() {
    const [movies, setMovies] = useState<TMovie[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const res = await fetch('/api/movies?page=1');
                if (!res.ok) throw new Error('Failed to fetch movies');
                const data = await res.json();
                setMovies(data.results); // sesuaikan dengan struktur respons API route kamu
            } catch (err) {
                console.error('Failed to fetch movies:', err);
                setError('Gagal memuat data film.');
            }
        }

        fetchMovies();
    }, []);

    return (
        <LoginGuard>
            <div className="container pt-6">
                <h1 className="text-2xl font-bold mb-6">Popular Movies</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                <InfiniteMovies />
            </div>
        </LoginGuard>
    );
}
