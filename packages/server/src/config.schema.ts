import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  GCP_TYPE: Joi.string().required(),
  GCP_PROJECT_ID: Joi.string().required(),
  GCP_PRIVATE_KEY_ID: Joi.string().required(),
  GCP_PRIVATE_KEY: Joi.string().required(),
  GCP_CLIENT_EMAIL: Joi.string().required(),
  GCP_CLIENT_ID: Joi.string().required(),
  GCP_AUTH_URI: Joi.string().required(),
  GCP_TOKEN_URI: Joi.string().required(),
  GCP_AUTH_PROVIDER_X509_CERT_URL: Joi.string().required(),
  GCP_CLIENT_X509_CERT_URL: Joi.string().required(),
  GCP_UNIVERSE_DOMAIN: Joi.string().required(),
});