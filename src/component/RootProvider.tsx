"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";

import "@ant-design/v5-patch-for-react-19";

export function RootProvider(props: { children: React.ReactNode }) {
  return <AntdRegistry>{props.children}</AntdRegistry>;
}
