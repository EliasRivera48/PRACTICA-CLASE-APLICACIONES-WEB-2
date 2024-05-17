import {prisma} from '../prisma/prisma';

// Función para insertar transacciones (Pronosticos)
export async function llenarTransacciones(): Promise<void> {
    try {
        //  insertar 10 elementos en la entidad transaccional (Pronosticos)
        const transacciones: any[] = [];
        for (let i = 0; i < 10; i++) {
            const pronostico = await prisma.activo.create({
                data: {
                    activo_tecnologicco: "Resultado " + i,
                    departamento: 2 * i,
                    persona_enacargada: {
                        connect: { id: 1 } // ID de la peersona encargada 
                    },
                    persona_encargada: {
                        connect: { id: 1 } // ID de la persona encargada
                    }
                }
            });
            transacciones.push(activo);
        }
        console.log("Transacciones insertadas correctamente:", transacciones);
    } catch (error) {
        console.error("Error al llenar transacciones:", error);
    } finally {
        await prisma.$disconnect();
    }
}