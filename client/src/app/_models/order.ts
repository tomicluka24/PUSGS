export interface Order {
    id: number;
    consumerId: number;
    delivererId: number;
    productId: number;
    productName: string;
    quantity: number;
    deliveryAddress: string;
    comment: string;
    price: number;
    accepted: string;
    delivered: string;
  }

