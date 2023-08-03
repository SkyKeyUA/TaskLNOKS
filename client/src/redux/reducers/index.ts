/** @format */

import { combineReducers } from '@reduxjs/toolkit';
import shortUrlsReducer from './shortUrl//reducer';

export const rootReducer = combineReducers({
  shortUrls: shortUrlsReducer,
});
