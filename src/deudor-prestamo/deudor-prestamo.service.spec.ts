import { Test, TestingModule } from '@nestjs/testing';
import { DeudorPrestamoService } from './deudor-prestamo.service';

describe('DeudorPrestamoService', () => {
  let service: DeudorPrestamoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeudorPrestamoService],
    }).compile();

    service = module.get<DeudorPrestamoService>(DeudorPrestamoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
