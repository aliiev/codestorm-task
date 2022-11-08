interface Props {
  type?: string,
  placeholder: string,
  value: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({type = 'text', placeholder, value, onChange}: Props) {
  return (
    <input className="form-control" type={type} placeholder={placeholder} value={value} onChange={onChange} />
  )
}
