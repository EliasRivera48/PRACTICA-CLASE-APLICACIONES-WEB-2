import { Router} from 'express';
import {getAllTablas} from '../controllers/maestroControl'

const router = Router();

router.get('/', getAllTablas);


export default router;