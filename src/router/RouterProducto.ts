import express from 'express';
import {getAllProducto, getProductoById, createProducto, updateProducto, deleteProducto} from '../controllers';

const router = express.Router();

router.get('/', getAllProducto);
router.get('/:id', getProductoById);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id',deleteProducto);

export default router;
