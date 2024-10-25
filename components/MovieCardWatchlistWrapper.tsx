'use client';
import { toast } from '@/hooks/use-toast';
import { useWishlist } from '@/hooks/use-wishlist';
import React, { ReactNode } from 'react';
import { Button } from './ui/button';
import { FaHeart } from 'react-icons/fa6';

const MovieCardWatchlistWrapper = ({
    movieId,
    children,
}: {
    movieId: number;
    children: ReactNode;
}) => {
    const { isInWatchlist, setIsInWatchlist, handleRemoveFromWishlist } =
        useWishlist({
            movieId,
            isInWishlist: true,
            watch: false,
        });

    const handleClick = async () => {
        try {
            setIsInWatchlist(false);
            await handleRemoveFromWishlist();
        } catch (error) {
            setIsInWatchlist(true);
            toast({
                title: 'Error updating watchlist',
                variant: 'destructive',
            });
        }
    };

    if (!isInWatchlist) {
        return null;
    }

    return (
        <div className="relative group/wrapper">
            <Button
                variant="outline"
                size="icon"
                className="absolute top-3 right-3 md:opacity-0 group-hover/wrapper:opacity-100 transition-all z-[1]"
                onClick={handleClick}
            >
                <FaHeart color="red" />
            </Button>
            {children}
        </div>
    );
};

export default MovieCardWatchlistWrapper;
