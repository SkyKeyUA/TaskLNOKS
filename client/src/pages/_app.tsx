/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import '@/styles/index.scss';
import { wrapper } from '@redux/store';
import MainLayout from '@layouts/MainLayout';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...props.pageProps} />
      </MainLayout>
    </Provider>
  );
}
