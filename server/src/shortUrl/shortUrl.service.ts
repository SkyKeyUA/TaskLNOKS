import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShortUrl } from './entities/shortUrl.entity';
import { nanoid } from 'nanoid';
import { validateUrl } from '../utils/utils';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UrlShortService {
  constructor(
    @InjectModel(ShortUrl.name) private readonly shortUrlModel: Model<ShortUrl>,
  ) {}

  async createShortUrl(longUrl: string): Promise<ShortUrl> {
    if (!validateUrl(longUrl)) {
      throw new Error('Invalid URL format.');
    }

    const id = nanoid(5);
    const shortUrl = id;

    const newShortUrl: ShortUrl = new this.shortUrlModel({
      longUrl,
      shortUrl,
    });

    return newShortUrl.save();
  }

  async getLongUrl(shortUrl: string): Promise<string> {
    const found = await this.shortUrlModel.findOne({ shortUrl }).exec();
    if (found) {
      return found.longUrl;
    } else {
      throw new NotFoundException('Short URL does not exist.');
    }
  }

  async getAllShortUrls(): Promise<ShortUrl[]> {
    return this.shortUrlModel.find().exec();
  }
}
