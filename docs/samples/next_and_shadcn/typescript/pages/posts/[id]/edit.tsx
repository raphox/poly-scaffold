import React, { ReactNode } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { FormProvider } from "@/providers";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import { Props as PostProps } from "@/components/post";
import PostForm, { resolver } from "@/components/post-form";

export default function PostEditPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const postId = params?.id;

  const {
    isPending: isUpdating,
    isSuccess,
    mutateAsync,
  } = useMutation({
    mutationFn: (data: PostProps) => api.put(`/posts/${postId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { isPending, error, data } = useQuery<PostProps>({
    queryFn: () => api.get(`/posts/${postId}`).then((res) => res.data),
    queryKey: ["posts", postId],
    enabled: !!postId,
  });

  if (isPending) {
    return "Loading...";
  } else if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <div className="prose mx-auto w-full lg:max-w-5xl">
      {isSuccess && <p style={{ color: "green" }}>Updated with success.</p>}

      <h1>Editing post</h1>

      <FormProvider resolver={resolver} values={data} onSubmit={mutateAsync}>
        <PostForm />

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Link href="/posts">
            <Button variant="link">Back to posts</Button>
          </Link>
          <Link href={`/posts/${postId}`}>
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

PostEditPage.getLayout = function getLayout(yeild: ReactNode) {
  return <Layout>{yeild}</Layout>;
};
