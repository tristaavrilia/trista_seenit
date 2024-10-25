'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import LazyImage from './LazyImage';
import SwiperRef from 'swiper';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Button } from './ui/button';
import { TCredits } from '@/lib/schemas/movie-schemas';
import { generateTmdbImagePath } from '@/lib/tmdb-image-path';

interface Props {
    cast: TCredits['cast'];
}

const MovieActorsSection = ({ cast }: Props) => {
    const swiperEl = useRef<SwiperRef | null>(null);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="pb-4 relative group">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => swiperEl.current?.slidePrev()}
                    className="absolute left-2 top-1/3 transform -translate-y-1/3 rounded-full z-[2] opacity-0 group-hover:opacity-100 transition-all"
                >
                    <FaAngleLeft />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => swiperEl.current?.slideNext()}
                    className="absolute right-2 top-1/3 transform -translate-y-1/3 rounded-full z-[2] opacity-0 group-hover:opacity-100 transition-all"
                >
                    <FaAngleRight />
                </Button>

                <Swiper
                    spaceBetween={16}
                    slidesPerView={'auto'}
                    onSwiper={(swiper) => (swiperEl.current = swiper)}
                >
                    {cast.slice(0, 10).map((actor) => (
                        <SwiperSlide key={actor.id} className="!w-auto">
                            <div className="flex-shrink-0 w-32">
                                <LazyImage
                                    src={generateTmdbImagePath(
                                        actor.profile_path,
                                        200,
                                    )}
                                    alt={actor.name}
                                    width={200}
                                    height={300}
                                    className="rounded-lg aspect-[2/3]"
                                />
                                <p className="mt-2 text-sm font-semibold">
                                    {actor.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {actor.character}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MovieActorsSection;
