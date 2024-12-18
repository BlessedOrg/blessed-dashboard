declare global {
  interface TransactionData {
    method?: string;
    timestamp: number;
    ethCost: string;
    usdCost: string | number;
  }

  interface TransactionGroup {
    ethCost: string;
    usdCost: number;
    data: TransactionData[];
  }

  interface TransactionCount {
    "all": number,
    "eventsTransactions": number,
    "ticketsTransactions": number,
    "ticketsDeploy": number,
    "eventsDeploy": number
  }

  interface CostByOperator {
    ethCost: string;
    usdCost: number;
    label: string;
  }

  interface AnalyticsData {
    eventsTransactions: TransactionGroup;
    ticketsTransactions: TransactionGroup;
    ticketsDeploy: TransactionGroup;
    eventsDeploy: TransactionGroup;
    costsByOperatorType: {
      [key: string]: CostByOperator;
    };
    "count": TransactionCount;
  }
}

export {};