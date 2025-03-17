import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const { push } = useRouter();

  useEffect(() => {
    push("/posts");
  }, []);

  return <p>Loading...</p>;
}
