interface Props {
  type?: string,
  placeholder: string,
  value: string,
  disabled?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

export default function Input({type = 'text', placeholder, value, disabled, onChange, onKeyDown}: Props) {
  return (
    <input className="form-control" type={type} placeholder={placeholder} value={value} disabled={disabled} onChange={onChange} onKeyDown={onKeyDown} />
  )
}
