/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PagoEntity } from '../pago/pago.entity';
import { Repository } from 'typeorm';
import { PrestamoEntity } from '../prestamo/prestamo.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PrestamoPagoService } from './prestamo-pago.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('PrestamoPagoService', () => {
  let service: PrestamoPagoService;
  let prestamoRepository: Repository<PrestamoEntity>;
  let pagoRepository: Repository<PagoEntity>;
  let prestamo: PrestamoEntity;
  let pagosList : PagoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PrestamoPagoService],
    }).compile();

    service = module.get<PrestamoPagoService>(PrestamoPagoService);
    prestamoRepository = module.get<Repository<PrestamoEntity>>(getRepositoryToken(PrestamoEntity));
    pagoRepository = module.get<Repository<PagoEntity>>(getRepositoryToken(PagoEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    pagoRepository.clear();
    prestamoRepository.clear();

    pagosList = [];
    for(let i = 0; i < 5; i++){
        const pago: PagoEntity = await pagoRepository.save({
        fecha: faker.date.anytime(),
        capital: faker.number.int(),
        interes: faker.number.int()
        })
        pagosList.push(pago);
    }

    prestamo = await prestamoRepository.save({
      monto: parseFloat(faker.finance.amount({ min: 10, max: 100, dec: 0 })),
      interes: parseFloat(faker.finance.amount({ min: 1, max: 10, dec: 0 })),
      fechainicio: faker.date.past(),
      fechafin: faker.date.future(),
      pagado: faker.datatype.boolean(),
    });
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addPagoPrestamo should add an pago to a prestamo', async () => {
    const newPago: PagoEntity = await pagoRepository.save({
      fecha: faker.date.anytime(),
      capital: faker.number.int(),
      interes: faker.number.int()
    });

    const newPrestamo: PrestamoEntity = await prestamoRepository.save({
      monto: parseFloat(faker.finance.amount({ min: 10, max: 100, dec: 0 })),
      interes: parseFloat(faker.finance.amount({ min: 1, max: 10, dec: 0 })),
      fechainicio: faker.date.past(),
      fechafin: faker.date.future(),
      pagado: faker.datatype.boolean(),
    })

    const result: PrestamoEntity = await service.addPagoPrestamo(newPrestamo.id, newPago.id);
    
    expect(result.historialpagos.length).toBe(1);
    expect(result.historialpagos[0]).not.toBeNull();
    expect(new Date(result.historialpagos[0].fecha).toISOString().split('T')[0]).toBe(newPago.fecha.toISOString().split('T')[0]);
    expect(result.historialpagos[0].capital).toBe(newPago.capital)
    expect(result.historialpagos[0].interes).toBe(newPago.interes)



  });

});