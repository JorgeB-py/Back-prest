import { Test, TestingModule } from '@nestjs/testing';
import { PrestamistaRecursoController } from './prestamista-recurso.controller';

describe('PrestamistaRecursoController', () => {
  let controller: PrestamistaRecursoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrestamistaRecursoController],
    }).compile();

    controller = module.get<PrestamistaRecursoController>(PrestamistaRecursoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
