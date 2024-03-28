import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString:
  "postgres://default:a3gWLKhVnzi9@ep-noisy-hat-a49giqxr-pooler.us-east-1.aws.neon.tech:5432/verceldb",
  ssl: {
    rejectUnauthorized: false,
    sslmode: "require",
  },
});

const createTables = async () => {
  try {
    const client = await pool.connect();
    await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id_user SERIAL PRIMARY KEY,
      name VARCHAR(255),
      password VARCHAR(255)
  );
  
  CREATE TABLE IF NOT EXISTS folders (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id_user)
  );
  
  CREATE TABLE IF NOT EXISTS files (
      id SERIAL PRIMARY KEY,
      folder_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      FOREIGN KEY (folder_id) REFERENCES folders(id)
  );
  
   
    `);
    client.release();
    console.log("Tabelas e campos criados com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabelas e campos:", error);
  }
};

createTables();

export default pool;