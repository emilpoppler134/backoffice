import {
  ClipboardIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import React, { SVGProps, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import SidebarItem from "../components/SidebarItem";
import Warnings from "../components/Warnings";
import { useWarnings } from "../hooks/useWarnings";
import { useAuth } from "../provider/authProvider";
import { Breadcrumb } from "../types/Breadcrumb";

const SETTINGS_PAGES = {
  ACCOUNT: "account",
  BILLING_HISTORY: "billing-history",
  SUBSCRIPTION: "subscription",
} as const;

type ObjectValues<T> = T[keyof T];
type SettingsPage = ObjectValues<typeof SETTINGS_PAGES>;

function isSettingsPage(page: string): page is SettingsPage {
  return Object.values(SETTINGS_PAGES).includes(page as SettingsPage);
}

type NavigationItem = {
  id: SettingsPage;
  title: string;
  Icon: React.FC<SVGProps<SVGElement>>;
};

type SettingsContentProps = {
  page: SettingsPage;
};

const navigation: Array<NavigationItem> = [
  {
    id: SETTINGS_PAGES.ACCOUNT,
    title: "Account",
    Icon: UserCircleIcon as React.FC<SVGProps<SVGElement>>,
  },
  {
    id: SETTINGS_PAGES.BILLING_HISTORY,
    title: "Billing history",
    Icon: ClipboardIcon as React.FC<SVGProps<SVGElement>>,
  },
  {
    id: SETTINGS_PAGES.SUBSCRIPTION,
    title: "Subscription",
    Icon: KeyIcon as React.FC<SVGProps<SVGElement>>,
  },
];

const SettingsContent: React.FC<SettingsContentProps> = ({ page }) => {
  switch (page) {
    case SETTINGS_PAGES.ACCOUNT: {
      return <span>Account</span>;
    }

    case SETTINGS_PAGES.BILLING_HISTORY: {
      return <span>Billing history</span>;
    }

    case SETTINGS_PAGES.SUBSCRIPTION: {
      return <span>Subscription</span>;
    }

    default: {
      return <span>Something went wrong.</span>;
    }
  }
};

export default function Settings() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { user, signNewToken } = useAuth();
  if (!user) return null;

  const { warnings, pushWarning, removeWarning, clearWarnings } = useWarnings();

  const pageProp = searchParams.get("page");
  const defaultPage: SettingsPage =
    pageProp && isSettingsPage(pageProp)
      ? (pageProp as SettingsPage)
      : SETTINGS_PAGES.ACCOUNT;

  const [page, setPage] = useState<SettingsPage>(defaultPage);

  const changePage = (to: SettingsPage) => {
    setSearchParams({ page: to });
    setPage(to);
  };

  const pageTitle =
    navigation.find((item) => item.id === page)?.title ?? "Account";

  const breadcrumb: Breadcrumb = [{ title: "Settings" }, { title: pageTitle }];

  return (
    <Layout breadcrumb={breadcrumb}>
      <div className="flex gap-8 w-full">
        <div className="flex w-full max-w-[20rem] flex-col bg-clip-border py-4 text-gray-700">
          <nav className="flex flex-col p-2 text-base">
            {navigation.map((item) => (
              <SidebarItem
                {...item}
                key={item.id}
                current={page}
                onPress={() => changePage(item.id)}
              />
            ))}
          </nav>
        </div>

        <div className="flex-1 py-4">
          <SettingsContent page={page} />
        </div>
      </div>

      <Warnings list={warnings} onClose={(item) => removeWarning(item)} />
    </Layout>
  );
}
