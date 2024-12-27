import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { docsUrl } from "@/variables/variables";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { usePathname } from "next/navigation";

export const DashboardSidebar = () => {
  const pathname = usePathname();

  const contentPerPage = {
    "apps": {
      title: "Step-by-Step instructions",
      sections: [
        {
          title: "Building steps",
          items: [
            {
              step: 1,
              title: "Create",
              description: "Create application under which u will able to create many events."
            },
            {
              step: 2,
              title: "Customize",
              description: "Fine tune to your liking easily as a piece of cake"
            },
            {
              step: 3,
              title: "Publish",
              description: "Publish and go live ASAP"
            }
          ]
        }
      ]
    }
  };
  return (
    <div className="xl:sticky xl:top-[6.25rem] xl:h-[calc(100vh-6.25rem)] xl:min-w-[20.5rem] flex flex-col gap-4 max-w-[20.5rem]">

      <Collapsible className="w-full bg-gradient-to-r from-yellow-500 to-green-500 w-full rounded-3xl">
        <CollapsibleTrigger className="w-full">
          <div className="w-full flex justify-between gap-2 items-center px-6 py-4">
            <div className="flex items-center gap-2">
              <Image src={"/img/icons/video.svg"} alt="video icon" width={40} height={40} />
              <span className="font-semibold">Start guide</span>
            </div>
            <ChevronDown size={32} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col gap-4 px-4 py-4">
            Follow these quick steps to set up your first ticket.
            <div className="flex flex-col gap-2">
              <p className="font-medium text-lg">
                {contentPerPage.apps.title}
              </p>
              {contentPerPage.apps.sections.map(section => {

                return <section key={section.title}>
                  <p className="font-semibold mt-2">{section.title}</p>
                  {section.items.map(item => {
                    return <div key={item.title} className="flex flex-col my-2">
                      <p className="font-medium">{item?.step} {item.title}</p>
                      <p>{item.description}</p>
                    </div>;
                  })}
                </section>;
              })}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <div className="bg-yellow-500 p-6 rounded-3xl flex flex-col gap-4">
        <p className="font-semibold text-xl">Tip of the day</p>
        <div>
          <p className="font-semibold">Say goodbye to the chaotic virtual queue! </p>
          <span>Use our waiting room feature to manage high-demand events smoothly. Activate it in your ticket settings!</span>
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