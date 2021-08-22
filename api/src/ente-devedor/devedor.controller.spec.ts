import { Test, TestingModule } from '@nestjs/testing';
import { DevedorController } from './devedor.controller';

describe('DevedorController', () => {
  let controller: DevedorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevedorController],
    }).compile();

    controller = module.get<DevedorController>(DevedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
