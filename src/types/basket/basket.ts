export type AddProductToBasketRes = {
    isSuccess: true;
    id: string;
    optionId?: string
} | {
    isSuccess: false;
}

export interface RemoveProductFromBasketRes {
    isSuccess: boolean;
}

export type ClearBasketRes = RemoveProductFromBasketRes;

export interface OneProductInBasket {
    id: string,
    count: number,
    productItem: {
        id: string;
        name: string;
        price: number;
        isSpecial: boolean;
    };
    option?: {
        name: string;
        price: number;
    };
}

export type ProductsFromBasketRes = OneProductInBasket[];

export type GetTotalBasketPriceRes = number | {
    isSuccess: false,
    alternativeBasket: OneProductInBasket[],
};

export interface GetBasketStatsRes  {
    itemInBasketAvgPrice: number;
    basketAvgTotalPrice: number;
}