"use client";

import html2canvas from "html2canvas";
import { useRef } from "react";

import { CodeBlock } from "~/features/code-block";

export default function Page() {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.append(link);
      link.click();
      link.remove();
    } else {
      window.open(data);
    }
  };

  return (
    <main>
      <button onClick={handleDownloadImage} type="button">
        Download as Image
      </button>

      <CodeBlock
        code={`
          // TypeScript < 5.1
          export function MyPlainStringComponent() {
            return <>My plain string component</>;
          }

          // TypeScript 5.1+
          export function MyPlainStringComponent() {
            return "My plain string component";
          }
        `}
        language="tsx"
        ref={printRef}
      />
    </main>
  );
}
