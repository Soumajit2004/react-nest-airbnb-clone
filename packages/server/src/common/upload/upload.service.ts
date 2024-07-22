import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private s3Client = new S3Client({
    region: this.configService.get('AWS_S3_REGION'),
    endpoint: this.configService.get('AWS_S3_ENDPOINT'),
    credentials: {
      accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_S3_SECRET_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}
}
