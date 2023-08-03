import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Redirect,
  NotFoundException,
} from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-shortUrl.dto';
import { UrlShortService } from './shortUrl.service';

@Controller('/shortUrl')
export class UrlShortController {
  constructor(private urlShortService: UrlShortService) {}

  @Post()
  create(@Body() dto: CreateShortUrlDto) {
    return this.urlShortService.create(dto);
  }

  @Get(':shortUrl')
  @Redirect('', 301)
  async redirectToLongUrl(@Param('shortUrl') shortUrl: string) {
    try {
      const longUrl = await this.urlShortService.getLongUrl(shortUrl);
      return { url: longUrl };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Short URL does not exist.');
      }
      throw error;
    }
  }

  @Get()
  getAll() {
    return this.urlShortService.getAll();
  }
}
