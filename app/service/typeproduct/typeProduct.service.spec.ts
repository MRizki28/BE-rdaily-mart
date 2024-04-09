import { Test, TestingModule } from '@nestjs/testing';
import { TypeProductService } from './typeProduct.service';

describe('TypeproductService', () => {
  let service: TypeProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeProductService],
    }).compile();

    service = module.get<TypeProductService>(TypeProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
