import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const HomePage = () => {
  return (
    <div className="">
      {/* Header */}
      <header>
        <h1>Welcome to Our Landing Page</h1>
        <p>Your one-stop solution for all your needs.</p>
      </header>

      {/* Hero Section */}
      <section>
        <Card>
          <h2>Discover Amazing Features</h2>
          <p>Explore the best tools and services we offer to help you succeed.</p>
          <Button variant="primary">Get Started</Button>
        </Card>
      </section>

      {/* Footer */}
      <footer>

            <p>&copy; 2023 Your Company. All rights reserved.</p>

      </footer>
      </div>
  );
};

export default HomePage;
