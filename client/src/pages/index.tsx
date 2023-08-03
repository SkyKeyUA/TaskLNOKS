/** @format */

import MainLayout from '@/layouts/MainLayout';
import React from 'react';

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="center">
          <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: '20px' }}>Url converter</h1>
          <h3 style={{ fontSize: 16, color: 'gray' }}>The best Url in the world!</h3>
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
