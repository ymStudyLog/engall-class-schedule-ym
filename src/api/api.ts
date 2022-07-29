import axios,{ AxiosInstance, AxiosResponse} from "axios";
import { ScheduleType } from "../types/ScheduleType";

const DEFAULT_URL = "http://localhost:8000/classes";

export const scheduleService : AxiosInstance = axios.create({baseURL: `${DEFAULT_URL}`});

export const deleteSchedule = async (id:number) => {
    const response = await scheduleService.delete(`/${id}`);
    return response.status; //200이어야 정상적으로 삭제됨
}

export const postSchedule = async <T>(schedule : ScheduleType) : Promise<T> => {
    const response : AxiosResponse<T> = await scheduleService.post("",schedule);
    return response.data;
}