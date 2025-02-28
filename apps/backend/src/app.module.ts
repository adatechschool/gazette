import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import ormConfig from './mikro-orm.config';
import { ContentModule } from './modules/content/content.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MikroOrmModule.forRoot(ormConfig), ContentModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
