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

interface OneProductInBasket {
    id: string;
    count: number;
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