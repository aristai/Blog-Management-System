/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Form,
  Input,
  Select,
  Button,
  Spin,
  notification,
  Upload,
  type UploadFile,
} from "antd";
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
  cover_image_url?: UploadFile[];
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

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList || [];
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log(values);
    if ((values.cover_image_url ?? []).length > 1) {
      api.error({
        message: "Please upload only one image",
      });
      setLoading(false);
      return;
    }
    const response = await fetch(`/api/blog/${blog.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: values.title,
        author: values.author,
        tag: values.tag,
        description: values.description,
        keywords: values.keywords,
        cover_image_url: values.cover_image_url?.[0]?.url,
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
          onSubmitCapture={() => console.log("Submiting")}
          onFinish={handleSubmit}
          initialValues={{
            title: blog.title,
            author: blog.author,
            tag: blog.tag,
            description: blog.description,
            // split by ; to convert string to array
            keywords: blog.keywords?.split("; "),
            cover_image_url: [
              {
                uid: "1",
                name: blog.title + "blog cover",
                status: "done",
                url: blog.cover_image_url,
              },
            ],
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
            label="Tag (news or blog)"
            name="tag"
            layout="vertical"
            tooltip="This tag will be used for blog content storage routing, as a folder name."
            rules={[{ required: true }]}
          >
            <Input placeholder="Tag for storage routing; Must be news or blog." />
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
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: false }]}
          >
            <Upload.Dragger
              name="file"
              action="/api/uploadFile?source=editorjs" // Your API endpoint for file upload
              listType="picture"
              multiple={false}
              onChange={(info) => {
                const { status, response } = info.file;
                if (status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (status === "done") {
                  api.success({
                    message: `${info.file.name} file uploaded successfully.`,
                  });
                  console.log(response);
                  if (response && response.success) {
                    // Update the form field with the returned URL
                    form.setFieldsValue({
                      cover_image_url: [
                        {
                          uid: info.file.uid,
                          name: info.file.name,
                          status: "done",
                          url: response.file.url,
                        },
                      ],
                    });
                  }
                } else if (status === "error") {
                  api.error({
                    message: `${info.file.name} file upload failed.`,
                  });
                }
              }}
              onDrop={(e) => {
                console.log("Dropped files", e.dataTransfer.files);
              }}
            >
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single upload. Drag and drop a file or click to
                select one.
              </p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item<FieldType> label={null}>
            <Button
              type="primary"
              htmlType="submit"
              block
              onClick={() => console.log("Submit")}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default EditBlogForm;
