type ImageSize =
    | 92
    | 154
    | 185
    | 200
    | 342
    | 500
    | 780
    | 1280
    | 'original'
    | undefined;

export const generateTmdbImagePath = (
    path?: string | null,
    width: ImageSize = 500,
) => {
    if (!path) return '/placeholder.svg';

    return `https://image.tmdb.org/t/p/w${width}${path}`;
};
