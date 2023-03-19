import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders lists', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /블로그 리스트 입니다/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

describe('header', () => {
  it('renders a header', () => {
    render(<Header />);

    const heading = screen.getByRole('heading', {
      name: /헤더입니다/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

describe('footer', () => {
  it('renders a footer', () => {
    render(<Footer />);

    const heading = screen.getByRole('heading', {
      name: /푸터입니다/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
