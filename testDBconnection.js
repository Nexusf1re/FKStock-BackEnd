import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL);

const testDbConnection = async () => {
    try {
        const result = await sql`SELECT * FROM "FK Stock"`;
        console.log('Database connection successful:', result);
    } catch (error) {
        console.error('Database connection failed:', error.message);
        console.error('Error details:', error);
    } finally {
        sql.end(); // Close the database connection
    }
};

testDbConnection();