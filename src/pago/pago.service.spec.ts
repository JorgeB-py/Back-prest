import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PagoService } from './pago.service';


describe('PagoService', () => {
  let service: PagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PagoService],
    }).compile();

    service = module.get<PagoService>(PagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
