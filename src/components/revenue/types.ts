export interface RevenueEntry {
  id: string;
  User?: {
		email: string;
	}
	email?: string;
  feePercentage: number;
  notifiedAt?: string;
}

export interface AddPersonFormData {
  email: string;
  walletAddress: string;
  feePercentage: number;
}