import { Module, Logger } from '@nestjs/common'; // Import Logger
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { DbMigrationService } from './db-migration.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          Logger.log('Database connected', 'MongooseModule');
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [DbMigrationService],
})
export class DatabaseModule {
  // forFeature() method is used to define the models that will be used in the module.
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
