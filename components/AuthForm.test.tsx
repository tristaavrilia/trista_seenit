import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from './AuthForm';

describe('AuthForm component', () => {
    it('renders login form by default', () => {
        render(<AuthForm />);

        // Heading Login muncul
        expect(
            screen.getByRole('heading', { name: /login/i }),
        ).toBeInTheDocument();

        // Input email dan password ada
        expect(
            screen.getByPlaceholderText(/enter your email/i),
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/enter your password/i),
        ).toBeInTheDocument();

        // Tombol Login ada
        expect(
            screen.getByRole('button', { name: /login/i }),
        ).toBeInTheDocument();
    });

    it('switches to register form when switch button clicked', async () => {
        render(<AuthForm />);

        const user = userEvent.setup();

        // Tombol untuk switch form (Register) harus ada
        const switchButton = screen.getByRole('button', { name: /register/i });
        expect(switchButton).toBeInTheDocument();

        // Klik tombol switch ke Register
        await user.click(switchButton);

        // Sekarang heading dan tombol berubah ke Register
        expect(
            screen.getByRole('heading', { name: /register/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /register/i }),
        ).toBeInTheDocument();
    });

    it('can switch back to login form', async () => {
        render(<AuthForm />);

        const user = userEvent.setup();

        // Klik switch ke Register dulu
        const switchToRegister = screen.getByRole('button', {
            name: /register/i,
        });
        await user.click(switchToRegister);

        // Klik switch kembali ke Login
        const switchToLogin = screen.getByRole('button', { name: /login/i });
        await user.click(switchToLogin);

        // Pastikan kembali ke Login
        expect(
            screen.getByRole('heading', { name: /login/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /login/i }),
        ).toBeInTheDocument();
    });
});
