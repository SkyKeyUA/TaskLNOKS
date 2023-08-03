/** @format */

import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ShortUrlsSliceState, Status } from './type';
import { IShortUrl } from '@/types/shortUrl';
import { fetchShortUrls } from './asyncActions';

const initialState: ShortUrlsSliceState = {
  shortUrls: [],
  statusUrls: Status.LOADING,
};

const shortUrlsReducer = createSlice({
  name: 'shortUrls',
  initialState,
  reducers: {
    setUrls(state, action: PayloadAction<IShortUrl[]>) {
      state.shortUrls = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      return {
        ...state,
        ...action.payload,
      };
    });
    builder.addCase(fetchShortUrls.pending, (state) => {
      state.shortUrls = [];
      state.statusUrls = Status.LOADING;
    });
    builder.addCase(fetchShortUrls.fulfilled, (state, action) => {
      state.shortUrls = action.payload;
      state.statusUrls = Status.SUCCESS;
    });
    builder.addCase(fetchShortUrls.rejected, (state) => {
      state.shortUrls = [];
      state.statusUrls = Status.ERROR;
    });
  },
});

export const { setUrls } = shortUrlsReducer.actions;

export default shortUrlsReducer.reducer;
