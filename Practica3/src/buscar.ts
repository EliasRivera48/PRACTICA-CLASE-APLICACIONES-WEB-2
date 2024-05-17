import {prisma} from '../prisma/prisma';;

// Función para buscar una transacción por ID
export async function buscarTransaccion(id: number): Promise<void> {
    try {
        const transaccion = await prisma.activos.findUnique({
            where: { id },
            include: { activo: true, fecha_asignacion : true }
        });
        if (transaccion) {
            console.log("Transacción encontrada:", transaccion);
        } else {
            console.log("No se encontró ninguna transacción con el ID:", id);
        }
    } catch (error) {
        console.error("Error al buscar transacción:", error);
    } finally {
        await prisma.$disconnect();
    }
}