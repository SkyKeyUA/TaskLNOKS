import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { ShortUrlModule } from './shortUrl/shortUrl.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(process.env.DB_URL),
    ShortUrlModule,
  ],
})
export class AppModule {}
