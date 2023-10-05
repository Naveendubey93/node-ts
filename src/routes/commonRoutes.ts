import { Router } from 'express';
import usersRouter from './susers';
import postsRoute from './posts';
import uRouter from './users.routes';
// import productsRouter from './productsRoute';

const cmnRouter = Router();
cmnRouter.use('/susers', usersRouter);
cmnRouter.use('/api', postsRoute);
cmnRouter.use('/users', uRouter);

// router.use('/api', productsRouter);

export default cmnRouter;
