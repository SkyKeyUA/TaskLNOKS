/** @format */

import { IShortUrl } from '@/types/shortUrl';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ShortUrlsSliceState {
  shortUrls: IShortUrl[];
  statusUrls: Status;
}
