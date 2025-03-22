import { BlogContentProvider } from "@/component/context/BlogContantContext";
import EditorPageUI from "@/component/EditorPage/EditerPageUI";
import EditorPageHeader from "@/component/EditorPage/header";
import { type Blog, DEFAULT_BLOG } from "@/lib/blogType";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let blog: Blog = {
    id: "",
    title: "",
    author: "",
    tag: "",
    status: "draft",
    keywords: null,
    cover_image_url: null,
    description: null,
    created_at: "",
    updated_at: "",
    published_at: null,
  };
  
  if (id == "example") {
    blog = DEFAULT_BLOG;
  } else {
    const blogResponse = await fetch(process.env.NEXT_PUBLIC_DOMAIN + `/api/blog/${id}`);
    blog = await blogResponse.json();
  }
  
  console.log("data get from server");
  console.log(blog);

  return (
    <BlogContentProvider>
      <div className="flex flex-col h-screen bg-zinc-100">
        <header className="border-b-gray-300 border-b shadow-lg">
          <EditorPageHeader />
        </header>
        <main className="w-full h-full flex flex-row justify-start gap-10 overflow-hidden mt-4">
          <EditorPageUI blog={blog} />
        </main>
      </div>
    </BlogContentProvider>
  );
}
