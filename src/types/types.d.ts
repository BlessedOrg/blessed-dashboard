export { };
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
    isDraft: boolean;
    Audiences: IAudience[];
    Tickets?: ITicket[];
    Discounts?: {
      DiscountCodes: {
        campaignDistributionId: string | null;
        createdAt: string;
        discountId: string;
        id: string;
        reusable: boolean;
        updatedAt: string;
        used: boolean;
        value: string;
      }[];
      appId: string;
      campaignId: string;
      createdAt: string;
      description: string;
      eventId: string;
      id: string;
      isTemplate: boolean;
      isVoucher: boolean;
      locationLatitude: string | null;
      locationLongitude: string | null;
      locationUrl: string;
      logoUrl: string;
      minOrderValue: number;
      name: string;
      percentage: number;
      prefix: string | null;
      templateId: string;
      ticketId: string | null;
      uniqueDiscountCodes: boolean;
      updatedAt: string;
      validFrom: string;
      validTo: string;
    }[];
    CampaignDistribution: ICampaignDistribution;
    appId: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    type: "REWARD" | "TICKET";
  }

  interface IAudience {
    id: string;
    name: string;
    slug: string;
    Campaigns: ICampaign[];
    AudienceUsers: IAudienceUser[];
    appId: string;
    public: boolean;
    createdAt: Date;
    updatedAt: Date | null;
  }

  interface IEntrance {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
  }

  interface ITicket {
    id: string;
    name: string;
    slug: string;
    address: string;
    Entrance?: IEntrance;
    Event?: IEvent;
    createdAt: Date;
    eventId: string;
    metadataPayload?: {
      metadataImageUrl?: string;
      name: string;
      symbol: string;
      description: string;
    };
    ticketOwners: string[];
    price: number;
    ticketSupply: number;
    maxSupply: number;
  }

  interface IEvent {
    id: string;
    name: string;
    slug: string;
    appId: string;
    description: string;
    logoUrl: string;
    Tickets: ITicket[];
    startsAt: Date;
    endsAt: Date;
    EventLocation: IEventLocation;
    timezoneIdentifier: string;
    createdAt: Date;
    isPublic?: boolean;
  }

  interface IEventLocation {
    city: string;
    continent?: string;
    country?: string;
    cityLatitude?: string;
    cityLongitude?: string;
    countryFlag?: string;
    countryLatitude?: string;
    countryLongitude?: string;
    countryCode?: string;
    locationDetails?: string;
    postalCode?: string;
    stateCode?: string;
    street1stLine?: string;
    street2ndLine?: string;
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
    colors: { color1: string; color2: string };
    ApiTokens: any[];
  }

  interface IEventDetails {
    eventLocation: IEventLocation;
    name: string;
    description?: string;
    timezoneIdentifier: string;
    endsAt: Date;
    startsAt: Date;
    logoUrl?: string;
    EventBouncers?: IEventBouncer[];
  }
  interface IEventBouncer {
    id: string;
    User: {
      id: string;
      email: string;
    };
    eventId: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }
}
