/** @format */

import React from 'react';
import styles from './UrlForm.module.scss';
import { useInput } from '@/hooks/useInput';
import axios from '@/api';
import { useAppDispatch } from '@/hooks/redux';
import { fetchShortUrls } from '@/redux/reducers/shortUrl/asyncActions';
import { useShortUrlsSelector } from '@/redux/reducers/shortUrl/selectors';

export const UrlForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { shortUrls, statusUrls } = useShortUrlsSelector();
  const longUrl = useInput('');
  const sendForm = () => {
    const formData = {
      longUrl: longUrl.value,
    };
    axios.post(`${process.env.REACT_APP_API_URL}/shortUrl`, formData).catch((e) => {
      console.log(e);
      if (e.response?.status === 500) {
        alert('Your long Url is invalid');
      } else {
        alert('An error occurred. Please try again.');
      }
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
        {statusUrls === 'loading' ? (
          <div>Loading...</div>
        ) : shortUrls.length > 0 ? (
          `This is your last short Url: ${process.env.REACT_APP_API_URL}/shortUrl/${
            shortUrls[shortUrls.length - 1].shortUrl
          }`
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
