// src/seeder.ts


import { NestFactory } from "@nestjs/core";
import { initializeDataSource } from "../data-source";
// import { AppModule } from '../../app.module';
import { SeedModule } from "./seeding.module";
import { SeedService } from "./seeding.service";

async function bootstrap() {

    const appContext = await NestFactory.createApplicationContext(SeedModule);
    const seeder = appContext.get(SeedService);

    const arg = process.argv[2];

    try {
      switch (arg) {
        case 'categoryProduct':
          await seeder.seedProductCategory();
          break;
        case 'user':
          await seeder.seedUser();
          break;
        default:
          console.log('Invalid seed argument');
          break;
      }
    } catch (error) {
      console.error('❌ Seeding failed:', error);
    } finally {
      await appContext.close();
    }
  
}

bootstrap()
