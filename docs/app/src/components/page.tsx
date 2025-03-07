import React from "react";

declare global {
  interface Window {
    hljs: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    markdownit: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

export interface Props {
  id: string;
  title: string;
  description: string;
  content: string;
}

export default function Page(props: Props) {
  const hljs = window.hljs;
  const md = window.markdownit({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre><code class="hljs">' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            "</code></pre>"
          );
        } catch (e) {
          console.error(e);
        }
      }

      return (
        '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>"
      );
    },
  });
  const content = md.render(props.content);

  return (
    <>
      <p>
        <b>Title:</b> {props.title}
      </p>
      <p>
        <b>Description:</b> {props.description}
      </p>
      <p>
        <b>Content:</b>
      </p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
