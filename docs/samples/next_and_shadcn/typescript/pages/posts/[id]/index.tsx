import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useParams, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import Post, { Props as PostProps } from "@/components/post";

export default function PostShowPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const notice = searchParams.get("notice");
  const postId = params?.id;

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: () => api.delete(`/posts/${postId}`),
    onSuccess: () => {
      const query = new URLSearchParams({ notice: "Removed with success." });

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.replace(`/posts?${query.toString()}`);
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
    return "An error has occurred: " + (error as Error).message;
  }

  return (
    <div className="prose mx-auto w-full lg:max-w-5xl">
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <h1>Post</h1>

      <Post {...data} />

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Link href="/posts">
          <Button variant="link">Back to posts</Button>
        </Link>
        <Button
          variant="destructive"
          disabled={isDeleting}
          onClick={() => mutate()}
        >
          Destroy this post
        </Button>
        <Link href={`/posts/${postId}/edit`}>
          <Button>Edit</Button>
        </Link>
      </div>
    </div>
  );
}

PostShowPage.getLayout = function getLayout(yeild: ReactNode) {
  return <Layout>{yeild}</Layout>;
};
