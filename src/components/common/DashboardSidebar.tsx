import { docsUrl } from "@/variables/variables";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface IContent {
	title: string;
	sections: {
		title: string;
		items: {
			step: number;
			title: string;
			description: string;
		}[];
	}[];
	footer?: string;
}

export const DashboardSidebar = ({appSlug, eventSlug}: {appSlug?: string, eventSlug?: string}) => {
  const pathname = usePathname();
	const params = useSearchParams();
	
	const commonContent = {
		"event-preview-and-create": {
			title: "Add Date, Location, and Venue",
			sections: [
				{
					title: "Provide the essential details for your attendees:",
					items: [
						{
							step: 1,
							title: "Date",
							description: "Specify when your event is happening."
						},
						{
							step: 2,
							title: "Location",
							description: "Add the exact address or online meeting link."
						},
						{
							step: 3,
							title: "Venue Information",
							description: "Include any details about the venue, such as access points or special features."
						},
						{
							step: 4,
							title: "Revenue Distribution",
							description: "Add any stakeholder that gets their percentage of the revenue based on the PoS."
						}
					]
				}
			],
			footer: "These details are key for your attendees, showing them exactly where and when to join your event!"
		}
	}
  const contentPerPage = {
    [`/`]: {
      title: "Create Your App",
      sections: [
        {
          title: "Start building your app with the essential setup",
          items: [
            {
              step: 1,
              title: "App Name",
              description: "Give your app a catchy name that represents your brand."
            },
            {
              step: 2,
              title: "Description",
              description: "Briefly explain what your app does and its purpose."
            },
            {
              step: 3,
              title: "Customize",
              description: "Start then customizing your event & tickets"
            },
            {
              step: 4,
              title: "Integrate",
              description: "Add ticket sales to your app connects to your website or other platforms."
            }
          ]
        }
      ],
			footer: "Make your app ready to shine and seamlessly integrate it into your ecosystem via our API!"
    },
		[`/${appSlug}`]: {
      title: "Create Your Event",
      sections: [
        {
          title: "Set up your event with all the essential details:",
          items: [
            {
              step: 1,
              title: "Title",
              description: "Name your event to grab attention."
            },
            {
              step: 2,
              title: "Description",
              description: "Highlight what makes it unique."
            },
            {
              step: 3,
              title: "View",
              description: "Customize how attendees see it."
            },
            {
              step: 4,
              title: "Location and Date",
              description: "Specify where and when it happens."
            }
          ],
        },
      ],
			footer: "Ensure these details shine to make your event stand out!"
    },
		[`/${appSlug}/create-event`]: commonContent["event-preview-and-create"],
		[`/${appSlug}/${eventSlug}`]: commonContent["event-preview-and-create"],
		[`/${appSlug}/${eventSlug}/tickets`]: {
			title: "Tickets",
			sections: [
				{
					title: "Create and manage your event tickets:",
					items: [
						{
							step: 1,
							title: "Ticket Name",
							description: "Give your ticket a catchy name that represents your brand."
						},
						{
							step: 2,
							title: "Ticket Price",
							description: "Set the price for your ticket."
						},
						{
							step: 3,
							title: "Ticket Capacity",
							description: "Set the maximum number of tickets that can be sold."
						},
						{
							step: 4,
							title: "Ticket Availability",
							description: "Set the availability of the ticket."
						}
					]
				}
			]
		},
		[`/${appSlug}/${eventSlug}/edit`]: commonContent["event-preview-and-create"],
  } as Record<string, IContent>;


	const currentContent = contentPerPage[pathname] ?? contentPerPage["/"];

  return (
    <div className="xl:sticky xl:top-[6.25rem] xl:h-[calc(100vh-6.25rem)] xl:min-w-[20.5rem] flex flex-col gap-4 max-w-[20.5rem]">

      <Collapsible className="w-full bg-gradient-to-r from-yellow-500 to-green-500 w-full rounded-3xl" disabled>
        <CollapsibleTrigger className="w-full">
          <div className="w-full flex justify-between gap-2 items-center px-6 py-4">
            <div className="flex items-center gap-2">
              <Image src={"/img/icons/video.svg"} alt="video icon" width={40} height={40} />
              <span className="font-semibold">Start guide</span>
            </div>
            {/* <ChevronDown size={32} /> */}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
        </CollapsibleContent>
      </Collapsible>
      <div className="bg-yellow-500 p-6 rounded-3xl flex flex-col gap-4">
        <p className="font-semibold text-xl">Tip of the day</p>
				<div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-lg">
                {currentContent.title}
              </p>
              {currentContent.sections.map(section => {
                return <section key={section.title}>
                  <p className="font-semibold mt-2">{section.title}</p>
                  {section.items.map(item => {
                    return <div key={item.title} className="flex flex-col my-2">
                      <p className="font-medium">{!!item?.step ? `${item.step}. ` : ""} {item.title}</p>
                      <p>{item.description}</p>
                    </div>;
                  })}
										{currentContent?.footer && <p className="mt-2 italic">{currentContent.footer}</p>}
                </section>;
              })}
            </div>
          </div>
      </div>
      <div className="bg-yellow-500 w-full rounded-3xl flex justify-between gap-2 items-center p-6">
        <span className="font-semibold">
          Need more details?{" "}
          <Link href={docsUrl} className="underline font-normal">
            Visit our Docs
          </Link>
        </span>
      </div>
    </div>
  );
};