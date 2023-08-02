import { Controller, Get, Post, Body, Param, Redirect } from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-shortUrl.dto';
import { UrlShortService } from './shortUrl.service';

@Controller('/shortUrl')
export class UrlShortController {
  constructor(private readonly urlShortService: UrlShortService) {}

  @Post()
  createShortUrl(@Body() createShortUrlDto: CreateShortUrlDto) {
    return this.urlShortService.createShortUrl(createShortUrlDto.longUrl);
  }

  @Get(':shortUrl')
  @Redirect('', 301)
  redirectToLongUrl(@Param('shortUrl') shortUrl: string) {
    return {
      url: this.urlShortService.getLongUrl(shortUrl),
    };
  }

  @Get()
  getAllShortUrls() {
    return this.urlShortService.getAllShortUrls();
  }
}
