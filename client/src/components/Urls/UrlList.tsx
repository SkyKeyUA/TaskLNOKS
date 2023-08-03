/** @format */

import { IShortUrl } from '@/types/shortUrl';
import Link from 'next/link';
import React from 'react';
import styles from './UrlList.module.scss';

interface shortUrlListProps {
  shortUrls: IShortUrl[];
}

export const UrlList: React.FC<shortUrlListProps> = ({ shortUrls }) => {
  return (
    <ul className={styles.root}>
      {shortUrls.map(({ shortUrl, _id, longUrl }) => (
        <li key={_id}>
          <Link href={longUrl}>{shortUrl}</Link>
        </li>
      ))}
    </ul>
  );
};
