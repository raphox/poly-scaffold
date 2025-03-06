import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { FormProvider } from "@/providers";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { Props as PostProps } from "@/components/post";
import PostForm, { resolver } from "@/components/post-form";

export default function PostNewPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync } = useMutation({
    mutationFn: (data: PostProps) => api.post("/posts", data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push({
        pathname: `/posts/${data.id}`,
        query: { notice: "Created with success." },
      });
    },
  });

  return (
    <div className="prose mx-auto w-full lg:max-w-5xl">
      <h1>New post</h1>

      <FormProvider
        resolver={resolver}
        values={{
          title: "",
          description: "",
        }}
        onSubmit={mutateAsync}
      >
        <PostForm />

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Link href="/posts">
            <Button variant="link">Back to posts</Button>
          </Link>
          <Button disabled={isCreating} type="submit">
            Create
          </Button>
        </div>
      </FormProvider>
    </div>
  );
}

PostNewPage.getLayout = function getLayout(yeild: ReactNode) {
  return <Layout>{yeild}</Layout>;
};
