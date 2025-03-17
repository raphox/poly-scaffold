import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { api, docPages } from "@/services";
import Page, { Props as PageProps } from "@/components/doc";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PageShowPage() {
  const titles = ["Docs"];
  const params = useParams();
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");
  const pageId =
    params?.slug && docPages.findIndex((page) => page.slug === params.slug) + 1;

  const { isPending, error, data } = useQuery<PageProps>({
    queryFn: () => api.get(`/pages/${pageId}`).then((res) => res.data),
    queryKey: ["pages", pageId],
    enabled: !!pageId,
  });

  if (isPending) {
    return "Loading...";
  } else if (error) {
    return "An error has occurred: " + (error as Error).message;
  }

  titles.push(...data.title.split("/"));

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {titles.map((title, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">{title}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < titles.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="prose mx-auto w-full lg:max-w-5xl">
          {notice && <p style={{ color: "green" }}>{notice}</p>}

          <Page {...data} />
        </div>
      </div>
    </>
  );
}
