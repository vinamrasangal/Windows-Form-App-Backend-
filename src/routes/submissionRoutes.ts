
import { Router } from 'express';
import { ping, submit, read, readAll } from '../controllers/submissionController';

const router = Router();

router.get('/ping', ping);
router.post('/submit', submit);
router.get('/read/:id', read); 
router.get('/readAll', readAll); 

export default router;
