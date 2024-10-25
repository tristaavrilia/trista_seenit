import { getCookie, setCookie } from 'cookies-next';
import { getMovieDetails } from './movies';

export const addToWatchlist = (movieId: number) => {
    const watchlist = getWatchlist();

    if (!watchlist.includes(movieId)) {
        watchlist.push(movieId);
        console.log('adding to watchlist', watchlist);

        setCookie('watchlist', JSON.stringify(watchlist), {
            maxAge: 10 * 24 * 60 * 60, // 10 days
        });
    }
};

export const removeFromWatchlist = (movieId: number) => {
    const watchlist = getWatchlist();

    const updatedWatchlist = watchlist.filter((id) => id !== movieId);
    console.log('removing from watchlist', updatedWatchlist);
    setCookie('watchlist', JSON.stringify(updatedWatchlist), {
        maxAge: 10 * 24 * 60 * 60, // 10 days
    });
};

export const getWatchlist = (): number[] => {
    const cookieNext = getCookie('watchlist');
    return cookieNext ? JSON.parse(cookieNext) : [];
};

export const getWatchlistProducts = async () => {
    const watchlist = getWatchlist();
    return Promise.all(watchlist.map((id) => getMovieDetails(String(id))));
};
