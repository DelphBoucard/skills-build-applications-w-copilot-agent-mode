import { NextFunction, Request, Response, Router } from 'express';
import { Model } from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

function createCollectionRouter(model: Model<any>) {
  const router = Router();

  router.get('/', async (_request: Request, response: Response, next: NextFunction) => {
    try {
      response.json({ items: await model.find().lean() });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

export const usersRouter = createCollectionRouter(User);
export const teamsRouter = createCollectionRouter(Team);
export const activitiesRouter = createCollectionRouter(Activity);
export const leaderboardRouter = createCollectionRouter(Leaderboard);
export const workoutsRouter = createCollectionRouter(Workout);