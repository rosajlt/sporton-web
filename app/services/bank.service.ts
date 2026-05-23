import { Bank } from "../types";
import { fetchAPI, getAuthHeaders } from "../lib/api";

export const getAllBank = async (): Promise<Bank[]> => {
    return await fetchAPI<Bank[]>("/banks");
};

export const createBank = async (data: FormData): Promise<Bank> => {
    return await fetchAPI<Bank>("/banks", {
        method: "POST",
        headers: {
            ...getAuthHeaders()
        },
    });
}