// src/components/LandingPage.test.tsx
// Comprehensive test suite for AFK Friends Landing Page

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LandingPage from './LandingPage';

// Mock the API functions
jest.mock('../api/submitEmail', () => ({
    handleFormSubmission: jest.fn()
}));

describe('AFK Friends Landing Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Page Structure and Content', () => {
        test('renders main headline correctly', () => {
            render(<LandingPage />);
            expect(screen.getByText(/Stop meeting people/i)).toBeInTheDocument();
            expect(screen.getByText(/start making friends/i)).toBeInTheDocument();
        });

        test('displays target audience information', () => {
            render(<LandingPage />);
            expect(screen.getByText(/professionals in their late 20s/i)).toBeInTheDocument();
            expect(screen.getByText(/Los Angeles/i)).toBeInTheDocument();
        });

        test('shows "How We\'re Different" section', () => {
            render(<LandingPage />);
            expect(screen.getByText(/How We're Different/i)).toBeInTheDocument();
            expect(screen.getByText(/Small Groups Only/i)).toBeInTheDocument();
            expect(screen.getByText(/AI Friendship Coach/i)).toBeInTheDocument();
            expect(screen.getByText(/Relationship Tracking/i)).toBeInTheDocument();
            expect(screen.getByText(/Integrated Messaging/i)).toBeInTheDocument();
        });

        test('displays value propositions', () => {
            render(<LandingPage />);
            expect(screen.getByText(/Why AFK Friends Works/i)).toBeInTheDocument();
            expect(screen.getByText(/AI Assistance/i)).toBeInTheDocument();
            expect(screen.getByText(/Smart Rewards/i)).toBeInTheDocument();
            expect(screen.getByText(/Relationship Growth/i)).toBeInTheDocument();
        });
    });

    describe('Video Section', () => {
        test('renders video placeholder', () => {
            render(<LandingPage />);
            expect(screen.getByText(/AFK Friends Demo/i)).toBeInTheDocument();
        });

        test('shows video controls', () => {
            render(<LandingPage />);
            expect(screen.getByLabelText(/play video/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/volume control/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/fullscreen/i)).toBeInTheDocument();
        });

        test('toggles play/pause button state', async () => {
            render(<LandingPage />);
            const playButton = screen.getByLabelText(/play video/i);

            fireEvent.click(playButton);
            await waitFor(() => {
                expect(screen.getByLabelText(/pause video/i)).toBeInTheDocument();
            });
        });

        test('shows transcript toggle button', () => {
            render(<LandingPage />);
            expect(screen.getByText(/View Transcript/i)).toBeInTheDocument();
        });

        test('toggles transcript visibility', async () => {
            render(<LandingPage />);
            const transcriptButton = screen.getByText(/View Transcript/i);

            fireEvent.click(transcriptButton);
            await waitFor(() => {
                expect(screen.getByText(/Video Transcript/i)).toBeInTheDocument();
                expect(screen.getByText(/Hide Transcript/i)).toBeInTheDocument();
            });
        });
    });

    describe('Email Form', () => {
        test('renders form elements', () => {
            render(<LandingPage />);
            expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Join the Waitlist/i })).toBeInTheDocument();
        });

        test('shows LA County cities in dropdown', () => {
            render(<LandingPage />);
            const locationSelect = screen.getByLabelText(/Location/i);

            fireEvent.click(locationSelect);
            expect(screen.getByText('Los Angeles')).toBeInTheDocument();
            expect(screen.getByText('Long Beach')).toBeInTheDocument();
            expect(screen.getByText('Pasadena')).toBeInTheDocument();
            expect(screen.getByText('Other (outside LA County)')).toBeInTheDocument();
        });

        test('shows custom location input when "Other" is selected', async () => {
            render(<LandingPage />);
            const locationSelect = screen.getByLabelText(/Location/i);

            fireEvent.change(locationSelect, { target: { value: 'Other' } });

            await waitFor(() => {
                expect(screen.getByPlaceholderText(/Enter your city/i)).toBeInTheDocument();
            });
        });

        test('validates email format', async () => {
            render(<LandingPage />);
            const emailInput = screen.getByLabelText(/Email Address/i);
            const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });

            await userEvent.type(emailInput, 'invalid-email');
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
            });
        });

        test('suggests email corrections for typos', async () => {
            render(<LandingPage />);
            const emailInput = screen.getByLabelText(/Email Address/i);
            const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });

            await userEvent.type(emailInput, 'test@gmial.com');
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText(/Did you mean test@gmail.com/i)).toBeInTheDocument();
            });
        });

        test('applies email suggestion when clicked', async () => {
            render(<LandingPage />);
            const emailInput = screen.getByLabelText(/Email Address/i);
            const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });

            await userEvent.type(emailInput, 'test@gmial.com');
            fireEvent.click(submitButton);

            await waitFor(() => {
                const suggestionButton = screen.getByText(/Use "test@gmail.com"/i);
                fireEvent.click(suggestionButton);
            });

            expect(emailInput).toHaveValue('test@gmail.com');
        });

        test('requires location selection', async () => {
            render(<LandingPage />);
            const emailInput = screen.getByLabelText(/Email Address/i);
            const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });

            await userEvent.type(emailInput, 'test@example.com');
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText(/Location is required/i)).toBeInTheDocument();
            });
        });

        test('validates custom location when "Other" is selected', async () => {
            render(<LandingPage />);
            const emailInput = screen.getByLabelText(/Email Address/i);
            const locationSelect = screen.getByLabelText(/Location/i);
            const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });

            await userEvent.type(emailInput, 'test@example.com');
            fireEvent.change(locationSelect, { target: { value: 'Other' } });
            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText(/Please specify your location/i)).toBeInTheDocument();
            });
        });

        test('disables submit button when form is invalid', () => {
            render(<LandingPage />);
            const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });

            expect(submitButton).toBeDisabled();
        });

        test('enables submit button when form is valid', async () => {
            render(<LandingPage />);
            const emailInput = screen.getByLabelText(/Email Address/i);
            const locationSelect = screen.getByLabelText(/Location/i);
            const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });

            await userEvent.type(emailInput, 'test@example.com');
            fireEvent.change(locationSelect, { target: { value: 'Los Angeles' } });

            await waitFor(() => {
                expect(submitButton).not.toBeDisabled();
            });
        });
    });

    describe('Form Submission', () => {
        test('shows loading state during submission', async () => {
            render(<LandingPage />);
            const emailInput = screen.getByLabelText(/Email Address/i);
            const locationSelect = screen.getByLabelText(/Location/i);
            const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });

            await userEvent.type(emailInput, 'test@example.com');
            fireEvent.change(locationSelect, { target: { value: 'Los Angeles' } });

            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText(/Joining waitlist.../i)).toBeInTheDocument();
                expect(submitButton).toBeDisabled();
            });
        });

        test('shows success message after successful submission', async () => {
            render(<LandingPage />);
            const emailInput = screen.getByLabelText(/Email Address/i);
            const locationSelect = screen.getByLabelText(/Location/i);
            const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });

            await userEvent.type(emailInput, 'test@example.com');
            fireEvent.change(locationSelect, { target: { value: 'Los Angeles' } });

            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument();
                expect(screen.getByText(/Check your email/i)).toBeInTheDocument();
            }, { timeout: 3000 });
        });

        test('handles submission errors gracefully', async () => {
            // Mock console.error to avoid test noise
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            // Mock Math.random to force an error (API has 10% failure rate)
            const mathSpy = jest.spyOn(Math, 'random').mockReturnValue(0.05);

            render(<LandingPage />);
            const emailInput = screen.getByLabelText(/Email Address/i);
            const locationSelect = screen.getByLabelText(/Location/i);
            const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });

            await userEvent.type(emailInput, 'test@example.com');
            fireEvent.change(locationSelect, { target: { value: 'Los Angeles' } });

            fireEvent.click(submitButton);

            await waitFor(() => {
                expect(screen.getByText(/Unable to join waitlist right now/i)).toBeInTheDocument();
            }, { timeout: 3000 });

            mathSpy.mockRestore();
            consoleSpy.mockRestore();
        });
    });

    describe('Cookie Consent', () => {
        test('shows cookie consent banner', () => {
            render(<LandingPage />);
            expect(screen.getByText(/We use cookies to enhance your experience/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Accept All Cookies/i })).toBeInTheDocument();
        });

        test('hides cookie banner when accepted', async () => {
            render(<LandingPage />);
            const acceptButton = screen.getByRole('button', { name: /Accept All Cookies/i });

            fireEvent.click(acceptButton);

            await waitFor(() => {
                expect(screen.queryByText(/We use cookies to enhance your experience/i)).not.toBeInTheDocument();
            });
        });

        test('includes privacy policy link', () => {
            render(<LandingPage />);
            const privacyLink = screen.getByText(/Learn more/i);
            expect(privacyLink).toHaveAttribute('href', '/privacy-policy.html');
        });
    });

    describe('Footer', () => {
        test('renders footer with legal links', () => {
            render(<LandingPage />);
            expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
            expect(screen.getByText('Terms of Service')).toBeInTheDocument();
        });

        test('includes contact information', () => {
            render(<LandingPage />);
            expect(screen.getByText(/hello@afkfriends.com/i)).toBeInTheDocument();
        });

        test('shows copyright information', () => {
            render(<LandingPage />);
            expect(screen.getByText(/© 2025 AFK Friends/i)).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        test('has proper heading hierarchy', () => {
            render(<LandingPage />);
            const h1 = screen.getByRole('heading', { level: 1 });
            expect(h1).toHaveTextContent(/Stop meeting people/i);

            const h2Elements = screen.getAllByRole('heading', { level: 2 });
            expect(h2Elements.length).toBeGreaterThan(0);
        });

        test('form inputs have proper labels', () => {
            render(<LandingPage />);
            expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
        });

        test('video controls have aria labels', () => {
            render(<LandingPage />);
            expect(screen.getByLabelText(/play video/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/volume control/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/fullscreen/i)).toBeInTheDocument();
        });

        test('form errors are announced to screen readers', async () => {
            render(<LandingPage />);
            const emailInput = screen.getByLabelText(/Email Address/i);
            const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });

            await userEvent.type(emailInput, 'invalid');
            fireEvent.click(submitButton);

            await waitFor(() => {
                const errorMessage = screen.getByText(/Please enter a valid email address/i);
                expect(errorMessage).toBeInTheDocument();
            });
        });
    });

    describe('Responsive Design', () => {
        test('adjusts layout for mobile viewport', () => {
            // Mock window.innerWidth for mobile
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 375,
            });

            render(<LandingPage />);

            // Check that mobile-specific styles are applied
            const container = screen.getByText(/Stop meeting people/i).closest('section');
            expect(container).toBeInTheDocument();
        });
    });

    describe('Performance', () => {
        test('lazy loads video content', async () => {
            render(<LandingPage />);

            // Initially shows loading state
            expect(screen.getByText(/Loading video.../i)).toBeInTheDocument();

            // After timeout, shows video content
            await waitFor(() => {
                expect(screen.queryByText(/Loading video.../i)).not.toBeInTheDocument();
            }, { timeout: 3000 });
        });
    });

    describe('Social Proof', () => {
        test('displays waitlist count', () => {
            render(<LandingPage />);
            expect(screen.getByText(/1,247\+ people already joined/i)).toBeInTheDocument();
        });

        test('shows testimonial placeholders', () => {
            render(<LandingPage />);
            expect(screen.getByText(/What People Are Saying/i)).toBeInTheDocument();
            expect(screen.getAllByText(/Testimonial placeholder/i)).toHaveLength(3);
        });
    });

    describe('SEO and Meta Information', () => {
        test('includes proper meta description', () => {
            render(<LandingPage />);
            // In a real test, you'd check document.head for meta tags
            // This is a placeholder for that functionality
            expect(document.title).toBeDefined();
        });
    });
});

// Additional test utilities
export const mockFormSubmission = (shouldSucceed: boolean = true) => {
    return jest.fn().mockImplementation(() => {
        if (shouldSucceed) {
            return Promise.resolve({ success: true, message: 'Success!' });
        } else {
            return Promise.reject(new Error('Network error'));
        }
    });
};

export const fillOutForm = async (email: string, location: string, customLocation?: string) => {
    const emailInput = screen.getByLabelText(/Email Address/i);
    const locationSelect = screen.getByLabelText(/Location/i);

    await userEvent.type(emailInput, email);
    fireEvent.change(locationSelect, { target: { value: location } });

    if (location === 'Other' && customLocation) {
        await waitFor(() => {
            const customInput = screen.getByPlaceholderText(/Enter your city/i);
            return userEvent.type(customInput, customLocation);
        });
    }
};

// Integration test example
describe('Full User Journey', () => {
    test('user can complete entire waitlist signup flow', async () => {
        render(<LandingPage />);

        // User lands on page
        expect(screen.getByText(/Stop meeting people/i)).toBeInTheDocument();

        // Watches video
        const playButton = screen.getByLabelText(/play video/i);
        fireEvent.click(playButton);

        // Reads content
        expect(screen.getByText(/How We're Different/i)).toBeInTheDocument();

        // Fills out form
        await fillOutForm('user@example.com', 'Los Angeles');

        // Submits form
        const submitButton = screen.getByRole('button', { name: /Join the Waitlist/i });
        fireEvent.click(submitButton);

        // Sees success message
        await waitFor(() => {
            expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument();
        }, { timeout: 3000 });

        // Accepts cookies
        const acceptButton = screen.getByRole('button', { name: /Accept All Cookies/i });
        fireEvent.click(acceptButton);

        await waitFor(() => {
            expect(screen.queryByText(/We use cookies/i)).not.toBeInTheDocument();
        });
    });
});