import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevedorController } from './devedor.controller';
import { EnteDevedorEntity } from './devedor.entity';
import { DevedorService } from './devedor.service';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      EnteDevedorEntity
    ])
  ],

  controllers: [DevedorController],
  providers: [DevedorService],
  exports: [DevedorService]
})
export class DevedorModule {}
