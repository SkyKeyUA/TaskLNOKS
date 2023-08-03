import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UrlShortService } from './shortUrl.service';
import { ShortUrl } from './entities/shortUrl.entity';
import { NotFoundException } from '@nestjs/common';

describe('UrlShortService', () => {
  let service: UrlShortService;

  const mockShortUrlModel = {
    find: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
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

  describe('create', () => {
    it('should throw an error for an invalid URL format', async () => {
      const invalidUrl = 'invalid-url';
      const dto = { longUrl: invalidUrl };
      await expect(service.create(dto)).rejects.toThrowError(
        'Invalid URL format.',
      );
    });

    it('should call the create method with correct arguments for a valid URL', async () => {
      const validUrl = 'https://www.example.com/';
      const dto = { longUrl: validUrl };
      const mockShortUrl = { ...dto, shortUrl: 'abc123', _id: 'some-id' };
      mockShortUrlModel.create.mockResolvedValue(mockShortUrl);

      const result = await service.create(dto);

      expect(result).toEqual(mockShortUrl);
      expect(mockShortUrlModel.create).toHaveBeenCalledWith({
        ...dto,
        shortUrl: expect.any(String),
      });
    });
  });

  describe('getLongUrl', () => {
    it('should throw NotFoundException when short URL is not found', async () => {
      const shortUrl = 'non-existent-short-url';
      mockShortUrlModel.exec.mockResolvedValue(null);

      await expect(service.getLongUrl(shortUrl)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should return the long URL when short URL is found', async () => {
      const shortUrl = 'existing-short-url';
      const mockShortUrl = {
        longUrl: 'https://www.example.com/',
        shortUrl,
        _id: 'some-id',
      };
      mockShortUrlModel.exec.mockResolvedValue(mockShortUrl);

      const result = await service.getLongUrl(shortUrl);

      expect(result).toBe(mockShortUrl.longUrl);
    });
  });

  describe('getAll', () => {
    it('should return an array of short URLs', async () => {
      const mockShortUrls = [
        {
          longUrl: 'https://www.example.com/',
          shortUrl: 'abc123',
          _id: 'some-id-1',
        },
        {
          longUrl: 'https://www.example.org/',
          shortUrl: 'def456',
          _id: 'some-id-2',
        },
      ];
      mockShortUrlModel.exec.mockResolvedValue(mockShortUrls);

      const result = await service.getAll();

      expect(result).toEqual(mockShortUrls);
    });
  });
});
