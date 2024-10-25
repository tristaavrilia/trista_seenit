import {
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist,
} from '@/actions/watchlist';
import { useEffect, useState } from 'react';

export const useWishlist = (movieId: number) => {
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const checkWatchlist = async () => {
            const watchlist = await getWatchlist();
            setIsInWatchlist(watchlist.includes(movieId));
        };

        checkWatchlist();
    }, [movieId]);

    const handleAddToWishlist = async () => {
        await addToWatchlist(movieId);
        setIsInWatchlist(true);
    };

    const handleRemoveFromWishlist = async () => {
        await removeFromWatchlist(movieId);
        setIsInWatchlist(false);
    };

    return {
        isInWatchlist,
        setIsInWatchlist,
        handleAddToWishlist,
        handleRemoveFromWishlist,
    };
};
