import React from 'react';
import './styles.css';

export const Header = () => {
  return (
    <header className="header">
      <h1>Header One</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};
