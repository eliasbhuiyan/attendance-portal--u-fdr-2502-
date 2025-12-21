import React from "react";

const baseStyles =
  "inline-flex items-center cursor-pointer justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-200",
  danger:
    "text-white bg-red-600 hover:bg-red-700 focus:ring-gray-400 disabled:text-gray-400 disabled:border-gray-300",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-2.5 text-lg",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}) => {
  const styles = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? "cursor-not-allowed opacity-70" : ""}
    ${className}
  `;

  return (
    <button className={styles} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
