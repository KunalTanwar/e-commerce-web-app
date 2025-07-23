import type { ButtonProps } from "@/types"

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = "button",
    disabled = false,
}) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button
