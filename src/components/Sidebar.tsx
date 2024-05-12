import { PropsWithChildren } from "react";

export default function Sidebar({ children }: PropsWithChildren) {
  return (
    <aside className="min-w-80 z-[999] shadow-lg">
      <h1 className="text-3xl text-primary text-center py-4 font-bold">
        Map Chicago
      </h1>
      {children}
    </aside>
  );
}
