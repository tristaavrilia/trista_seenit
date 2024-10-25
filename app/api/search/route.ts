import { NextResponse } from 'next/server';

const API_KEY = process.env.TMDB_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') || '1';

    if (!query) {
        return NextResponse.json(
            { error: 'Query parameter is required' },
            { status: 400 },
        );
    }

    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
    );

    const data = await res.json();
    return NextResponse.json(data.results);
}
