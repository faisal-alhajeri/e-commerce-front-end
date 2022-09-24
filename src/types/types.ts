export type elementType = {
  className?: string;
  [key: string]: any;
};

export enum messegesTypes {
  ERROR = "danger",
  SUCCESS = "success",
}

export type flashMessegeType = {
  id: string;
  messege: string;
  type: messegesTypes;
};

export type userType =
  | {
      id?: string;
      name?: string;
      email?: string;
    }
  | undefined;

export type anyObject = {
  [key: string]: any;
};

export enum inputValidationTypes {
  VALID = "valid",
  NOT_VALID = "not_valid",
  NEUTRAL = "NEUTRAL",
}

export type tokenstype = {
  access: string;
  refresh: string;
};

export type productType = {
  uuid: string;
  description: string;
  name: string;
  price: number;
  images: string[];
};

export type cartItemType = {
  uuid: string;
  product: productType;
  quantity: number;
  total: number;
};

export type cartType = {
  uuid: string;
  total: number;
  items: cartItemType[];
};

export type orderItemType = {
    uuid: string;
    product: productType;
    quantity: number;
    total: number;
  };

export type orderType = {
  uuid: string;
  items: orderItemType[];
  total: number
};

