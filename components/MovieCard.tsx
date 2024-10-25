'use client';
import Link from 'next/link';
import { Movie } from '@/types';
import LazyImage from './LazyImage';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa6';
import { Button } from './ui/button';
import { useWishlist } from '@/hooks/use-wishlist';
import { toast } from '@/hooks/use-toast';

export default function MovieCard({ movie }: { movie: Movie }) {
    const { isInWatchlist, handleAddToWishlist, handleRemoveFromWishlist } =
        useWishlist(movie.id);

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
        <div className="group">
            <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
                <Link href={`/movies/${movie.id}`}>
                    <LazyImage
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={300}
                        height={450}
                        className="object-cover aspect-[2/3] transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>

                <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-3 right-3 md:opacity-0 group-hover:opacity-100 transition-all"
                    onClick={handleClick}
                >
                    {isInWatchlist ? <FaHeart color="red" /> : <FaRegHeart />}
                </Button>
            </div>
            <Link href={`/movies/${movie.id}`}>
                <h2 className="mt-2 text-sm leading-snug font-semibold">
                    {movie.title}
                </h2>
                <div className="flex gap-2 items-center">
                    <div className="flex gap-1 items-center">
                        <FaStar size={16} className="text-orange-500" />
                        <p className="text-sm text-muted-foreground">
                            {movie.vote_average.toFixed(1)}
                        </p>
                    </div>

                    <span className="size-1 bg-gray-500 rounded-full"></span>

                    <p className="text-sm text-muted-foreground">
                        {movie.release_date.split('-')[0]}
                    </p>
                </div>
            </Link>
        </div>
    );
}
