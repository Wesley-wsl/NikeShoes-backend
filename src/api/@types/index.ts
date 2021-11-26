export interface IUser {
    first_name: String;
    last_name: String;
    email: String;
    password: String;
    cart?: Record<string, object>;
    admin?: boolean;
}

export interface IAuthenticateRequest {
    email: string;
    password: string;
}

export interface IProducts {
    id?: String;
    name: String;
    description: String;
    product_image: String;
    category: String;
    price: number;
}

export interface IId {
    id: string;
    userId?: any;
}

export interface ICategory {
    category?: string;
}
