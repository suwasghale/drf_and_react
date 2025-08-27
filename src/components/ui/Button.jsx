import clsx from "clsx";

const baseStyles =
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

const variants = {
  default: "bg-slate-800 hover:bg-slate-700 text-white",
  outline:
    "border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900",
  ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
};

const sizes = {
  sm: "h-8 px-3",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-base",
};

const Button = ({ children, variant = "default", size = "md", className, ...props }) => {
  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
