import { Card } from "@/components/ui";
import { fetcherWithToken } from "@/requests/requests";
import useSWR from "swr";
import { apiUrl } from "@/variables/variables";
import { LoadingDashboardSkeleton } from "@/components/common/LoadingDashboardSkeleton";
import Image from "next/image";
import CreateTicketModal from "@/components/modals/CreateTicketModal";

export const TicketsTab = ({ appId, eventId }: { appId: string; eventId: string }) => {
  const { data: ticketsData, isLoading: ticketsLoading, mutate } = useSWR<ITicket[]>(
    `${apiUrl}/private/tickets/${appId}/${eventId}`,
    fetcherWithToken
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <Card className="flex gap-4 justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Manage your tickets</p>
          <p>Review, edit, organize your tickets with ease. Or create new ones.</p>
        </div>
        <CreateTicketModal appId={appId} eventId={eventId} mutateTickets={mutate} />
      </Card>

      <div className="gap-4 flex flex-col">
        {ticketsLoading && <LoadingDashboardSkeleton items={3} />}
        {ticketsData?.map((ticket) => {
          return (
            <Card key={ticket.id} className="flex gap-4 items-center">
              <Image src={"/img/placeholder_image.jpeg"} alt="" width={100} height={100} className="rounded-xl" />
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{ticket.name}</p>
                <p className="text-sm uppercase text-gray-500">created at: {new Date(ticket.createdAt).toLocaleDateString()}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
