import express, { Request, Response } from 'express';
import { prisma } from '../prisma/prisma'; 

const app = express();
const PORT = 3000;

app.use(express.json());

// Ruta para consultar todas las transacciones (GET)
app.get('/activos', async (req: Request, res: Response) => {
    try {
        const transacciones = await prisma.pronostico.findMany();
        res.status(200).json(transacciones);
    } catch (error) {
        console.error("Error al consultar transacciones:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Ruta para buscar una transacción por ID (GET)
app.get('/activos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const transaccion = await prisma.pronostico.findUnique({
            where: { id: parseInt(id) }
        });
        if (transaccion) {
            res.status(200).json(transaccion);
        } else {
            res.status(404).json({ message: `No se encontró ninguna transacción con el ID ${id}` });
        }
    } catch (error) {
        console.error("Error al buscar transacción:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Ruta para insertar una nueva transacción (POST)
app.post('/activos', async (req: Request, res: Response) => {
    const { resultadoPropuesto, valorApuesta, apostadorId, encuentroDeportivoId } = req.body;
    try {
        const nuevaTransaccion = await prisma.pronostico.create({
            data: {
                resultadoPropuesto,
                valorApuesta,
                apostadorId,
                encuentroDeportivoId
            }
        });
        res.status(201).json(nuevaTransaccion);
    } catch (error) {
        console.error("Error al crear transacción:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Ruta para eliminar una transacción (DELETE)
app.delete('/activos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.$executeRaw`UPDATE Pronostico SET estado = 'Eliminado' WHERE id = ${parseInt(id)}`;
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar transacción:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});


// Escucha en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
