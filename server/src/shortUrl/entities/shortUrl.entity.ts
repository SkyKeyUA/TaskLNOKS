import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ShortUrl extends Document {
  @Prop({ required: true })
  longUrl: string;

  @Prop({ required: true })
  shortUrl: string;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
