import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_PASSWORD'] as const;
for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`❌ Falta la variable de entorno obligatoria: ${key}`);
    }
}

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        dialect: 'postgres',
        logging: (sql): void => console.log(`🗄️ [SQL]: ${sql}`),
        define: {
            timestamps: true,         // Crea created_at y updated_at
            paranoid: true,           // Activa BORRADO LÓGICO (deleted_at) en todos los modelos
            underscored: true,        // Usa snake_case en PostgreSQL
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
        },
    }
);