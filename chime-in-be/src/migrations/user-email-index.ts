import { Db } from 'mongodb';

module.exports = {
  // The up function is called when you run the migration
  async up(db: Db) {
    // Create an index on the email field in the users collection with the unique constraint
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
  },

  // The down function is called when you rollback the migration
  async down(db: Db) {
    await db.collection('users').dropIndex('email_1');
  },
};
