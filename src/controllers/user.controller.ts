import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import ApiController from '../controllers/apiController';
import { UserService } from '../services/user.service';
import { HTTP_STATUS }  from '../constants/httpStatusCodes';

export class UserController {

  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      // const users = await UserModel.find();
      const users = await this.userService.getAllUsers();
      console.log(users);
      ApiController.sendSuccessResponse(res, HTTP_STATUS.OK, users);
      // res.status(200).json(users);
    } catch (error) {
      console.log(`error at line 13`);
      res.status(500).json({ error: 'Error retrieving users' });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    const {id=3, firstName, lastName, email, password } = req.body;
    try {
      console.log("createUser", {firstName: firstName, lastName: lastName, email:email, password:password});
      const newUser = await this.userService.createUser(id, firstName,lastName, email, password);

      // const user = await UserModel.create({ id:3,firstName,lastName, email, password });
      ApiController.sendSuccessResponse(res, HTTP_STATUS.CREATED, newUser);
      // res.status(201).json(user);
    } catch (error) {
      console.log(`error at user creation: ${error}`);
      ApiController.sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, 'Error creating user');
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id).exec();
      if (user) {
        res.status(HTTP_STATUS.OK).json(user);
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error retrieving user' });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      const user = await UserModel.findByIdAndUpdate(id, { name, email }, { new: true }).exec();
      if (user) {
        res.status(HTTP_STATUS.OK).json(user);
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const user = await UserModel.findByIdAndDelete(id).exec();
      if (user) {
        res.status(HTTP_STATUS.OK).json();
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(HTTP_STATUS.SERVER_ERROR).json({ error: 'Error deleting user' });
    }
  }
}
