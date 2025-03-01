import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/services";
import Post, { Props as PostProps } from "@/components/post";

export default function PostPage() {
  const searchParams = useSearchParams();
  const notice = searchParams.get("notice");

  const { isPending, error, data } = useQuery<PostProps[]>({
    queryFn: () => api.get("/posts").then((res) => res.data),
    queryKey: ["posts"],
  });

  if (isPending) {
    return "Loading...";
  } else if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <>
      {notice && <p style={{ color: "green" }}>{notice}</p>}

      <h1>posts</h1>

      <div id="posts">
        {data.map((post) => (
          <div key={post.id} id={`post_${post.id}`}>
            <Post {...post} />
            <p>
              <Link href={`/posts/${post.id}`}>Show this post</Link>
            </p>
          </div>
        ))}
      </div>

      <Link href={`/posts/new`}>New post</Link>
    </>
  );
}
