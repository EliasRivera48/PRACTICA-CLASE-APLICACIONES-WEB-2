import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Obtener todos los pedidos
export const getAllPedidos = async (req: Request, res: Response) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      where: {
        estado: {
          not: 'eliminado',
        },
      },
    });
    res.status(200).json(pedidos);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
  }
};

// Obtener un pedido por su ID
export const getPedidoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pedido = await prisma.pedido.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!pedido || pedido.estado === 'eliminado') {
      return res.status(404).json({ message: 'Control no encontrado' });
    }
    res.status(200).json(pedido);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el pedido', error: error.message });
  }
};

// Crear un nuevo pedido
export const createPedido = async (req: Request, res: Response) => {
  const {fecha,total  } = req.body;
  try {
    const nuevoPedido = await prisma.pedido.create({
      data: {
       fecha,
       total,
      },
    });
    res.status(201).json(nuevoPedido);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el pedido', error: error.message });
  }
};

// Actualizar un pedido existente
export const updatePedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fecha,total } = req.body;
  try {
    const pedidoActualizado = await prisma.pedido.update({
      where: {
        id: Number(id),
      },
      data: {
        fecha,
        total,
      },
    });
    res.status(200).json(pedidoActualizado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el pedido', error: error.message });
  }
};

// Eliminar un pedido
export const deletePedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pedidoEliminado = await prisma.pedido.update({
      where: { id: Number(id) },
      data: { estado: 'eliminado' },
    });
    res.status(200).json(pedidoEliminado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el pedido', error: error.message });
  }
};