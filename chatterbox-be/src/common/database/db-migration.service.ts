import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config, database, up } from 'migrate-mongo';

@Injectable()
// OnModuleInit is a lifecycle hook that is called once the host module has been initialized.
export class DbMigrationService implements OnModuleInit {
  readonly name: string;

  private readonly dbMigrationConfig: Partial<config.Config> = {
    // DB connection details for the migration tool
    mongodb: {
      databaseName: this.configService.getOrThrow<string>('MONGO_DB_NAME'),
      url: this.configService.getOrThrow<string>('MONGODB_URI'),
    },
    // Location of the migration files
    migrationsDir: `${__dirname}/../../migrations`,
    // collection that migration mongo will use to keep track of the migration
    changelogCollectionName: 'changelog',
    // File extension for the migration files - compiled js in dist directory
    migrationFileExtension: '.js',
  };

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    // Set the configuration for the migration tool
    config.set(this.dbMigrationConfig);
    // Connect to the database
    const { db, client } = await database.connect();
    // Run the migrations
    await up(db, client);
  }
}
