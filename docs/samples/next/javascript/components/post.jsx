import React from "react";

export default function Post(props) {
  return (
    <>
      <p>
        <b>Title:</b> {props.title}
      </p>
      <p>
        <b>Description:</b> {props.description}
      </p>
    </>
  );
}
