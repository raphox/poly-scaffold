import React from "react";

export interface Props {
  id: string;
  title: string;
  description: string;
}

export default function Post(props: Props) {
  return (
    <>
      <p>
        <b>post:</b> {props.title}
      </p>
      <p>
        <b>post:</b> {props.description}
      </p>
    </>
  );
}
