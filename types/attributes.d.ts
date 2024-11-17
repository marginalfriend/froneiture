declare global {
	type ButtonVariants = "primary" | "secondary" | "ghost"

	interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
		variant?: ButtonVariants;
		children?: React.ReactNode
	}
}

export { }