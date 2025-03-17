import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { FormProvider } from "@/providers";
import { Props as PostProps } from "@/components/post";
import PostForm, { resolver } from "@/components/post-form";

export default function PostNewPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync } = useMutation({
    mutationFn: (data: PostProps) => api.post("/posts", data),
    onSuccess: ({ data }) => {
      const query = new URLSearchParams({ notice: "Created with success." });

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push(`/posts?${query.toString()}`);
    },
  });

  return (
    <>
      <h1>New post</h1>

      <FormProvider resolver={resolver} values={{}} onSubmit={mutateAsync}>
        <PostForm />

        <div>
          <button disabled={isCreating} type="submit">
            Create
          </button>
        </div>
      </FormProvider>

      <br />

      <div>
        <Link href="/posts">Back to posts</Link>
      </div>
    </>
  );
}
