import { PrismaClientInit } from '../../startup/prisma.client.init';
import { ErrorHandler } from '../../common/error.handler';

export class ScheduleTaskService {

    prisma = PrismaClientInit.instance().prisma();

    createByUsingCronObject = async (createModel) => {
        try {
            await this.prisma.scheduleTask.create({
                data : {
                    TriggerTime : createModel.TriggerTime.toISOString(),
                    HookUri     : createModel.HookUri,
                    Retries     : createModel.Retries,
                    Status      : createModel.Status,
                    Schedule    : {
                        connect : {
                            id : createModel.ScheduleId,
                        },
                    },
                },
            });
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create schdule!', error);
        }
    }

}
