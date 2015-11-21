import express from 'express';

import stock from './stock';


let router = express.Router();

router.get('/stock/:symbol', stock);

export default router;