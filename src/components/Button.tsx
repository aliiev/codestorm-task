interface Props {
  title: string,
  color?: string,
  disabled?: boolean,
  onClick?: () => void
}

export default function Button({title, color, disabled, onClick}: Props) { 
  return (
    <button
      className={`btn ${color ? 'btn-' + color : ''}`}
      disabled={disabled}
      onClick={!disabled ? onClick : () => false}
    >
      {title}
    </button>
  )
}
