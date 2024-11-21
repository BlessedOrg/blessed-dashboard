"use client";
import Link from "next/link";
import Image from "next/image";
import { AppSelect } from "@/components/navigation/AppSelect";
import { Button } from "@/components/ui";
import { AvatarMenu } from "@/components/ui/avatar-menu";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { usePathname, useRouter } from "next/navigation";
import { CreateAppModal } from "@/components/modals/CreateAppModal";
import { CreateEventButton } from "@/components/common/CreateEventButton";
import { EventSelect } from "@/components/navigation/EventSelect";
import { ChevronLeft } from "lucide-react";

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
  <Link href="/" className={`p-2 ${showFullLogo ? "pr-4" : ""} rounded-full bg-white h-[3.25rem] flex items-center justify-center`}>
    <Image
      src={showFullLogo ? "/logo.svg" : "/logo-small.svg"}
      alt="logo blessed"
      width={showFullLogo ? 119 : 36}
      height={36}
      className="h-[36px]"
    />
  </Link>
);

const NavigationItems = ({ items, pathname }: { items: NavigationItem[]; pathname: string }) => (
  <div className="hidden gap-2 md:flex items-center">
    {items.map((item) => (
      <NavigationLink key={item.href} item={item} isActive={pathname === item.href} />
    ))}
  </div>
);

const NavigationLink = ({ item, isActive }: { item: NavigationItem; isActive: boolean }) => (
  <Button size="xl" className={isActive ? "bg-white" : ""} asChild>
    <Link href={item.href}>{item.label}</Link>
  </Button>
);

const RightSideMenu = ({ showRightSideCta, rightSideCta }: Pick<PathSettings, "showRightSideCta" | "rightSideCta">) => (
  <div className="hidden md:flex gap-5 items-center">
    <AvatarMenu />
    {showRightSideCta && rightSideCta}
  </div>
);

export const Navigation = ({ appId, eventId }: NavigationProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const navigationConfig = {
    middleNavigationItems: {
      appNav: [
        { href: `/${appId}`, label: "App" },
        { href: `/${appId}/campaigns`, label: "Campaigns" },
        { href: `/${appId}/audience`, label: "Audience" }
      ]
    },
    rightSideCta: {
      main: <CreateAppModal label="Add new app" variant="green" />,
      app: <CreateEventButton label="Add new event" variant="green" appId={appId} />
    }
  };
  const commonSettings = {
    campaign_and_audience: {
      showFullLogo: false,
      showMiddleNavigation: true,
      middleNavigationItems: navigationConfig.middleNavigationItems.appNav,
      showRightSideCta: false
    }
  };
  const pathSettings: Record<string, PathSettings> = {
    [`/${appId}/${eventId}`]: {
      showArrowBack: true,
      showFullLogo: false,
      showEventSelect: true,
      showMiddleNavigation: true,
      showRightSideCta: true,
      rightSideCta: navigationConfig.rightSideCta.app,
      middleNavigationItems: navigationConfig.middleNavigationItems.appNav
    },
    [`/${appId}/audience`]: commonSettings.campaign_and_audience,
    [`/${appId}/campaigns`]: commonSettings.campaign_and_audience,
    [`/${appId}/create-event`]: {
      showFullLogo: true
    },
    [`/${appId}`]: {
      showFullLogo: false,
      showAppSelect: true,
      showMiddleNavigation: true,
      middleNavigationItems: navigationConfig.middleNavigationItems.appNav,
      showRightSideCta: false,
      rightSideCta: navigationConfig.rightSideCta.app
    },
    "/": {
      showFullLogo: true,
      showMiddleNavigation: false,
      showRightSideCta: true,
      rightSideCta: navigationConfig.rightSideCta.main
    }
  };

  const settings = pathSettings[pathname] ?? pathSettings["/"];

  return (
    <nav className="flex justify-between w-full py-6 px-6 sticky top-0 left-0 right-0 z-20">
      <div className="flex gap-2">
        <Logo showFullLogo={settings.showFullLogo} />
        {settings.showArrowBack && (
          <Button
            className="bg-white w-[3.25rem] h-[3.25rem] rounded-full flex items-center justify-center p-0"
            onClick={() => router.back()}
          >
            <ChevronLeft color="#000" />
          </Button>
        )}
        {settings.showAppSelect && <AppSelect currentAppId={appId} />}
        {settings.showEventSelect && <EventSelect appId={appId} currentEventSlug={eventId} />}
      </div>

      {settings.showMiddleNavigation && settings.middleNavigationItems && (
        <NavigationItems items={settings.middleNavigationItems} pathname={pathname} />
      )}

      <RightSideMenu showRightSideCta={settings.showRightSideCta} rightSideCta={settings.rightSideCta} />

      <MobileNavigation />
    </nav>
  );
};
