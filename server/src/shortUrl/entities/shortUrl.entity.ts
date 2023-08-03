import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShortDocument = HydratedDocument<ShortUrl>;

@Schema()
export class ShortUrl {
  @Prop()
  longUrl: string;

  @Prop()
  shortUrl: string;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
