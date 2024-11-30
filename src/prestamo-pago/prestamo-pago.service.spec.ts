import { Test, TestingModule } from '@nestjs/testing';
import { PrestamoPagoService } from './prestamo-pago.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('PrestamoPagoService', () => {
  let service: PrestamoPagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PrestamoPagoService],
    }).compile();

    service = module.get<PrestamoPagoService>(PrestamoPagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
