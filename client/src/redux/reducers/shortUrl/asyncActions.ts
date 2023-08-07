/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/api';
import { AxiosError } from 'axios';
import { IShortUrl } from '@/types/shortUrl';
import { setUrls } from './reducer';
import { UrlService } from '@/services/UrlService';

export const fetchShortUrls = createAsyncThunk<IShortUrl[]>(
  'urls/fetchUrls',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get<IShortUrl[]>(`shortUrl`);
      dispatch(setUrls(data));
      return data;
    } catch (e) {
      const err = e as AxiosError;
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchLongUrl = createAsyncThunk(
  'urls/fetchLongUrl',
  async (longUrl: { longUrl: string }) => {
    try {
      const response = await UrlService.sendForm(longUrl);
      return response;
    } catch (err) {
      const e = err as AxiosError;
      console.log(e);
      if (e.response?.status === 500) {
        alert('Your long Url is invalid');
      } else {
        alert('An error occurred. Please try again.');
      }
      throw e;
    }
  },
);
