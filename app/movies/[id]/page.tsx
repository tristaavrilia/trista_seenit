import 'swiper/css';

import MovieCard from '@/components/MovieCard';
import AddToWatchlistButton from '@/components/AddToWatchList';
import LazyImage from '@/components/LazyImage';
import MovieActorsSection from '@/components/MovieActorsSection';
import { dateFormatter } from '@/lib/date-formatter';
import { FaStar } from 'react-icons/fa6';
import {
    getMovieCredits,
    getMovieDetails,
    getMovieRecommendations,
} from '@/actions/movies';
import {
    TCredits,
    TMovieDetails,
    TRecommendations,
} from '@/lib/schemas/movie-schemas';
import ErrorMessage from '@/components/ErrorMessage';

export const revalidate = 60;
export const dynamic = 'force-static';

export default async function MoviePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const movieId = (await params).id;

    let movie: TMovieDetails,
        credits: TCredits,
        recommendations: TRecommendations;

    try {
        [movie, credits, recommendations] = await Promise.all([
            getMovieDetails(movieId),
            getMovieCredits(movieId),
            getMovieRecommendations(movieId),
        ]);
    } catch (error) {
        return (
            <ErrorMessage message="Some thing went wrong. Please look at the server logs for better understanding." />
        );
    }

    return (
        <>
            <section
                className="bg-cover bg-center bg-no-repeat py-8 text-white mb-8"
                style={{
                    backgroundImage: `linear-gradient(#000000bb, #000000bb), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                }}
            >
                <div className="container flex flex-col md:flex-row gap-8">
                    <div className="w-full md:max-w-[300px]">
                        <LazyImage
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={500}
                            height={750}
                            className="rounded-lg border-4 border-border/30"
                        />
                    </div>
                    <div className="w-full md:w-2/3 space-y-4">
                        <h1 className="text-2xl font-bold">{movie.title}</h1>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex gap-2 items-center text-sm">
                                <FaStar size={14} className="text-orange-500" />
                                {movie.vote_average.toFixed(1)}
                            </span>

                            <span className="size-1 bg-gray-500 rounded-full"></span>

                            <span className="text-sm">
                                {movie.vote_count} votes
                            </span>

                            <span className="size-1 bg-gray-500 rounded-full"></span>

                            <span className="text-sm">
                                {dateFormatter(new Date(movie.release_date))}
                            </span>
                        </div>

                        <div className="flex gap-2 items-center text-sm !mt-0">
                            {movie.genres.map((genre, idx) => (
                                <div key={genre.id}>
                                    <span
                                        key={genre.id}
                                        className="rounded text-sm"
                                    >
                                        {genre.name}
                                    </span>
                                    {idx < movie.genres.length - 1 && (
                                        <span className="size-1 bg-gray-500 rounded-full"></span>
                                    )}
                                </div>
                            ))}
                        </div>

                        <p className="text-sm font-bold">{movie.tagline}</p>
                        <h5 className="text-xs font-bold uppercase">
                            Overview
                        </h5>
                        <p className="!mt-1">{movie.overview}</p>

                        <AddToWatchlistButton movieId={movie.id} />
                    </div>
                </div>
            </section>
            <div className="container space-y-8">
                <MovieActorsSection cast={credits.cast} />
                <div>
                    <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                        {recommendations.results.slice(0, 10).map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
