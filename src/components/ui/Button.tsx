import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
	fullWidth?: boolean;
};

const variantStyles = {
	primary: "bg-[#1C221E] text-white hover:bg-[#1C221E]/80 focus:ring-[#1C221E]",
	secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
	outline:
		"bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
	ghost:
		"bg-transparent text-[#3E424B] hover:bg-[#3E424B]/30 border-2 border-[#000000] focus:ring-[#000000]",
	link: "bg-transparent text-blue-600 hover:underline p-0 h-auto",
};

const sizeStyles = {
	sm: "px-3 py-1.5 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-6 py-3 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className = "",
			variant = "primary",
			size = "md",
			isLoading = false,
			fullWidth = false,
			disabled,
			...props
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
				className={`inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
					variantStyles[variant]
				} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${
					(disabled || isLoading) && "opacity-70 cursor-not-allowed"
				} ${className}`}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading ? (
					<>
						<svg
							className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						<span>Loading...</span>
					</>
				) : (
					children
				)}
			</button>
		);
	},
);

Button.displayName = "Button";

export default Button;
