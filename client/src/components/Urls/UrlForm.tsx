/** @format */

import React from 'react';
import styles from './UrlForm.module.scss';
import { useInput } from '@/hooks/useInput';
import axios from '@/api';
import { useAppDispatch } from '@/hooks/redux';
import { fetchShortUrls } from '@/redux/reducers/shortUrl/asyncActions';
import { IShortUrl } from '@/types/shortUrl';

interface shortUrlListProps {
  shortUrls: IShortUrl[];
}

export const UrlForm: React.FC<shortUrlListProps> = ({ shortUrls }) => {
  const dispatch = useAppDispatch();
  const longUrl = useInput('');
  const [matchingShortUrl, setMatchingShortUrl] = React.useState<string | null>(null);
  const [active, setActive] = React.useState(false);
  const sendForm = () => {
    console.log(longUrl.value);
    const formData = {
      longUrl: longUrl.value,
    };
    axios.post(`${process.env.REACT_APP_API_URL}/shortUrl`, formData).catch((e) => {
      console.log(e);
    });
    dispatch(fetchShortUrls());
    setActive(true);
  };
  React.useEffect(() => {
    if (shortUrls) {
      const matchingShort = shortUrls.find((url) => url.longUrl === longUrl.value);
      if (matchingShort) {
        setMatchingShortUrl(matchingShort.shortUrl);
      } else {
        setMatchingShortUrl(null);
      }
    }
  }, [longUrl.value, shortUrls]);

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
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {active && `This is your short Url: ${process.env.REACT_APP_API_URL}/${matchingShortUrl}`}
      </div>
    </div>
  );
};
