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
import { Props as PostProps } from "@/components/post";

export default function PostPage() {
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");

  const { isPending, error, data } = useQuery<PostProps[]>({
    queryFn: () => api.get("/posts").then((res) => res.data),
    queryKey: ["posts"],
  });

  if (isPending) {
    return "Loading...";
  } else if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <div className="prose mx-auto w-full lg:max-w-5xl">
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <h1>Posts</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.description}</TableCell>
              <TableCell className="text-right">
                <Link href={`/posts/${post.id}`}>
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
        <Link href="/posts/new">
          <Button>New post</Button>
        </Link>
      </div>
    </div>
  );
}

PostPage.getLayout = function getLayout(yeild: ReactNode) {
  return <Layout>{yeild}</Layout>;
};
