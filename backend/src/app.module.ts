import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './module/Auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
