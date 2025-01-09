export interface PromoCode {
  id: string;
  code: string;
  discountPercentage: number;
  maxUses: number;
  usedCount: number;
  expiresAt: Date;
}

export interface Discount {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  startDate: Date;
  endDate: Date;
}

export interface Ticket {
  id: string;
  name: string;
  price: number;
}