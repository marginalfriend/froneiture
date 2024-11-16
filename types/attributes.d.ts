declare global {
	type ButtonVariants = "primary" | "secondary"

	interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
		variant?: ButtonVariants;
		children?: React.ReactNode
	}
}

export { }