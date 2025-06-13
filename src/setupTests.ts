
// src/setupTests.ts
// Test setup configuration

import '@testing-library/jest-dom'

// Mock environment variables for tests
process.env.GOOGLE_SHEETS_API_KEY = 'test-key'
process.env.GOOGLE_SPREADSHEET_ID = 'test-sheet-id'
process.env.MAILCHIMP_API_KEY = 'test-mailchimp-key'
process.env.MAILCHIMP_LIST_ID = 'test-list-id'
process.env.CSRF_SECRET = 'test-csrf-secret-that-is-long-enough-for-validation'

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    root: null,
    rootMargin: '',
    thresholds: []
}))

// Console error suppression for expected errors in tests
const originalError = console.error
beforeAll(() => {
    console.error = (...args) => {
        if (
            typeof args[0] === 'string' &&
            args[0].includes('Warning: ReactDOM.render is no longer supported')
        ) {
            return
        }
        originalError.call(console, ...args)
    }
})

afterAll(() => {
    console.error = originalError
})