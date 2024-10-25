'use client';

import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/hooks/use-watchlist';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

export default function AddToWatchlistButton({ movieId }: { movieId: number }) {
    const {
        isInWatchlist,
        setIsInWatchlist,
        handleAddToWishlist,
        handleRemoveFromWishlist,
    } = useWatchlist({
        movieId,
    });

    const handleClick = async () => {
        const previousWatchlistState = isInWatchlist;

        try {
            if (isInWatchlist) {
                setIsInWatchlist(false);
                await handleRemoveFromWishlist();
                toast('Removed from watchlist');
            } else {
                setIsInWatchlist(true);
                await handleAddToWishlist();
                toast('Added to watchlist');
            }
        } catch (error) {
            setIsInWatchlist(previousWatchlistState);
            toast.error('Error updating watchlist');
        }
    };

    return (
        <Button
            className={cn(
                'bg-white text-black flex items-center gap-2 hover:bg-gray-300 group transition-all',
            )}
            onClick={handleClick}
        >
            <span
                className={cn('group-hover:text-rose-500 transition-all', {
                    'text-rose-500': isInWatchlist,
                })}
            >
                {isInWatchlist ? <FaHeart /> : <FaRegHeart />}
            </span>
            <span>Watchlist</span>
        </Button>
    );
}
