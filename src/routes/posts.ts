import { Router, Request, Response } from 'express';

class PostsRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/posts', this.getPosts);
    this.router.post('/posts', this.createPost);
  }

  private getPosts(req: Request, res: Response): void {
    // Handle GET /posts request
    res.json({ message: 'Get posts route' });
  }

  private createPost(req: Request, res: Response): void {
    // Handle POST /posts request
    res.json({ message: 'Create post route' });
  }
}

export default new PostsRoute().router;
