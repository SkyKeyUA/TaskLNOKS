import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UrlShortService } from './shortUrl.service';
import { ShortUrl } from './entities/shortUrl.entity';

describe('UrlShortService', () => {
  let service: UrlShortService;

  const mockShortUrlModel = {
    find: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlShortService,
        {
          provide: getModelToken(ShortUrl.name),
          useValue: mockShortUrlModel,
        },
      ],
    }).compile();

    service = module.get<UrlShortService>(UrlShortService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
