import React from "react";
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
    mutationFn: (data: PostProps) => api.delete(`/posts/${postId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.replace({
        pathname: "/posts",
        query: { notice: "Removed with success." },
      });
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
    <>
      {notice && <p style={{ color: "green" }}>{notice}</p>}

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
    </>
  );
}

PostShowPage.getLayout = function getLayout(yeild: ReactNode) {
  return <Layout>{yeild}</Layout>;
};
