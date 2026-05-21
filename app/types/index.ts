export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
}

export interface Category {
    _id: string;
    name: string;
    imageUrl: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    stock: number;
    price: number;
}

export interface Bank {
    _id: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface Transaction {
    _id: string;
    paymentProof: string;
    status: "pending" | "paid" | "rejected",
    purchaseIdItems: {
        productId: string;
        qty: number;
    };
    totalPayment: string;
    customerName: string;
    customerContact: number;
    customerAddress: string;
    createdAt: string;
    updatedAt: string;
}