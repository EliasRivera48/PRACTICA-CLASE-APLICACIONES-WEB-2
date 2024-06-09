import express from 'express';
import {getAllPedidos, getPedidoById, createPedido, updatePedido, deletePedido} from '../controllers'

const router = express.Router();

router.get('/', getAllPedidos);
router.get('/:id', getPedidoById);
router.post('/', createPedido);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

export default router;