import { Module } from '@nestjs/common';
import { CredorService } from './credor.service';
import { CredorController } from './credor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredorEntity } from './credor.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      CredorEntity
    ])
  ],
  providers: [CredorService],
  controllers: [CredorController],
  exports: [CredorService]
})
export class CredorModule {}
