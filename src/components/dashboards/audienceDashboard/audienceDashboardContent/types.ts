export type TicketRequirement = "attendees" | "holders";

export interface EligibleUser {
  id: string;
  email?: string;
  smartWalletAddress?: string;
  walletAddress: string;
  external: boolean;
}

export interface TicketWithRequirement extends ITicket {
  requirement?: TicketRequirement;
}

// Helper functions
export const formatLocation = (location: IEventLocation): string => {
  const parts = [location.city];
  if (location.country) parts.push(location.country);
  return parts.join(", ");
};

export const getTicketImage = (ticket: ITicket): string => {
  return ticket.metadataPayload?.metadataImageUrl || "/img/placeholder_image.jpeg";
};

export interface SelectedTicket {
  eventId: string;
  ticketId: string;
  requirement: TicketRequirement;
}