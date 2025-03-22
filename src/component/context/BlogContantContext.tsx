/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  JSX,
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";

interface BlogContentContextProps {
  data: any;
  setData: (data: any) => void;
}

export const blogContentContext = createContext<BlogContentContextProps>({
  data: {},
  setData: () => {},
});

export const useBlogContent = (): BlogContentContextProps => {
  const context = useContext(blogContentContext);

  if (context === undefined) {
    throw new Error("useBlogContent must be used within a BlogContentProvider");
  }

  return context;
};

interface BlogContentProviderProps {
  children: ReactNode;
}

/**
 * AddCourse context provider
 * @param {BlogContentProviderProps} props - React props
 * @return {JSX.Element}
 */
export function BlogContentProvider({
  children,
}: BlogContentProviderProps): JSX.Element {
  const [data, setData] = useState<any>({});

  const value = useMemo(() => ({ data, setData }), [data, setData]);

  return (
    <blogContentContext.Provider value={value}>
      {children}
    </blogContentContext.Provider>
  );
}
