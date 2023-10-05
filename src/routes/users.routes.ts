import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const uRouter = Router();
const userController = new UserController();

uRouter.get('/', userController.getAllUsers.bind(userController));
uRouter.post('/', userController.createUser.bind(userController));
uRouter.get('/:id', userController.getUserById.bind(userController));
uRouter.put('/:id', userController.updateUser.bind(userController));
uRouter.delete('/:id', userController.deleteUser.bind(userController));

export default uRouter;


// difference between  const userController = new UserController();
// uRouter.get('/', userController.getAllUsers.bind(userController));
// and 
// uRouter.get('/', userController.getAllUsers);