import React, { ReactNode } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/services";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { Props as PageProps } from "@/components/page";

export default function PagePage() {
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");

  const { isPending, error, data } = useQuery<PageProps[]>({
    queryFn: () => api.get("/pages").then((res) => res.data),
    queryKey: ["pages"],
  });

  if (isPending) {
    return "Loading...";
  } else if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <div className="prose mx-auto w-full lg:max-w-5xl">
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <h1>Pages</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Content</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((page) => (
            <TableRow key={page.id}>
              <TableCell>{page.id}</TableCell>
              <TableCell>{page.title}</TableCell>
              <TableCell>{page.description}</TableCell>
              <TableCell>{page.content}</TableCell>
              <TableCell className="text-right">
                <Link href={`/pages/${page.id}`}>
                  <Button size="sm" variant="ghost">
                    <Eye /> Show
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Link href="/pages/new">
          <Button>New page</Button>
        </Link>
      </div>
    </div>
  );
}

PagePage.getLayout = function getLayout(yeild: ReactNode) {
  return <Layout>{yeild}</Layout>;
};
