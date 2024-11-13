export {};
declare global {
  interface ICampaignDistribution {
    AudiencesUsers: IAudienceUser[];
    campaignId: string;
    createdAt: Date;
    id: string;
  }
  interface ICampaign {
    id: string;
    name: string;
    slug: string;
    Audiences: IAudience[];
    Tickets?: ITicket[];
    CampaignDistribution: ICampaignDistribution;
    appId: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }

  interface IAudience {
    id: string;
    name: string;
    slug: string;
    Campaigns: ICampaign[];
    AudienceUser: IAudienceUser[];
    appId: string;
    public: boolean;
    createdAt: Date;
    updatedAt: Date | null;
  }

  interface ITicket {
    id: string;
    name: string;
    slug: string;
    Entrance?: IEntrance;
    Event?: IEvent;
    createdAt: Date;
  }
  interface IEntrance {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
  }

  interface IEvent {
    id: string;
    name: string;
    slug: string;
    appId: string;
    logoUrl: string;
    Tickets: ITicket[];
    createdAt: Date;
  }

  interface ISelectedEvent {
    eventId: string;
    ticketId: string;
    eventSlug: string;
    ticketSlug: string;
    eventName: string;
    ticketName: string;
    createdAt: string;
    logoUrl: string;
    Tickets: ITicket[];
    Entrance: IEntrance;
  }

  interface IAudienceUser {
    id: string;
    Audiences: IAudience[];
    User?: {
      email: string;
      walletAddress: string;
      smartWalletAddress: string;
      id: string;
    };
    userId: string | null;
    externalWalletAddress?: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }
  interface IAppData {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string | null;
    developerId: string;
    createdAt: string;
    updatedAt: string;
  }
}
