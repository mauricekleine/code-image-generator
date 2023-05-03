import { marked } from "marked";
import parserBabel from "prettier/parser-babel";
import prettier from "prettier/standalone";
import prism from "prismjs";
import { forwardRef } from "react";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-shell-session";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";

import "./code-block-theme.css";

type Language =
  | "bash"
  | "css"
  | "html"
  | "js"
  | "jsx"
  | "shell-session"
  | "ts"
  | "tsx";

const parseAndHighlight = (code: string, language: Language) => {
  if (["bash", "shell-session"].includes(language)) {
    return marked(`\`\`\`${language}\n${code}`, {
      highlight: (code) => {
        return prism.highlight(code, prism.languages[language], language);
      },
    });
  }

  const prettified = prettier.format(code, {
    parser: "babel-ts",
    plugins: [parserBabel],
  });

  return marked(`\`\`\`${language}\n${prettified}\`\`\``, {
    highlight: (code) => {
      return prism.highlight(code, prism.languages[language], language);
    },
  });
};

type Props = {
  code: string;
  language?: Language;
};

export const CodeBlock = forwardRef<HTMLDivElement, Props>(
  function CodeBlockWithForwardedRef({ code, language = "ts" }, ref) {
    return (
      <div
        className="flex aspect-[1.91/1] max-w-fit items-center justify-center bg-gradient-to-tr from-violet-500 to-orange-300 p-16"
        ref={ref}
      >
        <div
          className="rounded-xl bg-black/90 p-8 text-white"
          dangerouslySetInnerHTML={{
            __html: parseAndHighlight(code, language),
          }}
        ></div>
      </div>
    );
  }
);
