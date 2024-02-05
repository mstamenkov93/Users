import axios from "axios";
import { BASE_URL } from "./endpoints";
import { User } from "../interfaces";

export const fetchAllUsers = async () => {
    const response = await axios.get(BASE_URL);
    return response.data.reverse();
};

export const addUser = async (formData: { name: string, email: string, phone: string }) => {
    const response = await axios.post<User>(BASE_URL, formData);
    return response.data;
};

export const removeUser = async (id: number) => {
    const response = await axios.delete<User>(`${BASE_URL}/${id}`);
    return response.data;
};
