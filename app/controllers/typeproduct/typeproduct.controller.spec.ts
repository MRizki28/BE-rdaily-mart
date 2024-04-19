import { Test, TestingModule } from '@nestjs/testing';
import { TypeProductController } from './typeproduct.controller';

describe('typeProductController', () => {
  let controller: TypeProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeProductController],
    }).compile();

    controller = module.get<TypeProductController>(TypeProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
