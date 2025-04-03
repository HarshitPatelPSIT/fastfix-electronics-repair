import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { eq } from 'drizzle-orm';
import * as schema from '@shared/schema';

const { Pool } = pg;

// Function to run migrations
async function runMigrations() {
  console.log('Starting database migrations...');
  
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  // Create a PostgreSQL connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // Create a Drizzle instance
  const db = drizzle(pool, { schema });

  // Run migrations
  try {
    await migrate(db, { migrationsFolder: 'migrations' });
    console.log('Migrations completed successfully');
    
    // Create a default user for testing
    try {
      const existingUser = await db.select().from(schema.users).where(eq(schema.users.username, 'demo'));
      
      if (existingUser.length === 0) {
        await db.insert(schema.users).values({
          username: 'demo',
          password: 'password',
          name: 'Demo User',
          email: 'demo@example.com',
          phone: '123-456-7890'
        });
        console.log('Created demo user');
      } else {
        console.log('Demo user already exists');
      }
    } catch (error) {
      console.error('Error creating demo user:', error);
    }
    
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run migrations
runMigrations().catch(console.error);