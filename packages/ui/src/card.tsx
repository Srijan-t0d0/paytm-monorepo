import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-4">
      <h1 className="text-xl dark:text-slate-100 border-b pb-2">{title}</h1>
      {children}
    </div>
  );
}
