import { Router } from 'express';
import RouterPedido from './RouterPedido';
import RouterProducto from './RouterProducto';
import RouterUsuario from './RouterUsuario';
import Routermaestro from './Routermaestro';

const router = Router();

router.use('/pedidos', RouterPedido);
router.use('/usuarios', RouterUsuario);
router.use('/productos', RouterProducto);
router.use('/maestro', Routermaestro);

export default router;