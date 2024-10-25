import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const openSans = Open_Sans({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    style: 'normal',
    variable: '--font-open-sans',
});

export const metadata: Metadata = {
    title: 'Movie Application',
    description: 'A movie application built with Next.js',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${openSans.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    <main className="min-h-[calc(100vh-150px)]">
                        {children}
                    </main>

                    <Toaster />
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
