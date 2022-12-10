import { PrismaClientInit } from '../../startup/prisma.client.init';
export class MonthlyTaskService{

    prisma = PrismaClientInit.instance().prisma();

    public static instance: MonthlyTaskService=null;

    private constructor(){
        
    }

    public static getInstance(): MonthlyTaskService{
        return this.instance || (this.instance = new this());
    }

    //create = async (
        
}
