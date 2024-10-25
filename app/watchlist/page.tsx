import { getMovieDetails } from '@/actions/movies';
import { getWatchlist } from '@/actions/watchlist';
import MovieCard from '@/components/MovieCard';
import MovieCardWatchlistWrapper from '@/components/MovieCardWatchlistWrapper';

export default async function WatchlistPage() {
    const watchlist = await getWatchlist();
    const movies = await Promise.all(
        watchlist.map((item) => getMovieDetails(String(item))),
    );

    return (
        <div className="container">
            <h1 className="text-xl font-bold mb-6">Your Watchlist</h1>
            {movies.length === 0 ? (
                <p>Your watchlist is empty.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                    {movies.map((movie) => (
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
}
