'use client';
import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react';

interface Props extends ImageProps {}

const errorImage = '/movie-placeholder.svg';

const LazyImage = ({ className, alt, ...props }: Props) => {
    const [error, setError] = useState(false);

    return (
        <Image
            alt={alt}
            className={cn('object-cover', className)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
            onError={function (e) {
                if (error) return;
                e.currentTarget.src = errorImage;
                e.currentTarget.srcset = '';
                setError(true);
            }}
            {...props}
        />
    );
};

export default LazyImage;
