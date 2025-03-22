import { useState } from "react";
import { Button, notification } from "antd";
import { useBlogContent } from "../context/BlogContantContext";

const SaveButton = () => {
  const [loading, setLoading] = useState(false);
  const { data, setData } = useBlogContent();
  const [api, contextHolder] = notification.useNotification();

  const handleSave = async () => {
    setLoading(true);
    const saveContent = await fetch(`/api/blog/${data.id}`, {
      method: "POST",
      body: JSON.stringify({tag: data.tag, content: data.blocks}),
    });
    const response = await fetch(`/api/blog/${data.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...data, status: "draft" }),
    });
    if (response.status !== 200 || saveContent.status !== 200) {
      api.error({
        message: "Failed to save",
        description: "Please try again later",
      });
      setLoading(false);
      return;
    }
    setData({ ...data, status: "draft" });
    setLoading(false);
    api.success({
      message: "Saved as draft",
    });
  };

  return (
    <>
      {contextHolder}
      <Button onClick={handleSave} loading={loading}>
        Save
      </Button>
    </>
  );
};

export default SaveButton;
