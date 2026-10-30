import express, { Request, Response } from 'express';
import { sequelize } from '@shared/database/sequelize.js';

const app = express();
app.use(express.json());

app.get('/health', (_req: Request, res: Response): void => {
    res.status(200).json({ status: 'ok', architecture: 'Hexagonal + CQRS + Vertical Slices' });
});

const PORT = Number(process.env.PORT ?? 3000);

async function bootstrap(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL establecida correctamente.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
        process.exit(1);
    }
}

void bootstrap();