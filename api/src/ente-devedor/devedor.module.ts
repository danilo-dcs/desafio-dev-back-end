import { Module } from '@nestjs/common';
import { DevedorController } from './devedor.controller';
import { DevedorService } from './devedor.service';

@Module({
  controllers: [DevedorController],
  providers: [DevedorService]
})
export class DevedorModule {}
