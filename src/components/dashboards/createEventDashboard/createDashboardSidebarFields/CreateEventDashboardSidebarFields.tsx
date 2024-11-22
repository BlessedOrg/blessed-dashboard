import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export const CreateEventDashboardSidebarFields = ({ selectedCategory, selectedTab, createViewItems, isProcessing }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className={`xl:sticky xl:top-[6.25rem] xl:h-[calc(100vh-6.25rem)] xl:min-w-[20rem]`}>
      <div className="flex flex-col gap-4 w-full">
        {createViewItems.map((category, index) => {
          return (
            <div
              key={category.id}
              className={`${isProcessing ? "cursor-not-allowed" : ""} bg-gradient-to-r ${category.id === selectedCategory ? "from-green-500 to-yellow-500" : "from-white to-yellow-500 cursor-pointer"} p-4`}
              onClick={
                selectedCategory !== category.id && !isProcessing
                  ? () => {
                    router.replace(
                      `${pathname}?category=${category.id}&tab=${category.tabs.find((tab) => tab.primary).href}`
                    );
                  }
                  : null
              }
            >
              <div className={`${isProcessing ? "cursor-not-allowed" : ""} w-full h-full bg-white pb-2`}>
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex gap-2 justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <Image src={category.icon} alt="heart icon" width={24} height={24} />
                      <p className="font-semibold">{category.name}</p>
                    </div>
                    <span className="font-semibold text-xl">
                      {createViewItems.length === 1 ? "" : index + 1 + "/" + createViewItems.length}
                    </span>
                  </div>
                  <p>{category.description}</p>
                </div>
                <ul
                  className={`${selectedCategory === category.id ? "min-h-fit" : "max-h-0 overflow-hidden"}`}
                  style={{
                    transition: "all 250ms"
                  }}
                >
                  {category.tabs.map((tab) => {
                    return (
                      <li
                        key={tab.href}
                        className={`w-full font-semibold ${selectedTab === tab.href ? "bg-gray-200" : ""}`}
                      >
                        <Link
                          aria-disabled={isProcessing}
                          href={isProcessing ? "#" : `${pathname}?category=${category.id}&tab=${tab.href}`}
                          className={`px-4 py-2 inline-block w-full ${
                            isProcessing ? "pointer-events-none cursor-not-allowed opacity-50" : ""
                          }`}
                          onClick={(e) => {
                            if (isProcessing) {
                              e.preventDefault();
                            }
                          }}
                        >
                          {tab.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
