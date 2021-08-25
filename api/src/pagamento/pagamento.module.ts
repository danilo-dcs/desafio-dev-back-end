import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoEntity } from './pagamento.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      PagamentoEntity
    ])
  ],  

  providers: [PagamentoService],
  controllers: [PagamentoController]
})
export class PagamentoModule {}
