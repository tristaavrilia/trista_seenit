/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LogoutButton from './Logout';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// Mock firebase auth signOut
jest.mock('firebase/auth', () => ({
    signOut: jest.fn(),
}));

// Mock next/navigation useRouter
const mockRefresh = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        refresh: mockRefresh,
    }),
}));

describe('LogoutButton', () => {
    it('renders logout button', () => {
        render(<LogoutButton />);
        expect(
            screen.getByRole('button', { name: /logout/i }),
        ).toBeInTheDocument();
    });

    it('calls signOut and refresh on click', async () => {
        (signOut as jest.Mock).mockResolvedValueOnce(undefined);

        render(<LogoutButton />);
        fireEvent.click(screen.getByRole('button', { name: /logout/i }));

        expect(signOut).toHaveBeenCalledWith(expect.anything()); // auth param
        // wait for async, then check refresh
        // since fireEvent is sync, use waitFor
        await new Promise(process.nextTick);
        expect(mockRefresh).toHaveBeenCalled();
    });

    it('logs error if signOut fails', async () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        (signOut as jest.Mock).mockRejectedValueOnce(new Error('fail'));

        render(<LogoutButton />);
        fireEvent.click(screen.getByRole('button', { name: /logout/i }));

        await new Promise(process.nextTick);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Logout failed:',
            expect.any(Error),
        );

        consoleErrorSpy.mockRestore();
    });
});
