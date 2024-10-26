'use server';

import { cookies } from 'next/headers';
import { getMovieDetails } from './movies';

export const addToWatchlist = async (movieId: number) => {
    const cookieStore = await cookies();
    const watchlist = await getWatchlist();

    if (!watchlist.includes(movieId)) {
        watchlist.push(movieId);
        cookieStore.set('watchlist', JSON.stringify(watchlist));
    }
};

export const removeFromWatchlist = async (movieId: number) => {
    const cookieStore = await cookies();
    const watchlist = await getWatchlist();

    const updatedWatchlist = watchlist.filter((id) => id !== movieId);
    cookieStore.set('watchlist', JSON.stringify(updatedWatchlist));
};

export const getWatchlist = async (): Promise<number[]> => {
    const cookieStore = await cookies();

    const watchlistCookie = cookieStore.get('watchlist');
    return watchlistCookie ? JSON.parse(watchlistCookie.value) : [];
};

export const getWatchlistProducts = async () => {
    const watchlist = await getWatchlist();
    return Promise.all(watchlist.map((id) => getMovieDetails(String(id))));
};
