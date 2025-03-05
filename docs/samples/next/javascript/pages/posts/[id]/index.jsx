import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useParams, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services";
import Post from "@/components/post";

export default function PostShowPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const notice = searchParams.get("notice");
  const postId = params?.id;

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (data) => api.delete(`/posts/${postId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.replace({
        pathname: "/posts",
        query: { notice: "Removed with success." },
      });
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
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <Post {...data} />

      <div>
        <Link href={`/posts/${postId}/edit`}>Edit this post</Link>
        {" | "}
        <Link href="/posts">Back to posts</Link>{" "}
        <button disabled={isDeleting} onClick={() => mutate(postId)}>
          Destroy this post
        </button>
      </div>
    </>
  );
}
