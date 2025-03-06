import React from "react";

export interface Props {
  id: string;
  title: string;
  description: string;
  content: string;
}

export default function Page(props: Props) {
  return (
    <>
      <p>
        <b>Title:</b> {props.title}
      </p>
      <p>
        <b>Description:</b> {props.description}
      </p>
      <p>
        <b>Content:</b> {props.content}
      </p>
    </>
  );
}
