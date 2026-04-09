import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
