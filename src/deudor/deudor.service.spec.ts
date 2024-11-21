import { Test, TestingModule } from '@nestjs/testing';
import { DeudorService } from './deudor.service';
import { DeudorEntity } from './deudor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

describe('DeudorService', () => {
  let service: DeudorService;
  let repository: Repository<DeudorEntity>;

  const mockDeudorArray = [
    {
      id: '1',
      nombrecompleto: 'John Doe',
      direccion: '123 Main St',
      telefono: '1234567890',
      email: 'john.doe@example.com',
      prestamos: [],
    },
    {
      id: '2',
      nombrecompleto: 'Jane Doe',
      direccion: '456 Elm St',
      telefono: '0987654321',
      email: 'jane.doe@example.com',
      prestamos: [],
    },
  ] as DeudorEntity[];
  
  const mockDeudor = {
    id: '3',
    nombrecompleto: 'New Deudor',
    direccion: '789 Oak St',
    telefono: '1122334455',
    email: 'new.deudor@example.com',
    prestamos: [],
  } as DeudorEntity;

  const mockRepository = {
    find: jest.fn().mockResolvedValue(mockDeudorArray),
    findOne: jest.fn().mockResolvedValue(mockDeudor),
    save: jest.fn().mockResolvedValue(mockDeudor),
    remove: jest.fn().mockResolvedValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeudorService,
        {
          provide: getRepositoryToken(DeudorEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DeudorService>(DeudorService);
    repository = module.get<Repository<DeudorEntity>>(getRepositoryToken(DeudorEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of deudores', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockDeudorArray);
      expect(repository.find).toHaveBeenCalledWith({ relations: ['prestamos'] });
    });
  });

  describe('findOne', () => {
    it('should return a single deudor', async () => {
      mockRepository.findOne.mockResolvedValue(mockDeudor);
      const result = await service.findOne('3');
      expect(result).toEqual(mockDeudor);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '3' }, relations: ['prestamos'] });
    });

    it('should throw an exception if deudor is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      try {
        await service.findOne('999');
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessLogicException);
        expect(error.message).toBe("The deudor with the given id was not found");
      }
  });
  
  });

  describe('create', () => {
    it('should create and return a deudor', async () => {
      const result = await service.create(mockDeudor);
      expect(result).toEqual(mockDeudor);
      expect(repository.save).toHaveBeenCalledWith(mockDeudor);
    });
  });

  describe('update', () => {
    it('should update and return the deudor', async () => {
      mockRepository.findOne.mockResolvedValue(mockDeudor);
      const updatedDeudor = { ...mockDeudor, nombrecompleto: 'Updated Name' };
      mockRepository.save.mockResolvedValue(updatedDeudor);

      const result = await service.update('3', updatedDeudor as DeudorEntity);
      expect(result).toEqual(updatedDeudor);
      expect(repository.save).toHaveBeenCalledWith({ ...mockDeudor, nombrecompleto: 'Updated Name' });
    });

    it('should throw an exception if deudor is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      try {
        await service.findOne('999');
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessLogicException);
        expect(error.message).toBe("The deudor with the given id was not found");
      }
    });
  });

  describe('delete', () => {
    it('should delete the deudor', async () => {
      mockRepository.findOne.mockResolvedValue(mockDeudor);
      await service.delete('3');
      expect(repository.remove).toHaveBeenCalledWith(mockDeudor);
    });

    it('should throw an exception if deudor is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      try {
        await service.findOne('999');
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessLogicException);
        expect(error.message).toBe("The deudor with the given id was not found");
      }
    });
  });
});
