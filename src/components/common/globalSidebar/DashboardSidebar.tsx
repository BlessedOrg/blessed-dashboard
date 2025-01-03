import { docsUrl } from "@/variables/variables";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { contentPerPageItems, contentPerParams } from "./content";
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

export const DashboardSidebar = ({ appSlug, eventSlug }: { appSlug?: string; eventSlug?: string }) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const fullUrl = typeof window !== "undefined" ? `${pathname}${params.toString() ? `?${params.toString()}` : ""}` : "";

  const pathsWithFullUrl = contentPerParams(appSlug, eventSlug);
  const contentPerPage = contentPerPageItems(appSlug, eventSlug);

  const fullUrlContent = pathsWithFullUrl[fullUrl];

  const currentContent = !!fullUrlContent ? fullUrlContent : contentPerPage[pathname] ?? null;

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
        <CollapsibleContent></CollapsibleContent>
      </Collapsible>
      {!!currentContent && (
        <div className="bg-yellow-500 p-6 rounded-3xl flex flex-col gap-4">
          <p className="font-semibold text-xl">Tip of the day</p>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-lg">{currentContent.title}</p>
              {currentContent.sections.map((section) => {
                return (
                  <section key={section.title} className="flex flex-col gap-4">
                    <p className="font-semibold">{section.title}</p>
                    {section.items.map((item) => {
                      return (
                        <div key={item.title} className="flex flex-col gap-1">
                          <p className="font-medium">
                            {!!item?.step ? `${item.step}. ` : ""} {item.title}
                          </p>
                          <p>{item.description}</p>
                        </div>
                      );
                    })}
                    {currentContent?.footer && <p className="mt-2 font-medium">{currentContent.footer}</p>}
                  </section>
                );
              })}
          </div>
        </div>
      )}
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
