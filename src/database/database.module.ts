import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';
import { Connection, createConnection } from 'typeorm';
import { CommonModule } from '../common/common.module';
import { ConfigService } from '../common/services/config.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CommonModule],
      inject: [ConfigService],
      name: 'ELearning',
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5555,
        username: 'dinhloc',
        password: 'dinhloc',
        database: 'elearning',
        entities: [join(__dirname + '/**/models/*.entity{.ts,.js}')],
        synchronize: true,
        migrationsRun: true,
        migrations: [
          __dirname + '/**/migrations/*{.ts,.js}',
          __dirname + '/**/seedings/*{.ts,.js}',
        ],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
      }),
    })
  ],
  providers: [],
  exports: []
})

export class DatabaseModule {
  public async runMigrations(configService: ConfigService) {
    const connection: Connection = await createConnection({
      type: "postgres",
      host: 'localhost',
      port: 5555,
      username: 'dinhloc',
      password: "dinhloc",
      database: 'elearning',
    });
    return connection.runMigrations({ transaction: 'each' });
  }
}