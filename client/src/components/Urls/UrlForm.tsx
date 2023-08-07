/** @format */

import React from 'react';
import styles from './UrlForm.module.scss';
import { useAppDispatch } from '@hooks/redux';
import { useShortUrlsSelector } from '@redux/reducers/shortUrl/selectors';
import { useInput } from '@hooks/useInput';
import { fetchLongUrl, fetchShortUrls } from '@redux/reducers/shortUrl/asyncActions';
import { Loader } from '@components/Common/Loader';

export const UrlForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { shortUrls, statusUrls } = useShortUrlsSelector();
  const longUrl = useInput('');
  const sendForm = async () => {
    const formData = {
      longUrl: longUrl.value,
    };
    await dispatch(fetchLongUrl(formData));
    await dispatch(fetchShortUrls());
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
          <Loader />
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
