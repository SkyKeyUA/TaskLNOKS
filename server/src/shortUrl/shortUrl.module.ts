import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortService } from './shortUrl.service';
import { UrlShortController } from './shortUrl.controller';
import { ShortUrl, ShortUrlSchema } from './entities/shortUrl.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShortUrl.name, schema: ShortUrlSchema },
    ]),
  ],
  controllers: [UrlShortController],
  providers: [UrlShortService],
})
export class ShortUrlModule {}
