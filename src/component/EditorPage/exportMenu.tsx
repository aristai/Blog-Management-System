import { useBlogContent } from "../context/BlogContantContext";
import { Button, Dropdown, type MenuProps } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import TurndownService from "turndown";

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
        const articleEl = document.querySelector(".article-page");
        if (!articleEl) {
          alert("Article content not found!");
          return;
        }
        const htmlContent = articleEl.innerHTML;

        // Initialize Turndown service
        const turndownService = new TurndownService();
        const markdownContent = turndownService.turndown(htmlContent);

        const dataStr =
          "data:text/markdown;charset=utf-8," +
          encodeURIComponent(markdownContent);
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${data.title}.md`);
        document.body.appendChild(downloadAnchorNode); // required for Firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      },
    },
    {
      label: <p>HTML format</p>,
      key: "2",
      onClick: () => {
        const articleEl = document.querySelector(".article-page");
        if (!articleEl) {
          alert("Article content not found!");
          return;
        }
        const articleContent = articleEl.innerHTML;

        // Optional: Define a stylesheet URL (if you decide to host your CSS externally)
        // const styleLink = `<link rel="stylesheet" href="https://your-cdn.com/path/to/styles.css">`;

        const htmlDocument = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${data.title}</title>
        </head>
        <body>
          <div class="article-page">
            ${articleContent}
          </div>
        </body>
      </html>
    `;

        const dataStr =
          "data:text/html;charset=utf-8," + encodeURIComponent(htmlDocument);
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${data.title}.html`);
        document.body.appendChild(downloadAnchorNode); // required for Firefox
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
