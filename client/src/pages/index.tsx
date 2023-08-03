/** @format */

import { UrlForm } from '@/components/Urls/UrlForm';
import { UrlList } from '@/components/Urls/UrlList';
import { useAppDispatch } from '@/hooks/redux';
import MainLayout from '@/layouts/MainLayout';
import { fetchShortUrls } from '@/redux/reducers/shortUrl/asyncActions';
import { useShortUrlsSelector } from '@/redux/reducers/shortUrl/selectors';
import React from 'react';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { shortUrls, statusUrls } = useShortUrlsSelector();
  React.useEffect(() => {
    dispatch(fetchShortUrls());
  }, []);
  if (statusUrls === 'loading') {
    return <div>Loading...</div>;
  }

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
          <UrlForm shortUrls={shortUrls} />
          <h3 style={{ fontSize: 16, color: 'gray', marginBottom: '20px' }}>
            The best Url in the world!
          </h3>
          {shortUrls.length > 0 ? (
            <UrlList shortUrls={shortUrls} />
          ) : (
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>No one short Url not found.</div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
