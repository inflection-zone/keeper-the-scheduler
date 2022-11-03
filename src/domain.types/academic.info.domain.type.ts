export interface AcademicInfoCreateModel {
    class: string;
    semester: string;
    academicYear: string;
    studentId:number;
}

export interface AcademicUpdateModel {
    class?: string;
    semester?: string;
    academicYear?: string;
    studentId?:number;
}
