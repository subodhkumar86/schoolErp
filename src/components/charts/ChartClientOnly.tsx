"use client";

import { useSyncExternalStore, type ReactNode } from "react";

interface ChartClientOnlyProps {
  children: ReactNode;
  className: string;
}

export default function ChartClientOnly({
  children,
  className,
}: ChartClientOnlyProps) {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return <div className={className}>{isMounted ? children : null}</div>;
}
