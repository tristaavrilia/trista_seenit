'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { FaHeart } from 'react-icons/fa6';
import { LuMoonStar, LuSun } from 'react-icons/lu';
import SearchForm from '../forms/SearchForm';

export default function Header() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="border-b mb-4 sticky top-0 left-0 z-[3] bg-background">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-medium size-10 flex items-center justify-center border-[3px] rounded-full"
                >
                    M
                </Link>
                <SearchForm />
                <nav className="flex items-center gap-1 sm:gap-4">
                    <Button asChild variant="ghost" className="max-sm:size-10">
                        <Link
                            href="/watchlist"
                            className="text-sm font-semibold"
                        >
                            <FaHeart />
                            <span className="max-sm:hidden">Wishlist</span>
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setTheme(theme === 'dark' ? 'light' : 'dark')
                        }
                    >
                        {theme === 'dark' ? <LuSun /> : <LuMoonStar />}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </nav>
            </div>
        </header>
    );
}
