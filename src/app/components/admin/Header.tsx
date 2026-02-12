import type { ReactNode } from "react";

export function Header({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <header className="bg-white shadow-sm">
      <div className="px-8 py-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-gray-900">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        {action && <div>{action}</div>}
      </div>
    </header>
  );
}
// Usage:
// <Header
//   title="Payments & Reports"
//   subtitle="Financial overview and payment history"
//   action={<button className="flex items-center gap-2 ..."><Download /> Export Report</button>}
// />
