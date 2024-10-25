'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { FaHeart } from 'react-icons/fa6';
import { LuMoonStar, LuSun, LuSunSnow } from 'react-icons/lu';
import { useToast } from '@/hooks/use-toast';

export default function Header() {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const trimSearch = search.trim();

        if (trimSearch?.length < 3) {
            toast({
                title: 'Search query is too short',
            });
            return;
        }

        router.push(`/search?query=${encodeURIComponent(search.trim())}`);
    };

    return (
        <header className="border-b mb-4 sticky top-0 left-0 z-[3] bg-background">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-medium size-10 flex items-center justify-center border rounded-full"
                >
                    M
                </Link>
                <form onSubmit={handleSearch} className="flex-1 mx-4">
                    <Input
                        type="search"
                        placeholder="Search movies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md"
                    />
                </form>
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
