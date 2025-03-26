"use client";
import Image from "next/image";
import Link from "next/link";
import ExportMenu from "./exportMenu";
import dynamic from "next/dynamic";
const EditableTitle = dynamic(() => import("./TitleEdition"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-10 rounded animate-pulse bg-gray-300" />
  ),
});
const TrackSave = dynamic(() => import("./trackSave"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-8 rounded animate-pulse bg-gray-300" />
  ),
});
const TrackStatus = dynamic(() => import("./trackStatus"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-8 rounded animate-pulse bg-gray-300" />
  ),
});
const SaveButton = dynamic(() => import("./SaveButton"), {
  loading: () => (
    <div className="w-full h-full rounded animate-pulse bg-gray-300" />
  ),
});
const PublishButton = dynamic(() => import("./PublishButton"), {
  loading: () => (
    <div className="w-full h-full rounded animate-pulse bg-gray-300" />
  ),
});

const EditorPageHeader = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image
            src={
              process.env.NEXT_PUBLIC_CDN_URL +
              "/assets/logos/logo_wiz_emblem.webp"
            }
            width={128}
            height={33}
            alt="AristAI Logo"
          />
        </Link>
        <div className="w-40">
          <TrackSave />
        </div>
      </div>

      <div className="min-w-64 max-w-128 w-full">
        <EditableTitle />
      </div>

      <div className="flex items-center space-x-4">
        <TrackStatus />
        <SaveButton />
        <PublishButton />
        <ExportMenu />
      </div>
    </div>
  );
};

export default EditorPageHeader;
