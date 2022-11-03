/* eslint-disable linebreak-style */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { number } from 'joi';
import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';

export interface StudentCreateModel {
    id?: string;
    firstName: string;
    lastName: string;
    branchName: string;
}

export interface StudentUpdateModel {
    firstName?: string;
    lastName?: string;
    branchName?: string;
}

export interface ClientUpdateModel {
    ClientName?: string;
    ClientCode?: string;
    Phone?: string;
    Email?: string;
}

export interface ClientDto {
    id: uuid;
    ClientName: string;
    ClientCode: string;
    Phone: string;
    Email: string;
}

export interface ClientSearchFilters extends BaseSearchFilters {
    ClientName?: string;
    ClientCode?: string;
}

export interface ClientSearchResults extends BaseSearchResults {
    Items: ClientDto[];
}
