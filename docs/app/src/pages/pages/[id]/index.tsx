import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useParams, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import Page, { Props as PageProps } from "@/components/page";

export default function PageShowPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const notice = searchParams.get("notice");
  const pageId = params?.id;

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: () => api.delete(`/pages/${pageId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      router.replace({
        pathname: "/pages",
        query: { notice: "Removed with success." },
      });
    },
  });

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

  return (
    <div className="prose mx-auto w-full lg:max-w-5xl">
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <h1>Page</h1>

      <Page {...data} />

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Link href="/pages">
          <Button variant="link">Back to pages</Button>
        </Link>
        <Button
          variant="destructive"
          disabled={isDeleting}
          onClick={() => mutate()}
        >
          Destroy this page
        </Button>
        <Link href={`/pages/${pageId}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>
    </div>
  );
}

PageShowPage.getLayout = function getLayout(yeild: ReactNode) {
  return <Layout>{yeild}</Layout>;
};
