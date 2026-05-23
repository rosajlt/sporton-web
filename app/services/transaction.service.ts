
import { fetchAPI, getAuthHeaders } from "@/app/lib/api";
import { Transaction } from "@/app/types";

export const transactionCheckout = async (formData: FormData): Promise<Transaction> => {
    return await fetchAPI<Transaction>("/transactions/checkout", {
        method: "POST",
        body: formData
    });
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
    return await fetchAPI<Transaction>(`/transactions/${id}`);
};

export const updateTransactionStatus = async (id: string, status: string): Promise<Transaction> => {
    return await fetchAPI<Transaction>(`/transactions/${id}`, {
                method: "PUT",
        headers: {
            ...getAuthHeaders()
        },
        body: JSON.stringify({ status })
    });
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
    return await fetchAPI<Transaction[]>("/transactions", {
        headers: {
            ...getAuthHeaders()
        }
    });
};


export const updateTransaction = async (id: string, data: FormData): Promise<Transaction> => {
    return await fetchAPI<Transaction>(`/transactions/${id}`, {
        method: "PUT",
        headers: {
            ...getAuthHeaders()
        },
        body: data
    });
};
