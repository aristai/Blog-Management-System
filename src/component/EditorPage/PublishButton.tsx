import { useState } from "react";
import { Button, notification } from "antd";
import { useBlogContent } from "../context/BlogContantContext";

const PublishButton = () => {
  const [loading, setLoading] = useState(false);
  const { data, setData } = useBlogContent();
  const [api, contextHolder] = notification.useNotification();

  const handlePublish = async () => {
    setLoading(true);
    const saveContent = await fetch(`/api/blog/${data.id}`, {
      method: "POST",
      body: JSON.stringify({tag: data.tag, content: data.blocks}),
    });
    const saveResponse = await fetch(`/api/blog/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const publishResponse = await fetch(`/api/blog/${data.id}/publish`);
    if (saveContent.status !== 200 || saveResponse.status !== 200 || publishResponse.status !== 200) {
      api.error({
        message: "Failed to publish",
        description: "Please try again later",
      });
      setLoading(false);
      return;
    }
    setData({ ...data, status: "published" });
    setLoading(false);
    api.success({
      message: "Published",
    });
  };

  return (
    <>
      {contextHolder}
      <Button onClick={handlePublish} loading={loading} type="primary">
        Publish
      </Button>
    </>
  );
};

export default PublishButton;
