'use client';
import { getMovies } from '@/actions/movies';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import MovieCard from './MovieCard';
import { TMovie } from '@/lib/schemas/movie-schemas';

const InfiniteMovies = () => {
    const [movies, setMovies] = useState<TMovie[]>([]);
    const [page, setPage] = useState(1);
    const [ref, inView] = useInView();

    useEffect(() => {
        if (!inView) return;

        getMovies(page).then((newMovies) => {
            setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        });
    }, [page]);

    useEffect(() => {
        if (!inView) return;

        setPage((prevPage) => prevPage + 1);
    }, [inView]);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 mt-3 md:mt-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <div ref={ref} className="h-10" />
        </>
    );
};

export default InfiniteMovies;
