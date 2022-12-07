import express from 'express';
import {
    ScheduleController
} from './schedule.controller';
import {
    Loader
} from '../../startup/loader';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {

    const router = express.Router();
    const authenticator = Loader.Authenticator;
    const controller = new ScheduleController();
    router.post('/cronobject',controller.createByUsingCronObject);
    router.post('/cronexpr',controller.createByUsingCronExpression);
    router.get('/:id', authenticator.authenticateUser, controller.getById);
    router.delete('/:id', authenticator.authenticateUser,controller.delete);
    router.put('/:id',authenticator.authenticateUser,controller.update);

    app.use('/api/v1/scheduler', router);
};
