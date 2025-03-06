import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";

import { AppProvider } from "@/providers";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import "@/styles/globals.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AppProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{getLayout(<Component {...pageProps} />)}</SidebarInset>
      </SidebarProvider>
    </AppProvider>
  );
}
