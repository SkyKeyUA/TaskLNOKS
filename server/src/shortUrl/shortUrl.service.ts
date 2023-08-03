import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShortUrl } from './entities/shortUrl.entity';
import { nanoid } from 'nanoid';
import { validateUrl } from '../utils/utils';
import { NotFoundException } from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-shortUrl.dto';

@Injectable()
export class UrlShortService {
  constructor(
    @InjectModel(ShortUrl.name) private readonly shortUrlModel: Model<ShortUrl>,
  ) {}

  async create(dto: CreateShortUrlDto): Promise<ShortUrl> {
    if (!validateUrl(dto.longUrl)) {
      throw new Error('Invalid URL format.');
    }

    const id = nanoid(5);
    const shortUrl = id;

    const newShortUrl: ShortUrl = await this.shortUrlModel.create({
      ...dto,
      shortUrl,
    });

    return newShortUrl;
  }

  async getLongUrl(shortUrl: string): Promise<string> {
    const found = await this.shortUrlModel.findOne({ shortUrl }).exec();
    if (found) {
      return found.longUrl;
    } else {
      throw new NotFoundException('Short URL does not exist.');
    }
  }

  async getAll(): Promise<ShortUrl[]> {
    return this.shortUrlModel.find().exec();
  }
}
