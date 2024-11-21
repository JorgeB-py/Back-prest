import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PrestamistaEntity } from './prestamista.entity';
import { PrestamistaService } from './prestamista.service';

describe('PrestamistaService', () => {
 let service: PrestamistaService;
 let repository: Repository<PrestamistaEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [PrestamistaService],
   }).compile();

   service = module.get<PrestamistaService>(PrestamistaService);
   repository = module.get<Repository<PrestamistaEntity>>(getRepositoryToken(PrestamistaEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});
