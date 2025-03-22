"use client";
import type { Blog } from "@/lib/blogType";
import { TimeStrConvertion } from "@/utils/timeFunc";
import SettingMenu from "./settingMenu";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

const converTime = (time: string) => {
  const timeStamp = new Date(time).getTime();
  return TimeStrConvertion(timeStamp);
};

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link href={`/editor/${blog.id}`}>
      <div className="relative w-64 h-64 bg-white border border-black rounded-lg px-4 py-8 flex flex-col justify-between hover:bg-gray-100 hover:shadow-lg duration-50 transition-all">
        <div
          className="absolute top-2 right-2 z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <SettingMenu blog={blog} />
        </div>
        <div>
          <p className="text-lg font-semibold">{blog.title}</p>
          <p className="text-sm text-gray-500">
            Status: {blog.status === "draft" ? "Draft" : "Published"}
          </p>
          <p className="text-sm text-gray-400">
            Created At: {converTime(blog.created_at)}
          </p>
          <div className="text-sm text-black">Author: {blog.author}</div>
          <div className="text-sm text-black">Tag: {blog.tag}</div>
          <div className="text-sm text-black">Keywords: {blog.keywords}</div>
        </div>

        <div className="mt-4 text-sm text-gray-600">{blog.description}</div>
      </div>
    </Link>
  );
};
export default BlogCard;
