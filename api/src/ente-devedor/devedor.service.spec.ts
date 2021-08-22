import { Test, TestingModule } from '@nestjs/testing';
import { DevedorService } from './devedor.service';

describe('DevedorService', () => {
  let service: DevedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevedorService],
    }).compile();

    service = module.get<DevedorService>(DevedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
