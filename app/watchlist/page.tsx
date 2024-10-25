import { getWatchlist } from '@/actions/watchlist';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types';

async function getMovieDetails(id: number): Promise<Movie> {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
        { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error('Failed to fetch movie details');
    return res.json();
}

export default async function WatchlistPage() {
    const watchlist = await getWatchlist();
    const movies = await Promise.all(watchlist.map(getMovieDetails));

    return (
        <div className="container">
            <h1 className="text-xl font-bold mb-6">Your Watchlist</h1>
            {movies.length === 0 ? (
                <p>Your watchlist is empty.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
