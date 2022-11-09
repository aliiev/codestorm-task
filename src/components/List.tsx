import { ITask } from '../api'

interface Props {
  items: ITask[],
  onDelete: (id: ITask['id']) => void
}

export default function List({items, onDelete}: Props) {
  return (
    <ol className="list">
      {!items.length && <span className="list-message">Here's empty for now :( <br/> Start adding tasks using form below</span>}

      {items.map(item => (
        <li key={item.id} className="list-item">
          {item.text}
          <button className="btn-delete" onClick={() => onDelete(item.id)}>
            ☓
          </button>
        </li>
      ))}
    </ol>
  )
}
