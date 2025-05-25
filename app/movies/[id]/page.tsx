import AddToWatchlistButton from '@/components/AddToWatchList';
import LazyImage from '@/components/LazyImage';
import MovieActorsSection from '@/components/MovieActorsSection';
import { dateFormatter } from '@/lib/date-formatter';
import { FaStar } from 'react-icons/fa6';
import {
    getMovies,
    getMovieCredits,
    getMovieDetails,
    getMovieRecommendations,
} from '@/actions/movies';
import { generateTmdbImagePath } from '@/lib/tmdb-image-path';
import RecommendationSection from '@/components/RecommendationSection';
import { getImageProps } from 'next/image';
import ErrorMessage from '@/components/ErrorMessage';

interface Params {
    params: Promise<{ id: string }>;
}

export const revalidate = 60;

export const generateStaticParams = async () => {
    const movies = await getMovies(1);
    return movies.map((movie) => ({
        params: {
            id: movie.id.toString(),
        },
    }));
};

export const generateMetadata = async ({ params }: Params) => {
    const movieId = (await params).id;

    const movie = await getMovieDetails(movieId);

    return {
        title: movie.title,
        description: movie.overview,
        image: generateTmdbImagePath(movie.poster_path, 500),
    };
};

export default async function MoviePage({ params }: Params) {
    const movieId = (await params).id;

    const [movie, credits, recommendations] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId),
        getMovieRecommendations(movieId),
    ]);

    const optimizedBackdrop = getImageProps({
        src: generateTmdbImagePath(movie.backdrop_path, 780),
        alt: movie.title,
        width: 1280,
        height: 700,
        quality: 10,
        priority: true,
    }).props.src;

    return (
        <>
            <section
                className="bg-cover bg-center bg-no-repeat py-8 text-white mb-8 -mt-4 relative"
                style={{
                    backgroundImage: `linear-gradient(#000000bb, #000000bb), url(${optimizedBackdrop})`,
                }}
            >
                <div className="container flex flex-col md:flex-row gap-8">
                    <div className="w-full max-w-[200px] max-md:mx-auto md:max-w-[300px]">
                        <LazyImage
                            src={generateTmdbImagePath(movie.poster_path, 200)}
                            alt={movie.title}
                            width={200}
                            height={300}
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
                <RecommendationSection
                    recommendations={recommendations.results}
                />
            </div>
        </>
    );
}
