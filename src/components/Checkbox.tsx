interface Props {
  label: string
  checked?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void 
}

export default function Checkbox({label, checked = false, onChange}: Props) {
  return (
    <label className="form-check">
      <span className="form-label">{label}</span>
      <input className="form-input" type="checkbox" defaultChecked={checked} onChange={onChange} />
      <span className="form-checkmark"></span>
    </label>
  )
}
