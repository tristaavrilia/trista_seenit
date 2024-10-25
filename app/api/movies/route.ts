import { NextResponse } from 'next/server';

const API_KEY = process.env.TMDB_API_KEY;

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';

    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`,
    );

    const data = await res.json();
    return NextResponse.json(data.results);
};
