/** @format */

import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

import '@/styles/index.scss';
import MainLayout from '@layouts/MainLayout';
import { wrapper } from '@redux/store';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <MainLayout>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </MainLayout>
  );
}
