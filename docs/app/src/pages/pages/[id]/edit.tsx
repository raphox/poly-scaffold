import React, { ReactNode } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { FormProvider } from "@/providers";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { Props as PageProps } from "@/components/page";
import PageForm, { resolver } from "@/components/page-form";

export default function PageEditPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const pageId = params?.id;

  const {
    isPending: isUpdating,
    isSuccess,
    mutateAsync,
  } = useMutation({
    mutationFn: (data: PageProps) => api.put(`/pages/${pageId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
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
    return "An error has occurred: " + error.message;
  }

  return (
    <div className="prose mx-auto w-full lg:max-w-5xl">
      {isSuccess && <p style={{ color: "green" }}>Updated with success.</p>}

      <h1>Editing page</h1>

      <FormProvider resolver={resolver} values={data} onSubmit={mutateAsync}>
        <PageForm />

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Link href="/pages">
            <Button variant="link">Back to pages</Button>
          </Link>
          <Link href={`/pages/${pageId}`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button disabled={isUpdating} type="submit">
            Update
          </Button>
        </div>
      </FormProvider>
    </div>
  );
}

PageEditPage.getLayout = function getLayout(yeild: ReactNode) {
  return <Layout>{yeild}</Layout>;
};
