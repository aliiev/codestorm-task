interface Props {
  type?: string,
  placeholder: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({type = 'text', placeholder, onChange}: Props) {
  return (
    <input className="form-control" type={type} placeholder={placeholder} onChange={onChange} />
  )
}
