import { useBlogContent } from "../context/BlogContantContext";
import { Button, Dropdown, type MenuProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const ExportMenu = () => {
  const { data } = useBlogContent();

  const items: MenuProps["items"] = [
    {
      label: <p>JSON format</p>,
      key: "0",
      onClick: () => {
        const dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${data.title}.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      },
    },
    {
      label: <p>Markdown format</p>,
      key: "1",
      onClick: () => {
        const dataStr =
          "data:text/markdown;charset=utf-8," +
          encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${data.title}.md`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      },
    },
    {
      label: <p>HTML format</p>,
      key: "2",
      onClick: () => {
        const dataStr =
          "data:text/html;charset=utf-8," +
          encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${data.title}.html`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button type="primary" icon={<DownloadOutlined />}>
        Export
      </Button>
    </Dropdown>
  );
};

export default ExportMenu;
