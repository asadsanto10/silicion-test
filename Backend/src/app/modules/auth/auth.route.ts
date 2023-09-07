import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest/validateRequest';

import { createUser } from '../user/user.controller';
import { userValidation } from '../user/user.validation';
import { loginUser } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post('/signup', validateRequest(userValidation.createUserZodSchema), createUser);
router.post('/login', validateRequest(authValidation.loginUserZodSchema), loginUser);

export const authRoutes = router;
