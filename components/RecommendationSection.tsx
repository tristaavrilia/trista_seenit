import React from 'react';
import MovieCard from './MovieCard';
import { TRecommendations } from '@/lib/schemas/movie-schemas';

interface Props {
    recommendations: TRecommendations['results'];
}

const RecommendationSection = ({ recommendations }: Props) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                {recommendations.slice(0, 10).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default RecommendationSection;
