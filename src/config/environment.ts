import * as Joi from 'joi';

export const AUTH_OTP_EXPIRATION_TIME_SECONDS = parseInt(
  process.env.AUTH_OTP_EXPIRATION_TIME_SECONDS,
  10,
);

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
  CI = 'ci',
}

export interface DatabaseConfig {
  name: string;
  username: string;
  password: string;
  database: string;
  uri: string;
}

export const environmentValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'ci')
    .default('development'),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_URI: Joi.string().required(),
});

export default () => ({
  port: parseInt(process.env.PORT, 10),
  environment: process.env.NODE_ENV,
  database: {
    uri: process.env.DATABASE_URI,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});
