import { z } from 'zod';

export const movieSchema = z.object({
    id: z.number(),
    title: z.string(),
    poster_path: z.string().nullable(),
    backdrop_path: z.string().nullable(),
    overview: z.string(),
    release_date: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
    popularity: z.number(),
});

export type TMovie = z.infer<typeof movieSchema>;

export const movieDetailsSchema = movieSchema.extend({
    tagline: z.string().optional(),
    genres: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        }),
    ),
    runtime: z.number().optional(),
});

export type TMovieDetails = z.infer<typeof movieDetailsSchema>;

export const creditsSchema = z.object({
    cast: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            character: z.string(),
            profile_path: z.string().nullable(),
        }),
    ),
});

export type TCredits = z.infer<typeof creditsSchema>;

export const recommendationsSchema = z.object({
    results: z.array(movieSchema),
});

export type TRecommendations = z.infer<typeof recommendationsSchema>;
