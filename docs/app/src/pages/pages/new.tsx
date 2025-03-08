import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { FormProvider } from "@/providers";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { Props as PageProps } from "@/components/page";
import PageForm, { resolver } from "@/components/page-form";

export default function PageNewPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync } = useMutation({
    mutationFn: (data: PageProps) => api.post("/pages", data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      router.push({
        pathname: `/pages/${data.id}`,
        query: { notice: "Created with success." },
      });
    },
  });

  return (
    <div className="prose mx-auto w-full lg:max-w-5xl">
      <h1>New page</h1>

      <FormProvider
        resolver={resolver}
        values={{
          title: "",
          description: "",
          content: "",
        }}
        onSubmit={mutateAsync}
      >
        <PageForm />

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Link href="/pages">
            <Button variant="link">Back to pages</Button>
          </Link>
          <Button disabled={isCreating} type="submit">
            Create
          </Button>
        </div>
      </FormProvider>
    </div>
  );
}

PageNewPage.getLayout = function getLayout(yeild: ReactNode) {
  return <Layout>{yeild}</Layout>;
};
