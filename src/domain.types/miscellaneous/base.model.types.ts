export interface Student{
    id:        number;
    firstName:  string;
    lastName :  string;
    branchName: string;
}

export interface Faculty{
    id:number;
    firstName:  string;
    lastName :  string;
    branchName: string;
}

export interface Subject{
    id: number;
    subjectName:string;
    type: string;
    facultyId:number;
    academicId:number;
}

export interface Academic{
    id:number;
    class:  string;
    semester: string;
    studentId:number;
}

export interface Attendance{
    id:number;
    dateoflecture:string;
    time:string;
    status:string;
    studentId:number;
    subjectId:number;
}
