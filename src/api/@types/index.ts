export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    cart?: Record<string, object>;
    admin?: boolean;
}

export interface IAuthenticateRequest {
    email: string;
    password: string;
}

export interface IProducts {
    id?: string;
    name: string;
    description: string;
    product_image: string;
    category: string;
    price: number;
    video_url: string;
}

export interface IId {
    id: string;
    userId?: string;
}

export interface ICategory {
    category?: string;
}
