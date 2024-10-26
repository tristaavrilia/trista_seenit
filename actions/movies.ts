'use server';

import {
    creditsSchema,
    movieDetailsSchema,
    recommendationsSchema,
    TMovie,
} from '@/lib/schemas/movie-schemas';
import { notFound } from 'next/navigation';

const API_KEY = process.env.TMDB_API_KEY;

export const getMovies = async (page: number): Promise<TMovie[]> => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`,
    );

    if (!res.ok) throw new Error('Failed to fetch movies');
    const data = await res.json();
    return data.results as Promise<TMovie[]>;
};

export const searchMovies = async (query: string, page: number) => {
    if (!query || query.length < 3) {
        throw new Error('Query is too short');
    }

    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
        {
            next: { revalidate: 60 },
        },
    );

    if (!res.ok) throw new Error('Failed to fetch movies');

    const data = await res.json();
    return data.results as Promise<TMovie[]>;
};

export const getMovieDetails = async (id: string) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
        { next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error('Failed to fetch movie details');
    const data = await res.json();

    try {
        return movieDetailsSchema.parse(data);
    } catch (error) {
        // save the error to the server logs
        console.error('Movie details validation error:', error);
        throw new Error('Invalid movie data received from API');
    }
};

export const getMovieCredits = async (id: string) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`,
        { next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error('Failed to fetch cast data');
    const data = await res.json();

    try {
        return creditsSchema.parse(data);
    } catch (error) {
        // save the error to the server logs
        console.error('Credits validation error:', error);
        throw new Error('Invalid credits data received from API');
    }
};

export const getMovieRecommendations = async (id: string) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_API_KEY}`,
        { next: { revalidate: 60 } },
    );
    if (!res.ok) throw new Error('Failed to fetch recommendations');
    const data = await res.json();

    try {
        return recommendationsSchema.parse(data);
    } catch (error) {
        // save the error to the server logs
        console.error('Recommendations validation error:', error);
        throw new Error('Invalid recommendations data received from API');
    }
};
