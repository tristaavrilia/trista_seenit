'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/hooks/use-wishlist';

export default function AddToWatchlistButton({ movieId }: { movieId: number }) {
    const { toast } = useToast();
    const { isInWatchlist, handleAddToWishlist, handleRemoveFromWishlist } =
        useWishlist({
            movieId,
        });

    const handleClick = async () => {
        try {
            if (isInWatchlist) {
                await handleRemoveFromWishlist();
                toast({ title: 'Removed from watchlist' });
            } else {
                await handleAddToWishlist();
                toast({ title: 'Added to watchlist' });
            }
        } catch (error) {
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
