import {
    ErrorHandler
} from '../../common/error.handler';
// import {
//     SchedulerCreateModel
// } from "../../domain.types/scheduler.domain.type";
import { PrismaClient, Prisma } from '@prisma/client';
///////////////////////////////////////////////////////////////////////////////////////////////

export class SchedulerService {

    //#region Models

   prisma = new PrismaClient();
   
   //#endregion

   //#region Publics

    create = async (createModel: Prisma.SchedulerCreateInput) => {
        try {
            var record = await this.prisma.scheduler.create({
                data : createModel
            });
            return await this.prisma.scheduler.findUnique({
                where : {
                    id : record.id
                }
            });
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to create schduler!', error);
        }
    }

    getById = async (id) => {
        try {
            const record = await this.prisma.scheduler.findUnique({
                where : {
                    id : id
                },
            });
            return record;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to retrieve scheduler!', error);
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

    // update = async (id, updateModel) => {
    //     try {
    //         if (Object.keys(updateModel).length > 0) {
    //             var res = await this.Client.update(updateModel, {
    //                 where : {
    //                     id : id
    //                 }
    //             });
    //             if (res.length !== 1) {
    //                 throw new Error('Unable to update client!');
    //             }
    //         }
    //         return await this.getById(id);
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to update client!', error);
    //     }
    // }

    // delete = async (id) => {
    //     try {
    //         var result = await this.Client.destroy({
    //             where : {
    //                 id : id
    //             }
    //         });
    //         return result === 1;
    //     } catch (error) {
    //         ErrorHandler.throwDbAccessError('DB Error: Unable to delete client!', error);
    //     }
    // }

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

}
