export interface PromoCode {
  id: string;
  code: string;
  discountPercentage: number;
  maxUses: number;
  usedCount: number;
  expiresAt: Date;
}

export interface Discount {
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	logoUrl: string;
	category: string;
	discountType: 'percentage' | 'fixed';
	discountValue: number;
	minimumOrderValue: number;
	locationUrl: string;
	onlineUrl: string;
	singleCode: string;
	isSingleUse: boolean;
	reusable: boolean;
}

export interface Ticket {
  id: string;
  name: string;
  price: number;
}