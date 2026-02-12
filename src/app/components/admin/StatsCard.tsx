import type { ReactNode } from "react";

interface StatsCardProps {
  icon: ReactNode;
  value: number | string;
  label: string;
  badge?: string | number;
  badgeColor?: string;
  bgColor?: string;
  color?: string;
}

export function StatsCard({
  icon,
  value,
  label,
  badge,
  badgeColor,
  bgColor,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${bgColor || "bg-blue-100"} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
        {badge && (
          <span
            className={`text-xs px-2 py-1 rounded-full ${badgeColor || "bg-green-100 text-green-800"}`}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="text-3xl mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
