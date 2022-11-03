import { number } from 'joi';
import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
import { uuid } from './miscellaneous/system.types';

export interface FacultyInfoCreateModel {
    firstName: string;
    lastName: string;
    department: string;
}

export interface FacultyUpdateModel {
    firstName?: string;
    lastName?: string;
    department?: string;
}

