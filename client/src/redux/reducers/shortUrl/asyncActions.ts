/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/api';
import { AxiosError } from 'axios';
import { IShortUrl } from '@/types/shortUrl';
import { setUrls } from './reducer';

export const fetchShortUrls = createAsyncThunk<IShortUrl[]>(
  'urls/fetchUrls',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get<IShortUrl[]>(`${process.env.REACT_APP_API_URL}/shortUrl`);
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
