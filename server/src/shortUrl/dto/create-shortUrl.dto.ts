import { IsUrl } from 'class-validator';

class CreateShortUrlDto {
  @IsUrl()
  readonly longUrl: string;
}

export { CreateShortUrlDto };
