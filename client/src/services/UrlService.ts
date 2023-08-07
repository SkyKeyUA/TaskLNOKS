/** @format */

import $api from '@/api';
import { ILongUrl } from '@/types/shortUrl';
import { AxiosResponse } from 'axios';

class UrlService {
  static async sendForm(longUrl: { longUrl: string }): Promise<AxiosResponse<ILongUrl>> {
    return $api.post<ILongUrl>('shortUrl', longUrl);
  }
  //   static async fetchUrl(): Promise<IShortUrl[]> {
  //     return $api.get<IShortUrl[]>('shortUrl');
  //   }
}

export { UrlService };
