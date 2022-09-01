import axios, { AxiosInstance } from "axios";
import { ScheduleType } from "../types/scheduleType";

const BASE_URL = "http://localhost:8000/classes";

export const scheduleService: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
});

export const getSchedule = async <T>(query: string = ""): Promise<T> => {
  const response = await scheduleService.get<T>(query);
  return response.data;
};

export const deleteSchedule = async (id: number): Promise<void> => {
  await scheduleService.delete(`/${id}`);
};

export const postSchedule = async (schedule: ScheduleType): Promise<void> => {
  await scheduleService.post("", schedule);
};
