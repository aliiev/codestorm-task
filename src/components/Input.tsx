interface Props {
  type?: string,
  placeholder: string,
  value: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
}

export default function Input({type = 'text', placeholder, value, onChange, onKeyDown}: Props) {
  return (
    <input className="form-control" type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown} />
  )
}
