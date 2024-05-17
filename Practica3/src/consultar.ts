import {prisma} from '../prisma/prisma';
// Función para consultar todas las transacciones
export async function consultarTransacciones(): Promise<void> {
    try {
        const transacciones = await prisma.pronostico.findMany({
            include: { apostador: true, encuentroDeportivo: true }
        });
        console.log("Transacciones consultadas:", transacciones);
    } catch (error) {
        console.error("Error al consultar transacciones:", error);
    } finally {
        await prisma.$disconnect();
    }
}