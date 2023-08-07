/** @format */

import $api from '@api/index';
import { ILongUrl, IShortUrl } from '@typings/shortUrl';
import { AxiosResponse } from 'axios';

class UrlService {
  static async sendForm(longUrl: { longUrl: string }): Promise<AxiosResponse<ILongUrl>> {
    return $api.post<ILongUrl>('shortUrl', longUrl);
  }
  static async fetchUrl(): Promise<IShortUrl[]> {
    return $api.get('shortUrl');
  }
}

export { UrlService };
