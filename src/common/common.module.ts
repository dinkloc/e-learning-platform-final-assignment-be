import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';

@Global()
@Module({
  imports: [ConfigService],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(".env")
    }
  ],
  exports: [ConfigService]
})


export class CommonModule {}