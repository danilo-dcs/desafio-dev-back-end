import { Test, TestingModule } from '@nestjs/testing';
import { CredorController } from './credor.controller';

describe('CredorController', () => {
  let controller: CredorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CredorController],
    }).compile();

    controller = module.get<CredorController>(CredorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
