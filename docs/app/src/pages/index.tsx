import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { push } = useRouter();

  useEffect(() => {
    push("/pages");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <p>Loading...</p>;
}
