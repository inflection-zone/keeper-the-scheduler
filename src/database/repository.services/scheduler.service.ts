import {
    ErrorHandler
} from '../../common/error.handler';
// import {
//     SchedulerCreateModel
// } from "../../domain.types/scheduler.domain.type";
import { PrismaClient, Prisma } from '@prisma/client';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import obj from 'uuid-apikey';
// eslint-disable-next-line @typescript-eslint/no-var-requires
var parser = require('cron-parser');
//import parser from 'cron-parser';
///////////////////////////////////////////////////////////////////////////////////////////////

export class ScheduleService {

    //#region Models

   prisma = new PrismaClient();
   
   //#endregion

   //#region Publics

   // create = async (createModel: Prisma.ScheduleCreateInput) => {
   //     try {
   //         var record = await this.prisma.schedule.create({
   //             data : createModel
   //         });
   //         return await this.prisma.schedule.findUnique({
   //             where : {
   //                 id : record.id
   //             }
   //         });
   //     } catch (error) {
   //         ErrorHandler.throwDbAccessError('DB Error: Unable to create schdule!', error);
   //     }
   // }

    getById = async (id) => {
        try {
            const record = await this.prisma.schedule.findUnique({
                where : {
                    id : id
                },
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve schedule!', error);
        }
    }

    // exists = async (id): Promise < boolean > => {
    //     try {
    //         const record = await this.Client.findByPk(id);
    //         return record !== null;
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to determine existance of client!', error);
    //     }
    // }

    // search = async (filters: ClientSearchFilters): Promise < ClientSearchResults > => {
    //     try {

    //         var search = this.getSearchModel(filters);
    //         var {
    //             order,
    //             orderByColumn
    //         } = this.addSortingToSearch(search, filters);
    //         var {
    //             pageIndex,
    //             limit
    //         } = this.addPaginationToSearch(search, filters);

    //         const foundResults = await this.Client.findAndCountAll(search);
    //         const searchResults: ClientSearchResults = {
    //             TotalCount     : foundResults.count,
    //             RetrievedCount : foundResults.rows.length,
    //             PageIndex      : pageIndex,
    //             ItemsPerPage   : limit,
    //             Order          : order === 'DESC' ? 'descending' : 'ascending',
    //             OrderedBy      : orderByColumn,
    //             Items          : foundResults.rows,
    //         };

    //         return searchResults;

    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to search client records!', error);
    //     }
    // }

    update = async (id:uuid, updateModel) => {
        try {
            if (Object.keys(updateModel).length > 0) {
                var res = await this.prisma.schedule.update({
                    data  : updateModel,
                    where : {
                        id : id,
                    }
                });
                if (res == null) {
                    throw new Error('Unable to update schedule!');
                }
            }
            return await this.getById(id);
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to update schedule!', error);
        }
    }

    delete = async (id:uuid) => {
        try {
            var result = await this.prisma.schedule.delete({
                where : {
                    id : id
                }
            });
            return result;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to delete schedule!', error);
        }
    }

    // //#endregion

    // //#region Privates

    // private getSearchModel = (filters) => {

    //     var search = {
    //         where   : {},
    //         include : []
    //     };

    //     if (filters.ClientName) {
    //         search.where['ClientName'] = {
    //             [Op.like] : '%' + filters.ClientName + '%'
    //         };
    //     }
    //     if (filters.ClientCode) {
    //         search.where['ClientCode'] = filters.ClientCode;
    //     }

    //     return search;
    // }

    // private addSortingToSearch = (search, filters) => {

    //     let orderByColumn = 'CreatedAt';
    //     if (filters.OrderBy) {
    //         orderByColumn = filters.OrderBy;
    //     }
    //     let order = 'ASC';
    //     if (filters.Order === 'descending') {
    //         order = 'DESC';
    //     }
    //     search['order'] = [
    //         [orderByColumn, order]
    //     ];

    //     if (filters.OrderBy) {
    //         //In case the 'order-by attribute' is on associated model
    //         //search['order'] = [[ '<AssociatedModel>', filters.OrderBy, order]];
    //     }
    //     return {
    //         order,
    //         orderByColumn
    //     };
    // }

    // private addPaginationToSearch = (search, filters) => {

    //     let limit = 25;
    //     if (filters.ItemsPerPage) {
    //         limit = filters.ItemsPerPage;
    //     }
    //     let offset = 0;
    //     let pageIndex = 0;
    //     if (filters.PageIndex) {
    //         pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
    //         offset = pageIndex * limit;
    //     }
    //     search['limit'] = limit;
    //     search['offset'] = offset;

    //     return {
    //         pageIndex,
    //         limit
    //     };
    // }

    // //#endregion

    create = async (createModel: Prisma.ScheduleCreateInput) => {
        try {
            var record = await this.prisma.schedule.create({
                data : createModel
            });
            const schedule = await this.prisma.schedule.findUnique({
                where : {
                    id : record.id
                }
            });
            await this.createTask(schedule);
            return schedule;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create schdule!', error);
        }
    };

    // createTask = async (schedule)=>{
    //     const currentDate = new Date();
    //     const scheduleDate = schedule.StartDate;
    //     var firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    //     var lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    //     var findEndDate = schedule.EndDate > lastDayOfCurrentMonth ? lastDayOfCurrentMonth : schedule.EndDate;
    //     var options = {
    //         currentDate : scheduleDate,
    //         endDate     : findEndDate,
    //         iterator    : true,
    //         tz          : 'system'
    //     };
    //     if (scheduleDate >= firstDayOfCurrentMonth && scheduleDate <= lastDayOfCurrentMonth){
    //         try {
    //             var interval = parser.parseExpression(schedule.CronRegEx, options);
          
    //             // eslint-disable-next-line no-constant-condition
    //             var nextDate = null;
    //             do {
    //                 try {
    //                     nextDate = interval.next();
    //                     const scheduleTask =  await this.prisma.scheduleTask.create({
    //                         data : {
    //                             TriggerTime : nextDate.value.toString(), //worked
    //                             HookUri     : schedule.HookUri,
    //                             Retries     : 5,
    //                             Status      : 'PENDING',
    //                             Schedule    : {
    //                                 connect : {
    //                                     id : schedule.id
    //                                 }
    //                             }
    //                         }
    //                     });
    //                 } catch (error) {
    //                     ErrorHandler.throwDbAccessError(' DB Error: Unable to create schdule!', error);
    //                 }
    //             } while (nextDate.done !== true);
            
    //         } catch (error) {
    //             ErrorHandler.throwDbAccessError('DB Error: Unable to create schdule!', error);
    //         }
    //     }
    // }

createTask = async (schedule)=>{
    const currentDate = new Date();
    const scheduleDate = schedule.StartDate;
    var firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    var lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    lastDayOfCurrentMonth.setHours(23);
    lastDayOfCurrentMonth.setMinutes(59);
    lastDayOfCurrentMonth.setSeconds(59);
    
    var findEndDate = schedule.EndDate > lastDayOfCurrentMonth ? lastDayOfCurrentMonth : schedule.EndDate;
    var options = {
        currentDate : scheduleDate,
        endDate     : findEndDate,
        iterator    : true,
        tz          : 'UTC'
    };
    if (scheduleDate >= firstDayOfCurrentMonth && scheduleDate <= lastDayOfCurrentMonth){
        try {
            var interval = parser.parseExpression(schedule.CronRegEx, options);
            var nextDate = null;
            do {
                try {
                    nextDate = interval.next();
                    const date = new Date(nextDate.value.toString());
                    const triggerDateTime = new Date(date.toUTCString());
                    // const scheduleTask =  await this.prisma.scheduleTask.create({
                    await this.prisma.scheduleTask.create({
                        data : {
                            TriggerTime : triggerDateTime,
                            HookUri     : schedule.HookUri,
                            Retries     : 5,
                            Status      : 'PENDING',
                            Schedule    : {
                                connect : {
                                    id : schedule.id
                                }
                            }
                        }
                    });
                } catch (error) {
                    ErrorHandler.throwDbAccessError(' DB Error: Unable to create schdule!', error);
                }
            } while (nextDate.done !== true);
            
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create schdule!', error);
        }
    }
}

}

