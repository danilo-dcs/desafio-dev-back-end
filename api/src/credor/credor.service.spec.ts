import { Test, TestingModule } from '@nestjs/testing';
import { CredorService } from './credor.service';

describe('CredorService', () => {
  let service: CredorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredorService],
    }).compile();

    service = module.get<CredorService>(CredorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
