import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class GoogleCloudService {

  constructor(private readonly configService: ConfigService) {
  }

  private loadCredentials() {
    return {
      'type': this.configService.get('GCP_TYPE'),
      'project_id': this.configService.get('GCP_PROJECT_ID'),
      'private_key_id': this.configService.get('GCP_PRIVATE_KEY_ID'),
      'private_key': this.configService.get('GCP_PRIVATE_KEY'),
      'client_email': this.configService.get('GCP_CLIENT_EMAIL'),
      'client_id': this.configService.get('GCP_CLIENT_ID'),
      'auth_uri': this.configService.get('GCP_AUTH_URI'),
      'token_uri': this.configService.get('GCP_TOKEN_URI'),
      'auth_provider_x509_cert_url': this.configService.get('GCP_AUTH_PROVIDER_X509_CERT_URL'),
      'client_x509_cert_url': this.configService.get('GCP_CLIENT_X509_CERT_URL'),
      'universe_domain': this.configService.get('GCP_UNIVERSE_DOMAIN'),
    };
  }

  getStorage() {
    return new Storage({
      projectId: this.configService.get('GCP_PROJECT_ID'),
      credentials: this.loadCredentials(),
    });
  }
}
