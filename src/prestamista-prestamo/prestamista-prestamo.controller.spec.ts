import { Test, TestingModule } from '@nestjs/testing';
import { PrestamistaPrestamoController } from './prestamista-prestamo.controller';

describe('PrestamistaPrestamoController', () => {
  let controller: PrestamistaPrestamoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrestamistaPrestamoController],
    }).compile();

    controller = module.get<PrestamistaPrestamoController>(PrestamistaPrestamoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
