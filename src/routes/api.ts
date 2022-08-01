import { Router } from 'express';
import { adminMw } from './middleware';
import userRouter from './user-router';
import authRouter from './auth-router';
import urlRouter from './url-router';

// Init
const apiRouter = Router();

// Add api routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', adminMw, userRouter);

apiRouter.use('/url', urlRouter)

// Export default
export default apiRouter;
