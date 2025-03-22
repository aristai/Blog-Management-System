
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import RawTool from "@editorjs/raw";
// import SimpleImage from "@editorjs/simple-image";
// import SimpleImage from 'simple-image-editorjs';
// import ImageTool from '@editorjs/image';
import InlineImage from 'editorjs-inline-image';
import Quote from '@editorjs/quote';
import EditorjsList from '@editorjs/list';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';

export const EDITOR_JS_TOOLS = {
  header: Header,
  delimiter: Delimiter,
  raw: RawTool,
  image: InlineImage,
  quote: Quote,
  list: EditorjsList,
  table: Table,
  code: CodeTool
};