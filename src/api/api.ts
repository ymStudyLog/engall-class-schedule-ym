import axios,{ AxiosInstance, AxiosResponse} from "axios";
import { ClassType } from "../types/ClassType";

const DEFAULT_URL = "http://localhost:8000/classes";

const classService : AxiosInstance = axios.create({baseURL: `${DEFAULT_URL}`});

export const getScheduleByDate = async <T>(dateUrl : string = "") : Promise<T>=> {
    const response : AxiosResponse<T> = await classService.get(`?date=${dateUrl}`);
    return response.data;
}

export const deleteSchedule= async (id:number) => {
    await classService.delete(`/${id}`);
}

export const postSchedule = async <T>(schedule : ClassType) : Promise<T> => {
    const response : AxiosResponse<T> = await classService.post("",schedule);
    return response.data;
}