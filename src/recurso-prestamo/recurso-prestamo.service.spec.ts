import { Test, TestingModule } from '@nestjs/testing';
import { RecursoPrestamoService } from './recurso-prestamo.service';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';

describe('RecursoPrestamoService', () => {
  let service: RecursoPrestamoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RecursoPrestamoService],
    }).compile();

    service = module.get<RecursoPrestamoService>(RecursoPrestamoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
