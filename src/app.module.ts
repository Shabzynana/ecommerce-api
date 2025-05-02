import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from './token/token.module';
import dataSource from './database/data-source';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';
import { BullConfigService } from 'config/bullConfigService';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSource.options,
      }),
      dataSourceFactory: async () => dataSource,
    }),
    UserModule, 
    AuthModule, 
    TokenModule,
    BullConfigService,
    EmailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
