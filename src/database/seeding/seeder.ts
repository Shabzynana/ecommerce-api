// src/seeder.ts


import { NestFactory } from "@nestjs/core";
import { initializeDataSource } from "../data-source";
// import { AppModule } from '../../app.module';
import { SeedModule } from "./seeding.module";
import { SeedService } from "./seeding.service";

async function bootstrap() {

    const appContext = await NestFactory.createApplicationContext(SeedModule);
    const seeder = appContext.get(SeedService);

  try {
    await seeder.seedProductCategory();
    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await appContext.close();
  }

  
}

bootstrap()
