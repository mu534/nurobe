import React from "react";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-800",
    "checked-in": "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-2 py-1 rounded text-sm font-semibold ${
        colors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};
