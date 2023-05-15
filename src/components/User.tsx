import { type User } from '../types'

interface Props {
  user: User
  color: string
  handleDelete: (email: string) => void
}

export default function UserComponent({ user, color, handleDelete }: Props) {
  return (
    <tr className='user' style={{ backgroundColor: color }}>
      <td className='user__user'>
        <img src={user.picture.thumbnail} alt={user.name.title} />
        <div>
          <p>{user.login.username}</p>
          <p>{user.email}</p>
        </div>
      </td>
      <td>
        {user.name.first}
      </td>
      <td>
        {user.name.last}
      </td>
      <td>
        <img
          className='user__flag'
          src={`https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/${user.nat.toLowerCase()}.svg`}
          alt={user.location.country}
        />
      </td>
      <td>
        <button className='user__delete' onClick={() => { handleDelete(user.email) }}>🗑</button>
      </td>
    </tr>
  )
}
