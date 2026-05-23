import { Bank } from "../types";
import { fetchAPI, getAuthHeaders } from "../lib/api";

export const getAllBank = async (): Promise<Bank[]> => {
    return await fetchAPI<Bank[]>("/banks");
};

export const createBank = async (data: Partial<Bank>): Promise<Bank> => {
    return await fetchAPI<Bank>("/banks", {
    });
}

export const updateBank = async (id: string, data: Partial<Bank>): Promise<Bank> => { 
    return await fetchAPI<Bank>(`/banks/${id}`, {
        method: "PUT",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

export const deleteBank = async (id: string): Promise<void> => {
 return await fetchAPI<void>(`/banks/${id}`, {
        method: "DELETE",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
        }
    });
}