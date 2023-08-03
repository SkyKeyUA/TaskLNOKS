/** @format */

import React from 'react';
import styles from './UrlForm.module.scss';
import { useInput } from '@/hooks/useInput';
import axios from '@/api';
import { useAppDispatch } from '@/hooks/redux';
import { fetchShortUrls } from '@/redux/reducers/shortUrl/asyncActions';
import { IShortUrl } from '@/types/shortUrl';
import { useRouter } from 'next/router';

interface shortUrlListProps {
  shortUrls: IShortUrl[];
}

export const UrlForm: React.FC<shortUrlListProps> = ({ shortUrls }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const longUrl = useInput('');
  const sendForm = () => {
    const formData = {
      longUrl: longUrl.value,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/shortUrl`, formData)
      .then((res) => router.push(`${process.env.REACT_APP}`))
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchShortUrls());
  };
  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        type="text"
        value={longUrl.value}
        onChange={longUrl.onChange}
      />
      <button className={styles.btn} onClick={sendForm}>
        Send
      </button>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        {shortUrls.length > 0
          ? `This is your last short Url: ${process.env.REACT_APP_API_URL}/shortUrl/${
              shortUrls[shortUrls.length - 1].shortUrl
            }`
          : ''}
      </div>
    </div>
  );
};
