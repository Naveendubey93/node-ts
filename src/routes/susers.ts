import express, { Request, Response } from 'express';
import userService from '../services/userService';
import { User } from '../models/user.model';
import ApiController from '../controllers/apiController';

class UserRoutes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get('/', this.getAllUsers);
    this.router.get('/:id', this.getUserById);
    this.router.post('/', this.createUser);
    this.router.put('/:id', this.updateUser);
    this.router.delete('/:id', this.deleteUser);
  }

  private getAllUsers(_req: Request, res: Response): void {
    const users = userService.getAllUsers();
    ApiController.sendSuccessResponse(res, 200, users);
  }

  private getUserById(req: Request, res: Response): void {
    const id = req.params.id;
    const user = userService.getUserById(id);
    if (user) {
      ApiController.sendSuccessResponse(res, 200, user);
    } else {
      ApiController.sendErrorResponse(res, 404, 'User not found');
    }
  }

  private createUser(req: Request, res: Response): void {
    const user = req.body as User;
    const createdUser = userService.createUser(user);
    ApiController.sendSuccessResponse(res, 201, createdUser);
  }

  private updateUser(req: Request, res: Response): void {
    const id = req.params.id;
    const updatedUser = req.body as User;
    const user = userService.updateUser(id, updatedUser);
    if (user) {
      ApiController.sendSuccessResponse(res, 200, user);
    } else {
      ApiController.sendErrorResponse(res, 404, 'User not found');
    }
  }

  private deleteUser(req: Request, res: Response): void {
    const id = req.params.id;
    const deleted = userService.deleteUser(id);
    if (deleted) {
      ApiController.sendSuccessResponse(res, 200, deleted );
    } else {
      ApiController.sendErrorResponse(res, 404, 'User not found');
    }
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
