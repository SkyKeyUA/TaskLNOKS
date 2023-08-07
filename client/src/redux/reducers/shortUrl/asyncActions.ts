/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { setUrls } from './reducer';
import { IShortUrl } from '@typings/shortUrl';
import { UrlService } from '@services/UrlService';

export const fetchShortUrls = createAsyncThunk<IShortUrl[]>(
  'urls/fetchUrls',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await UrlService.fetchUrl();
      dispatch(setUrls(response));
      return response;
    } catch (e) {
      const err = e as AxiosError;
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  },
);

export const fetchLongUrl = createAsyncThunk(
  'urls/fetchLongUrl',
  async (longUrl: { longUrl: string }) => {
    try {
      const response = await UrlService.sendForm(longUrl);
      return response.data;
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
