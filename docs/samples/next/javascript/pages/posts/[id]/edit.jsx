import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { FormProvider } from "@/providers";

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
    mutationFn: (data) => api.put(`/posts/${postId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { isPending, error, data } = useQuery({
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
    <>
      {isSuccess && <p style={{ color: "green" }}>Updated with success.</p>}

      <h1>Editing post</h1>

      <FormProvider resolver={resolver} values={data} onSubmit={mutateAsync}>
        <PostForm />

        <div>
          <button disabled={isUpdating} type="submit">
            Update
          </button>
        </div>
      </FormProvider>

      <br />

      <div>
        <Link href={`/posts/${postId}`}>Show this post</Link>
        {" | "}
        <Link href="/posts">Back to posts</Link>
      </div>
    </>
  );
}
