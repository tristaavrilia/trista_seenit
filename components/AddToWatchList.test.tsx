import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import toast from 'react-hot-toast';
import AddToWatchlistButton from './AddToWatchList';

// Mock hook useWatchlist
jest.mock('react-hot-toast', () => ({
    __esModule: true,
    default: jest.fn(),
    error: jest.fn(),
}));

jest.mock('@/hooks/use-watchlist', () => ({
    useWatchlist: jest.fn(),
}));

describe('AddToWatchlistButton', () => {
    const mockSetIsInWatchlist = jest.fn();
    const mockHandleAddToWishlist = jest.fn();
    const mockHandleRemoveFromWishlist = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders "Add to Watchlist" if not in watchlist', () => {
        require('@/hooks/use-watchlist').useWatchlist.mockReturnValue({
            isInWatchlist: false,
            setIsInWatchlist: mockSetIsInWatchlist,
            handleAddToWishlist: mockHandleAddToWishlist,
            handleRemoveFromWishlist: mockHandleRemoveFromWishlist,
        });

        render(<AddToWatchlistButton movieId={1} />);
        expect(screen.getByRole('button')).toHaveTextContent(
            'Add to Watchlist',
        );
    });

    it('renders "Remove from Watchlist" if in watchlist', () => {
        require('@/hooks/use-watchlist').useWatchlist.mockReturnValue({
            isInWatchlist: true,
            setIsInWatchlist: mockSetIsInWatchlist,
            handleAddToWishlist: mockHandleAddToWishlist,
            handleRemoveFromWishlist: mockHandleRemoveFromWishlist,
        });

        render(<AddToWatchlistButton movieId={1} />);
        expect(screen.getByRole('button')).toHaveTextContent(
            'Remove from Watchlist',
        );
    });

    it('calls handleAddToWishlist and shows toast on adding', async () => {
        require('@/hooks/use-watchlist').useWatchlist.mockReturnValue({
            isInWatchlist: false,
            setIsInWatchlist: mockSetIsInWatchlist,
            handleAddToWishlist:
                mockHandleAddToWishlist.mockResolvedValue(undefined),
            handleRemoveFromWishlist: mockHandleRemoveFromWishlist,
        });

        render(<AddToWatchlistButton movieId={1} />);

        fireEvent.click(screen.getByRole('button'));

        expect(mockSetIsInWatchlist).toHaveBeenCalledWith(true);
        await waitFor(() => {
            expect(mockHandleAddToWishlist).toHaveBeenCalled();
            expect(toast).toHaveBeenCalledWith('Added to watchlist');
        });
    });

    it('calls handleRemoveFromWishlist and shows toast on removing', async () => {
        require('@/hooks/use-watchlist').useWatchlist.mockReturnValue({
            isInWatchlist: true,
            setIsInWatchlist: mockSetIsInWatchlist,
            handleAddToWishlist: mockHandleAddToWishlist,
            handleRemoveFromWishlist:
                mockHandleRemoveFromWishlist.mockResolvedValue(undefined),
        });

        render(<AddToWatchlistButton movieId={1} />);

        fireEvent.click(screen.getByRole('button'));

        expect(mockSetIsInWatchlist).toHaveBeenCalledWith(false);
        await waitFor(() => {
            expect(mockHandleRemoveFromWishlist).toHaveBeenCalled();
            expect(toast).toHaveBeenCalledWith('Removed from watchlist');
        });
    });

    it('shows error toast if adding/removing fails', async () => {
        require('@/hooks/use-watchlist').useWatchlist.mockReturnValue({
            isInWatchlist: false,
            setIsInWatchlist: mockSetIsInWatchlist,
            handleAddToWishlist: jest.fn().mockRejectedValue(new Error('fail')),
            handleRemoveFromWishlist: mockHandleRemoveFromWishlist,
        });

        render(<AddToWatchlistButton movieId={1} />);

        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith(
                'Error updating watchlist',
            );
            // Check if previous state restored
            expect(mockSetIsInWatchlist).toHaveBeenCalledWith(false);
        });
    });
});
