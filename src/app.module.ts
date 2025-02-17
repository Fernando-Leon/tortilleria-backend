import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data-source';
import { SexsModule } from './catalogs/sex/sexs.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, SexsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
