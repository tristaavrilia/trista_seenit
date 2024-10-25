'use client';
import { getWatchlistProducts } from '@/actions/watchlist';
import MovieCard from '@/components/MovieCard';
import MovieCardWatchlistWrapper from '@/components/MovieCardWatchlistWrapper';
import { TMovie } from '@/lib/schemas/movie-schemas';
import { useEffect, useState } from 'react';

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState<TMovie[]>([]);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const watchlist = await getWatchlistProducts();
                setWatchlist(watchlist);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWatchlist();
    }, []);

    console.log(watchlist);

    return (
        <div className="container">
            <h1 className="text-xl font-bold mb-6">Your Watchlist</h1>
            {watchlist.length === 0 ? (
                <p>Your watchlist is empty.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                    {watchlist.map((movie) => (
                        <MovieCardWatchlistWrapper
                            movieId={movie.id}
                            key={movie.id}
                        >
                            <MovieCard movie={movie} />
                        </MovieCardWatchlistWrapper>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WatchlistPage;
