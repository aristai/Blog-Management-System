"use client";
import { Form, Input, Select, Button, Spin, notification } from "antd";
import type { SelectProps } from "antd";
import React, { useState } from "react";
import { Blog } from "@/lib/blogType";
import { useRouter } from "next/navigation";

const options: SelectProps["options"] = [];

type FieldType = {
  title?: string;
  author?: string;
  tag?: string;
  description?: string;
  keywords?: string[];
  cover_image_url?: string;
};

interface EditBlogFormProps {
  blog: Blog;
  closeModel: () => void;
}

const EditBlogForm = ({ closeModel, blog }: EditBlogFormProps) => {
  console.log(blog);
  const router = useRouter();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FieldType) => {
    setLoading(true);
    console.log(values);
    const response = await fetch(`/api/blog/${blog.id}`, {
      method: "PUT",
      body: JSON.stringify(values),
    });
    if (response.status !== 200) {
      api.error({
        message: "Failed to create blog",
        description: "Please try again later",
      });
      setLoading(false);
      return;
    }

    const data: { id: string } = await response.json();
    console.log(data);
    setLoading(false);
    router.refresh();
    closeModel();
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            title: blog.title,
            author: blog.author,
            tag: blog.tag,
            description: blog.description,
            // split by ; to convert string to array
            keywords: blog.keywords?.split("; "),
            cover_image_url: blog.cover_image_url,
          }}
        >
          <Form.Item<FieldType>
            label="Title"
            name="title"
            layout="vertical"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Blog Title" />
          </Form.Item>
          <Form.Item<FieldType> layout="vertical" label="Author" name="author">
            <Input placeholder="Author name" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Tag"
            name="tag"
            layout="vertical"
            tooltip="This tag will be used for blog content storage routing, as a folder name."
            rules={[{ required: false }]}
          >
            <Input placeholder="Tag for storage routing" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Description"
            name="description"
            layout="vertical"
            tooltip="This description will be used for SEO."
            rules={[{ required: false }]}
          >
            <Input.TextArea placeholder="Description for SEO" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Keywords"
            name="keywords"
            layout="vertical"
            tooltip="These keywords will be used for SEO."
            rules={[{ required: false }]}
          >
            <Select
              mode="tags"
              options={options}
              placeholder="Keywords for SEO"
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Cover Image URL"
            name="cover_image_url"
            layout="vertical"
            tooltip="This image will be used for SEO."
            rules={[{ required: false }]}
          >
            <Input placeholder="Cover image URL for SEO" />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default EditBlogForm;
