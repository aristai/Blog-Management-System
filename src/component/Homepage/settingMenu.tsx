"use client";
import { Button, Dropdown, type MenuProps, Modal, notification } from "antd";
import {
  DeleteOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SettingMenu = ({ id }: { id: string }) => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (e: {
    domEvent: { stopPropagation: () => void };
  }) => {
    // Stop event propagation to prevent unwanted side-effects from Dropdown
    e.domEvent.stopPropagation();
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    const response = await fetch(`/api/blog/${id}`, {
      method: "DELETE",
    });
    if (response.status !== 200) {
      api.error({
        message: "Failed to delete blog",
        description: "Please try again later",
      });
    } else {
      api.success({
        message: "Blog deleted successfully",
      });
    }
    setLoading(false);
    setIsModalOpen(false);
    router.refresh();
  };

  const handleCancel = () => {
    console.log("Delete canceled");
    setIsModalOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      label: <p>Edit</p>,
      icon: <EditOutlined />,
      key: "0",
      onClick: () => {
        router.push(`/editor/${id}`);
      },
    },
    {
      label: <p>Delete</p>,
      icon: <DeleteOutlined />,
      key: "1",
      onClick: handleDeleteClick,
      danger: true,
    },
  ];

  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text" icon={<SettingOutlined />} />
      </Dropdown>
      <Modal
        open={isModalOpen}
        title="Confirm Delete"
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
        okType="danger"
        centered
        loading={loading}
      >
        <p>Are you sure you want to delete this blog?</p>
      </Modal>
    </>
  );
};

export default SettingMenu;
