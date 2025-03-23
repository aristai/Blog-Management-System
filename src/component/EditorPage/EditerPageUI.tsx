"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/component/Editor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-300 animate-pulse rounded-md" />
  ),
});
const Previewer = dynamic(() => import("@/component/Previewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-300 animate-pulse rounded-md" />
  ),
});
import { Splitter } from "antd";
import type { Blog } from "@/lib/blogType";
import { useBlogContent } from "@/component/context/BlogContantContext";

const EditorPageUI = ({ blog }: { blog: Blog }) => {
  const { setData } = useBlogContent();

  useEffect(() => {
    setData(blog);
  }, [blog, setData]);

  return (
    <Splitter
      style={{
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        padding: "1rem 0 0 0",
      }}
    >
      <Splitter.Panel
        defaultSize="40%"
        min="20%"
        max="70%"
        style={{ margin: "0 2rem 1rem 0", backgroundColor: "#fff" }}
      >
        <Editor editorblock="editorjs-container" />
      </Splitter.Panel>
      <Splitter.Panel
        defaultSize="60%"
        min="30%"
        max="80%"
        style={{
          margin: "0 0 1rem 2rem",
          backgroundColor: "#fff",
        }}
      >
        <Previewer />
      </Splitter.Panel>
    </Splitter>
  );
};

export default EditorPageUI;
