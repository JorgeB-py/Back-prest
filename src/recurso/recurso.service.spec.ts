import { Test, TestingModule } from '@nestjs/testing';
import { RecursoService } from './recurso.service';
import { Repository } from 'typeorm';
import { RecursoEntity } from './recurso.entity';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RecursoService', () => {
  let service: RecursoService;
  let Repository: Repository<RecursoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RecursoService],
    }).compile();

    service = module.get<RecursoService>(RecursoService);
    //repository = module.get<Repository<RecursoEntity>>(getRepositoryToken(RecursoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
