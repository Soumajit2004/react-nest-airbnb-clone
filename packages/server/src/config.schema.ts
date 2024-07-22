import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  AWS_S3_REGION: Joi.string().required(),
  AWS_S3_ENDPOINT: Joi.string().uri().required(),
  AWS_S3_ACCESS_KEY: Joi.string().required(),
  AWS_S3_SECRET_KEY: Joi.string().required(),
});
