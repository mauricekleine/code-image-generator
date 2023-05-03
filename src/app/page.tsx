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
$ npx taze major -w # update all dependencies to latest major version

mauricekleine.com - 2 minor, 3 patch

  date-fns            ~8mo   ~2.29.3  →   ~2.30.0  ~3d
  simple-icons        ~10d   ~8.11.0  →   ~8.12.1  ~3d
  framer-motion       ~15d  ~10.12.4  →  ~10.12.7  ⩽1d
  next                ~11d   ~13.3.1  →   ~13.3.4  ~2d
  @types/node    dev   ~5d  ~18.16.2  →  ~18.16.3  ~4d

ℹ changes written to package.json, run npm i to install updates.
        `}
        language="shell-session"
        ref={printRef}
      />
    </main>
  );
}
