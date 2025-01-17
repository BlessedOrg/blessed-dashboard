declare global {
	interface Discount {
		name: string;
		description: string;
		percentage: number;
		minOrderValue?: number;
		prefix?: string;
		logoUrl: string;
		locationLatitude?: string;
		locationLongitude?: string;
		locationUrl?: string;
		validFrom: Date;
		validTo: Date;
		discountCode?: string;
		reusable: boolean;
	}
}

export { };
