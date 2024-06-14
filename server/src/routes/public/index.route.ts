import express from 'express';
const router = express.Router();

import User from './user.route';
User(router);

export default router;
