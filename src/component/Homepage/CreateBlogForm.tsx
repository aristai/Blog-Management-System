import { Form, Input, Select, Button, Spin, notification } from "antd";
import type { SelectProps } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { createBlog } from "@/utils/serverActions";

const options: SelectProps["options"] = [];

type FieldType = {
  title?: string;
  author?: string;
  tag?: string;
  description?: string;
  keywords?: string[];
  cover_image_url?: string;
};

interface CreateBlogFormProps {
  closeModel: () => void;
}

const CreateBlogForm = ({ closeModel }: CreateBlogFormProps) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: FieldType) => {
    setLoading(true);
    console.log(values);
    const created_at = Date.now();
    const response = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        created_at,
      }),
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
    router.push(`/editor/${data.id}`);
    closeModel();
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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

export default CreateBlogForm;
