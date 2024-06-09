import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      where: {
        estado: {
          not: 'eliminado',
        },
      },
    });
    res.status(200).json(usuarios);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!usuario || usuario.estado === 'eliminado') {
      return res.status(404).json({ message: 'usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
};

export const createUsuario = async (req: Request, res: Response) => {
  const { nombre, correo} = req.body;
  try {
    const nuevoUsuario = await prisma.usuario.create({
      data: {
       nombre,
       correo,
      },
    });
    res.status(201).json(nuevoUsuario);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  try {
    const updatedUsuario = await prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data: {
       nombre,
       correo,
      },
    });
    res.status(200).json(updatedUsuario);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedUsuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { estado: 'eliminado' },
    });
    res.status(200).json(deletedUsuario);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};