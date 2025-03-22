import { NextResponse, NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';

const sql = neon(String(process.env.DATABASE_URL));

// Get all blogs
export async function GET() {
  const blogs = await sql('SELECT * FROM blogs');
  console.log("GET all blogs");
  console.log(blogs);
  return NextResponse.json(blogs);
}

// Create a new blog
export async function POST(req: NextRequest) {
  const { title, author, tag, description, keywords, cover_image_url, created_at }: {
    title: string,
    author: string | null,
    tag: string,
    description: string | null,
    keywords: string[] | null,
    cover_image_url: string | null,
    created_at: number
  } = await req.json();
  console.log(title, author, tag, description, keywords, cover_image_url, created_at);

  const id = uuidv4();
  const result = await sql`INSERT INTO blogs (id, title, author, tag, status, description, keywords, cover_image_url, created_at, updated_at) VALUES (${id}, ${title}, ${author}, ${tag}, ${'draft'}, ${description}, ${keywords?.join(";")}, ${cover_image_url}, TO_TIMESTAMP(${created_at / 1000} ), TO_TIMESTAMP(${created_at / 1000}))`;
  console.log(result);

  const uploadResponse = await fetch(
    process.env.NEXT_PUBLIC_DOMAIN + `/api/blog/${id}`,
    {
      method: 'POST',
      body: JSON.stringify({
        tag, content: [{
          id: "1",
          type: "header",
          data: {
            text: "Hello, I am a blog. Start from the title!",
            level: 1,
          },
        },]
      }),
    }
  );

  console.log(uploadResponse);

  return NextResponse.json({ id });
}

export const config = {
  runtime: 'edge',
};
