import React from "react";

interface ActionButtonProps {
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
  title: string;
  description: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const ActionButton = ({
  iconClassName = "",
  iconStyle = {},
  title,
  description,
  onClick,
  children
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-full bg-white rounded-xl shadow-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-xl transition-all duration-300 p-6"
    >
      <div className={`${iconClassName} mb-4`} style={iconStyle}>
        {children}
      </div>
      <h3 className="mb-2 text-center font-semibold text-[#0A2540]">{title}</h3>
      <p className="text-center text-xs text-[#6B7280] leading-relaxed">{description}</p>
    </button>
  );
};

export { ActionButton };
