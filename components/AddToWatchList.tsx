'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useWatchlist } from '@/hooks/use-watchlist';

export default function AddToWatchlistButton({ movieId }: { movieId: number }) {
    const { toast } = useToast();
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
                toast({ title: 'Removed from watchlist' });
            } else {
                setIsInWatchlist(true);
                await handleAddToWishlist();
                toast({ title: 'Added to watchlist' });
            }
        } catch (error) {
            setIsInWatchlist(previousWatchlistState);
            toast({
                title: 'Error updating watchlist',
                variant: 'destructive',
            });
        }
    };

    return (
        <Button
            className="text-primary-foreground bg-primary"
            onClick={handleClick}
        >
            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </Button>
    );
}
