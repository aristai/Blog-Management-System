
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import RawTool from "@editorjs/raw";
// import SimpleImage from "@editorjs/simple-image";
// import SimpleImage from 'simple-image-editorjs';
import ImageTool from '@editorjs/image';
// import InlineImage from 'editorjs-inline-image';
import Quote from '@editorjs/quote';
import EditorjsList from '@editorjs/list';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';

export const EDITOR_JS_TOOLS = {
  header: Header,
  delimiter: Delimiter,
  raw: RawTool,
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: process.env.NEXT_PUBLIC_DOMAIN + '/api/uploadFile?source=upload', // Your backend file uploader endpoint
        byUrl: process.env.NEXT_PUBLIC_DOMAIN + '/api/fetchUrl', // Your endpoint that provides uploading by Url
      }
    }
  },
  quote: Quote,
  list: EditorjsList,
  table: Table,
  code: CodeTool
};