import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
  [k: string]: string;
}

export interface DBConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  private readonly validationScheme = {
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    DB_NAME: Joi.string().required(),
  };

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync('.env'));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object(this.validationScheme);

    const validation = envVarsSchema.validate(envConfig);
    return validation.value;
  }

  get db(): DBConfig {
    return {
      host: String(this.envConfig.DB_HOST),
      port: Number(this.envConfig.DB_PORT),
      user: String(this.envConfig.DB_USER),
      pass: String(this.envConfig.DB_PASS),
      name: String(this.envConfig.DB_NAME),
    };
  }
}
