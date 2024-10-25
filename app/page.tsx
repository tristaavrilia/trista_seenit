import { getMovies } from '@/actions/movies';
import InfiniteMovies from '@/components/InfiniteMovies';
import MovieCard from '@/components/MovieCard';

export const dynamic = 'force-dynamic';

const Home = async () => {
    const movies = await getMovies(1);

    return (
        <div className="container">
            <h1 className="text-xl font-bold mb-6">Popular Movies</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <InfiniteMovies />
        </div>
    );
};

export default Home;
