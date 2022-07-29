import axios,{ AxiosInstance, AxiosResponse} from "axios";
import { ScheduleType } from "../types/ScheduleType";

const DEFAULT_URL = "http://localhost:8000/classes";

export const scheduleService : AxiosInstance = axios.create({baseURL: `${DEFAULT_URL}`});

export const deleteSchedule= async (id:number) => {
    await scheduleService.delete(`/${id}`);
}

export const postSchedule = async <T>(schedule : ScheduleType) : Promise<T> => {
    const response : AxiosResponse<T> = await scheduleService.post("",schedule);
    return response.data;
}