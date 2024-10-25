import {
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist,
} from '@/actions/watchlist';
import { useEffect, useState } from 'react';

interface Props {
    movieId: number;
    isInWishlist?: boolean;
    watch?: boolean;
}

export const useWatchlist = ({
    movieId,
    isInWishlist = false,
    watch = true,
}: Props) => {
    const [isInWatchlist, setIsInWatchlist] = useState(isInWishlist);

    useEffect(() => {
        const checkWatchlist = async () => {
            const watchlist = await getWatchlist();
            setIsInWatchlist(watchlist.includes(movieId));
        };

        if (watch) checkWatchlist();
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
