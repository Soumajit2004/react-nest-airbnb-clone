import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ListingModule } from './modules/listing/listing.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './shared/upload/upload.module';
import { BookingModule } from './modules/booking/booking.module';

import { configValidationSchema } from './config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleCloudModule } from './shared/google-cloud/google-cloud.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.STAGE === 'prod',
      envFilePath: [`.env.stage.${process.env.STAGE}`, '.env'],
      validationSchema: configValidationSchema,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: configService.get('STAGE') !== 'prod',
        };
      },
    }),
    ListingModule,
    AuthModule,
    UploadModule,
    BookingModule,
    GoogleCloudModule,
  ],
})
export class AppModule {
}
