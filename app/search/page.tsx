'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types';
import { searchMovies } from '@/actions/movies';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(0);
    const [ref, inView] = useInView();

    useEffect(() => {
        setMovies([]);
        setPage(1);
    }, [query]);

    useEffect(() => {
        if (!inView) return;

        searchMovies(query, page).then((newMovies) => {
            setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        });
    }, [page, query]);

    useEffect(() => {
        if (!inView) return;

        setPage((prevPage) => prevPage + 1);
    }, [inView]);

    return (
        <div className="container">
            <h1 className="text-xl font-bold mb-6">
                Search Results for &quot;{query}&quot;
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <div ref={ref} className="h-10" />
        </div>
    );
}
