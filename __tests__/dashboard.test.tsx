// __tests__/CreateEvent.test.tsx
import { expect } from '@jest/globals';

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import CreateEvent from '@/components/pages-partial/dashboard';
import { eventApi } from '../src/store/features/events/eventsApi';

// Mock the global fetch function
global.fetch = jest.fn(
  () =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          data: { success: true },
        }),
    } as unknown as Response) // Casting to `Response` to satisfy TypeScript
);

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/create-event', // Mocked pathname
    query: {},
    asPath: '/create-event',
    route: '/create-event',
  }),
  usePathname: jest.fn().mockReturnValue('/create-event'), // Correct mock for usePathname
}));

// Mock the Redux store and the useCreateEventMutation hook
const mockStore = configureStore({
  reducer: {
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware),
});

// Mock the useCreateEventMutation hook
jest.mock('../src/store/features/events/eventsApi', () => ({
  ...jest.requireActual('../src/store/features/events/eventsApi'),
  useCreateEventMutation: () => [
    jest.fn().mockResolvedValue({ data: { success: true } }),
    { isLoading: false },
  ],
}));

// Mock the DatePicker component
jest.mock('../src/components/ui/datepicker', () => ({
  __esModule: true,
  default: ({ onDateChange }: { onDateChange: (date: string) => void }) => (
    <input
      data-testid="event-date"
      onChange={(e) => onDateChange(e.target.value)}
      placeholder="Select Date"
    />
  ),
}));

// Mock the TimePicker component
jest.mock('../src/components/ui/time-picker', () => ({
  __esModule: true,
  default: ({
    onTimeChange,
    placeholder,
    dataTestId,
  }: {
    onTimeChange: (time: string) => void;
    placeholder: string;
    dataTestId: string;
  }) => (
    <input
      data-testid={dataTestId}
      onChange={(e) => onTimeChange(e.target.value)}
      placeholder={placeholder}
    />
  ),
}));

// Mock the TimezoneSelect component
jest.mock('../src/components/ui/timezone-select', () => ({
  __esModule: true,
  default: ({
    onTimezoneChange,
  }: {
    onTimezoneChange: (timezone: string) => void;
  }) => (
    <select
      data-testid="event-timezone"
      onChange={(e) => onTimezoneChange(e.target.value)}
    >
      <option value="GMT">GMT</option>
      <option value="PST">PST</option>
      <option value="EST">EST</option>
    </select>
  ),
}));

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={mockStore}>{ui}</Provider>);
};

describe('Create Event Component', () => {
  // Adding a delay of 1000ms at the start of each test
  beforeEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  it('should render the Create Event component with correct text', () => {
    renderWithProvider(<CreateEvent />);

    expect(screen.getByTestId('page-title')).toHaveTextContent(
      'Create an Event'
    );
    expect(screen.getByTestId('page-description')).toHaveTextContent(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore'
    );
  });

  it('should show validation errors when form is submitted empty', async () => {
    renderWithProvider(<CreateEvent />);

    fireEvent.click(screen.getByTestId('event-submit'));

    await waitFor(() => {
      expect(screen.getByText(/Event name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Timezone is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Start Time is required/i)).toBeInTheDocument();
      expect(screen.getByText(/End Time is required/i)).toBeInTheDocument();
    });
  });

  it('should display an error for a short description', async () => {
    renderWithProvider(<CreateEvent />);

    fireEvent.input(screen.getByTestId('event-name'), {
      target: { value: 'Test Event' },
    });
    fireEvent.input(screen.getByTestId('event-description'), {
      target: { value: 'Short' },
    });
    fireEvent.click(screen.getByTestId('event-submit'));

    await waitFor(() => {
      expect(
        screen.getByText(/Description must be at least 15 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it('should display an error for an invalid video URL', async () => {
    renderWithProvider(<CreateEvent />);

    fireEvent.input(screen.getByTestId('event-name'), {
      target: { value: 'Test Event' },
    });
    fireEvent.input(screen.getByTestId('event-description'), {
      target: { value: 'This is a valid description' },
    });
    fireEvent.input(screen.getByTestId('event-video'), {
      target: { value: 'invalid-url' },
    });
    fireEvent.click(screen.getByTestId('event-submit'));

    await waitFor(() => {
      expect(
        screen.getByText(/Video link must be a valid HTTPS URL/i)
      ).toBeInTheDocument();
    });
  });

  it('should submit the form successfully with valid data', async () => {
    renderWithProvider(<CreateEvent />);

    const eventName = 'Test Event';

    fireEvent.input(screen.getByTestId('event-name'), {
      target: { value: eventName },
    });
    fireEvent.input(screen.getByTestId('event-description'), {
      target: { value: 'This is a valid description that is long enough.' },
    });

    // Interact with the mocked components
    fireEvent.input(screen.getByTestId('event-date'), {
      target: { value: '2023-09-15' },
    });

    fireEvent.change(screen.getByTestId('event-timezone'), {
      target: { value: 'GMT' },
    });

    // Use unique test IDs for start and end time
    fireEvent.input(screen.getByTestId('event-start-time'), {
      target: { value: '10:00' },
    });

    fireEvent.input(screen.getByTestId('event-end-time'), {
      target: { value: '12:00' },
    });

    fireEvent.click(screen.getByTestId('event-submit'));
  });
});
