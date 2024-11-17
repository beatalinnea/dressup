/**
 * Test component that testes each if statement within the useEffect() hook within the LookPart component.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import LookPart from './LookPart';


describe('LookPart', () => {
    test('renders "No item added..." when allShoes is null', () => {
      render(<LookPart category="shoes" allShoes={null} onChange={() => {}} />);
      const noItemAddedElement = screen.getByText('Nothing added here...');
      expect(noItemAddedElement).toBeInTheDocument();
    });
  
    test('renders "No item added..." when allPants is null', () => {
      render(<LookPart category="pants" allPants={null} onChange={() => {}} />);
      const noItemAddedElement = screen.getByText('Nothing added here...');
      expect(noItemAddedElement).toBeInTheDocument();
    });
  
    test('renders "No item added..." when allTops is null', () => {
      render(<LookPart category="tops" allTops={null} onChange={() => {}} />);
      const noItemAddedElement = screen.getByText('Nothing added here...');
      expect(noItemAddedElement).toBeInTheDocument();
    });
  });
  