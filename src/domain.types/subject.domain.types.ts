export interface SubjectCreateModel {
    subjectName: string;
    type: string;
    facultyId: number;
    academicId: number;
    studentId: number;
}

export interface StudentOnSubjectCreateModel{
    studentId: number;
    subjectId: number;
}

export interface SubjectUpdateModel {
    subjectName?: string;
    type?: string;
    facultyId?: number;
    academicId?: number;
}
