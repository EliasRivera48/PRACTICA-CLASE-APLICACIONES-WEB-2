import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Obtener todos los productos
export const getAllProducto = async (_req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany({
      where: {
        estado: {
          not: 'eliminado',
        },
      },
    });
    res.status(200).json(productos);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};

// Obtener un producto por su ID
export const getProductoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto = await prisma.producto.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!producto || producto.estado === 'eliminado') {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// Crear un nuevo producto
export const createProducto = async (req: Request, res: Response) => {
  const { nombre, descripcion, precio, categoria } = req.body;
  try {
    const nuevoProducto
     = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        precio,
        categoria,
      },
    });
    res.status(201).json(nuevoProducto);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// Actualizar un producto existente
export const updateProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion,precio,categoria } = req.body;
  try {
    const productoActualizado = await prisma.producto.update({
      where: {
        id: Number(id),
      },
      data: {
       
        nombre,
  descripcion,
  precio,
  categoria,
      },
    });
    res.status(200).json(productoActualizado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// Eliminar un producto
export const deleteProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoEliminado = await prisma.producto.update({
      where: { id: Number(id) },
      data: { estado: 'eliminado' },
    });
    res.status(200).json(productoEliminado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el paciente', error: error.message });
  }
};