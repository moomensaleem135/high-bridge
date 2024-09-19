// __tests__/ComingSoon.test.tsx

import { expect } from '@jest/globals';

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComingSoon from '@/components/common/ComingSoon';

describe('ComingSoon Component', () => {
  it('should render the ComingSoon component with correct text', () => {
    // Render the ComingSoon component
    render(<ComingSoon />);

    // Assert that the component renders the "Coming Soon!" text
    const comingSoonElement = screen.getByTestId('coming-soon');
    expect(comingSoonElement).toBeInTheDocument();
    expect(comingSoonElement).toHaveTextContent('Coming Soon !');
  });

  it('should have the correct CSS classes applied', () => {
    render(<ComingSoon />);

    // Check if the component has the correct CSS classes
    const comingSoonElement = screen.getByTestId('coming-soon');
    expect(comingSoonElement).toHaveClass(
      'flex justify-center text-3xl font-extrabold items-center pl-4 h-[70vh]'
    );
  });
});
