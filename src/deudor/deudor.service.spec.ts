import { Test, TestingModule } from '@nestjs/testing';
import { DeudorService } from './deudor.service';

describe('DeudorService', () => {
  let service: DeudorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeudorService],
    }).compile();

    service = module.get<DeudorService>(DeudorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
