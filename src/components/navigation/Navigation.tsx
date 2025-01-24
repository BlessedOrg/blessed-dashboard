"use client";
import { CreateEventButton } from "@/components/common/CreateEventButton";
import { CreateAppModal } from "@/components/modals/CreateAppModal";
import { AppSelect } from "@/components/navigation/AppSelect";
import { EventSelect } from "@/components/navigation/EventSelect";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { Button } from "@/components/ui";
import { AvatarMenu } from "@/components/ui/avatar-menu";
import { useUserContext } from "@/store/UserContext";
import { getCookie, setCookie } from "cookies-next";
import { ChevronLeft, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

interface NavigationProps {
  appId?: string;
  eventId?: string;
}

interface NavigationItem {
  href: string;
  label: string;
}

interface PathSettings {
  showFullLogo: boolean;
  showAppSelect?: boolean;
  showArrowBack?: boolean;
  showEventSelect?: true;
  showMiddleNavigation?: boolean;
  middleNavigationItems?: NavigationItem[];
  showRightSideCta?: boolean;
  rightSideCta?: React.ReactNode;
}

const Logo = ({ showFullLogo }: { showFullLogo: boolean }) => (
  <Link
    href="/"
    className={`p-2 ${
      showFullLogo ? "pr-4" : ""
    } rounded-full bg-white h-[3.25rem] flex items-center justify-center`}
  >
    <Image
      src={showFullLogo ? "/logo.svg" : "/logo-small.svg"}
      alt="logo blessed"
      width={showFullLogo ? 119 : 36}
      height={36}
      className="h-[36px]"
    />
  </Link>
);

const NavigationItems = ({
  items,
  pathname,
}: {
  items: NavigationItem[];
  pathname: string;
}) => (
  <div className="hidden gap-2 md:flex items-center justify-center">
    {items.map((item) => (
      <NavigationLink
        key={item.href}
        item={item}
        isActive={pathname === item.href}
      />
    ))}
  </div>
);

const NavigationLink = ({
  item,
  isActive,
}: {
  item: NavigationItem;
  isActive: boolean;
}) => (
  <Button size="xl" className={isActive ? "bg-white" : ""} asChild>
    <Link href={item.href}>{item.label}</Link>
  </Button>
);

const RightSideMenu = ({
  showRightSideCta,
  rightSideCta,
}: Pick<PathSettings, "showRightSideCta" | "rightSideCta">) => (
  <div className="hidden md:flex gap-5 items-center justify-end">
    <AvatarMenu />
    {showRightSideCta && rightSideCta}
  </div>
);

export const Navigation = ({ appId, eventId }: NavigationProps) => {
  const [warningHidden, setWarningHidden] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { appsData, email } = useUserContext();
  const currentApp = appsData?.apps?.find((app) => app.slug === appId);

  const getPreviousPath = (currentPath: string) => {
    const pathParts = currentPath.split("/").filter(Boolean);
    pathParts.pop(); // Remove the last segment
    return `/${pathParts.join("/")}`;
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const previousPath = getPreviousPath(pathname);
    router.push(previousPath);
  };

  const navigationConfig = {
    middleNavigationItems: {
      appNav: [
        { href: `/${appId}`, label: "App" },
        { href: `/${appId}/campaigns`, label: "Campaigns" },
        { href: `/${appId}/audience`, label: "Audiences" },
        { href: `/${appId}/rewards`, label: "Rewards" },
      ],
    },
    rightSideCta: {
      main: <CreateAppModal label="Create new app" variant="green" />,
      app: (
        <CreateEventButton
          label="Add new event"
          variant="green"
          appId={appId}
        />
      ),
    },
  };
  const commonSettings = {
    campaign_and_audience: {
      showFullLogo: false,
      showAppSelect: true,
      showMiddleNavigation: true,
      showArrowBack: true,
      middleNavigationItems: navigationConfig.middleNavigationItems.appNav,
      showRightSideCta: false,
    },
  };
  const pathSettings: Record<string, PathSettings> = {
    [`/${appId}/${eventId}`]: {
      showArrowBack: true,
      showFullLogo: false,
      showEventSelect: true,
      showMiddleNavigation: true,
      showRightSideCta: true,
      rightSideCta: navigationConfig.rightSideCta.app,
      middleNavigationItems: navigationConfig.middleNavigationItems.appNav,
    },
    [`/${appId}/audience`]: commonSettings.campaign_and_audience,
    [`/${appId}/campaigns`]: commonSettings.campaign_and_audience,
    [`/${appId}/rewards`]: commonSettings.campaign_and_audience,
    [`/${appId}/discounts`]: commonSettings.campaign_and_audience,
    [`/${appId}/vouchers`]: commonSettings.campaign_and_audience,
    [`/${appId}/create-event`]: {
      showFullLogo: true,
    },
    [`/${appId}/create-event`]: {
      showFullLogo: false,
      showAppSelect: true,
      showMiddleNavigation: true,
      middleNavigationItems: navigationConfig.middleNavigationItems.appNav,
      showRightSideCta: false,
      rightSideCta: navigationConfig.rightSideCta.app,
    },
    [`/${appId}/${eventId}/edit`]: {
      showFullLogo: false,
      showAppSelect: false,
      showMiddleNavigation: true,
      showEventSelect: true,
      showArrowBack: true,
      middleNavigationItems: navigationConfig.middleNavigationItems.appNav,
      showRightSideCta: false,
      rightSideCta: navigationConfig.rightSideCta.app,
    },
    [`/${appId}/${eventId}/tickets`]: {
      showFullLogo: false,
      showAppSelect: false,
      showMiddleNavigation: true,
      showEventSelect: true,
      showArrowBack: true,
      middleNavigationItems: navigationConfig.middleNavigationItems.appNav,
      showRightSideCta: false,
      rightSideCta: navigationConfig.rightSideCta.app,
    },
    [`/${appId}/${eventId}/create-ticket`]: {
      showFullLogo: false,
      showAppSelect: false,
      showMiddleNavigation: true,
      showEventSelect: true,
      showArrowBack: true,
      middleNavigationItems: navigationConfig.middleNavigationItems.appNav,
      showRightSideCta: false,
      rightSideCta: navigationConfig.rightSideCta.app,
    },
    [`/${appId}`]: {
      showFullLogo: false,
      showAppSelect: true,
      showMiddleNavigation: true,
      middleNavigationItems: navigationConfig.middleNavigationItems.appNav,
      showRightSideCta: false,
      rightSideCta: navigationConfig.rightSideCta.app,
    },
    "/": {
      showFullLogo: true,
      showMiddleNavigation: false,
      showRightSideCta: true,
      rightSideCta: navigationConfig.rightSideCta.main,
    },
  };

  const settings = pathSettings[pathname] ?? pathSettings["/"];

  const onHideWarning = () => {
    setWarningHidden(true);
    setCookie("hide-warning", "true");
  };
  const isWarningHidden = getCookie("hide-warning");

  useLayoutEffect(() => {
    setWarningHidden(Boolean(isWarningHidden));
  }, [isWarningHidden]);

  const showEmailWarning = !warningHidden && !email;
  const showVerificationWarning = false; //TODO: remove hardcoded value

  return (
    <div className="sticky top-0 left-0 right-0 z-20 flex flex-col">
      {(showEmailWarning || showVerificationWarning) && (
        <div
          className={`w-full bg-gradient-to-b from-yellow-500 to-white p-4 grid ${
            showEmailWarning ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          } gap-4`}
        >
          {showEmailWarning && (
            <div className="border-[#FFD556] rounded-2xl border-2 p-4 flex gap-4 items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-[4.25rem] h-[4.25rem] bg-[#FFE9A6] rounded-xl flex items-center justify-center">
                  <Image
                    src={"/img/icons/inbox-heart.svg"}
                    width={40}
                    height={40}
                    alt="inbox-heart"
                  />
                </div>

                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">Missing email!</h2>
                  <p className="text-sm">
                    You might miss free tickets, updates, and rewards.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/profile">Add email</Link>
                </Button>
                <button onClick={onHideWarning}>
                  <X />
                </button>
              </div>
            </div>
          )}

          <div className="border-[#FFD556] rounded-2xl border-2 p-4  flex gap-2 items-center">
            <div className="w-[4.25rem] h-[4.25rem] bg-[#FFE9A6] rounded-xl flex items-center justify-center">
              <Image
                src={"/img/icons/settings.svg"}
                width={40}
                height={40}
                alt="settings"
              />
            </div>

            <div className="flex flex-col">
              <h2 className="text-lg font-bold">Not verified!</h2>
              <p className="text-sm">
                You might miss out on exclusive tickets.
              </p>
            </div>
          </div>
        </div>
      )}
      <nav
        className={`grid grid-cols-2 ${
          settings.showMiddleNavigation && settings.middleNavigationItems
            ? "md:grid-cols-3"
            : "md:grid-cols-2"
        } w-full py-6 px-6 bg-root-background`}
      >
        <div className="flex gap-2">
          <Logo showFullLogo={settings.showFullLogo} />
          {settings.showArrowBack && (
            <button
              onClick={handleBackClick}
              className="bg-white h-[3.25rem] rounded-full flex items-center justify-center px-4"
            >
              <ChevronLeft color="#000" />
            </button>
          )}
          {settings.showAppSelect && <AppSelect currentAppId={appId} />}
          {settings.showEventSelect && (
            <EventSelect appId={appId} currentEventSlug={eventId} />
          )}
        </div>

        {settings.showMiddleNavigation && settings.middleNavigationItems && (
          <NavigationItems
            items={settings.middleNavigationItems}
            pathname={pathname}
          />
        )}

        <RightSideMenu
          showRightSideCta={settings.showRightSideCta}
          rightSideCta={settings.rightSideCta}
        />

        <MobileNavigation />
      </nav>
    </div>
  );
};
