import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoEntity } from './pagamento.entity';
import { CredorModule } from '../credor/credor.module';
import { DevedorModule } from '../ente-devedor/devedor.module';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      PagamentoEntity
    ]),
    CredorModule,
    DevedorModule
  ],  

  providers: [PagamentoService],
  controllers: [PagamentoController]
})
export class PagamentoModule {}
