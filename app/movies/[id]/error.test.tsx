// app/movies/[id]/__tests__/error.test.tsx
import { render, screen } from '@testing-library/react';
import ErrorComponent from './error';

describe('Error component', () => {
    it('renders ErrorMessage with correct message and reset function', () => {
        const mockError = new Error('Test error message');
        const mockReset = jest.fn();

        render(<ErrorComponent error={mockError} reset={mockReset} />);

        // Karena ErrorMessage komponen custom, kita cek teks message error tampil di DOM
        expect(screen.getByText(/test error message/i)).toBeInTheDocument();

        // Bisa juga cek tombol reset muncul (jika ErrorMessage ada tombol reset)
        const resetButton = screen.getByRole('button', { name: /reset/i });
        expect(resetButton).toBeInTheDocument();

        // Simulasi klik tombol reset
        resetButton.click();
        expect(mockReset).toHaveBeenCalled();
    });
});
