"use client";

type RouteLoaderProps = {
  visible: boolean;
};

export function RouteLoader({ visible }: RouteLoaderProps) {
  return (
    <div
      aria-hidden={!visible}
      aria-live="polite"
      className={visible ? "route-loader route-loader-visible" : "route-loader"}
      role="status"
    >
      <div className="route-loader-panel">
        <div aria-hidden="true" className="route-loader-spinner" />
        <p>Loading…</p>
      </div>
    </div>
  );
}
