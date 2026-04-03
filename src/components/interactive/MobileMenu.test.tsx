// src/components/interactive/MobileMenu.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import MobileMenu from './MobileMenu';

const links = [
  { label: 'Home',    href: '/' },
  { label: 'About',   href: '/about' },
  { label: 'Plans',   href: '/plans' },
  { label: 'FAQ',     href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

describe('MobileMenu', () => {
  it('renders the hamburger button', () => {
    render(<MobileMenu links={links} phone="(888) 000-0000" />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('drawer is hidden by default', () => {
    render(<MobileMenu links={links} phone="(888) 000-0000" />);
    expect(screen.queryByRole('navigation', { name: /mobile/i })).not.toBeInTheDocument();
  });

  it('opens the drawer on hamburger click', () => {
    render(<MobileMenu links={links} phone="(888) 000-0000" />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument();
  });

  it('renders all nav links inside drawer', () => {
    render(<MobileMenu links={links} phone="(888) 000-0000" />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    links.forEach(({ label }) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    });
  });

  it('closes the drawer when close button is clicked', () => {
    render(<MobileMenu links={links} phone="(888) 000-0000" />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.queryByRole('navigation', { name: /mobile/i })).not.toBeInTheDocument();
  });
});
