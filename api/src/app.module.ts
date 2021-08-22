import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredorModule } from './credor/credor.module';
import { DevedorModule } from './ente-devedor/devedor.module';
import { PagamentoModule } from './pagamento/pagamento.module';


@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: true,
      synchronize: true

    }),

    CredorModule,
    DevedorModule,
    PagamentoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
