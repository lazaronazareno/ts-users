import { SortBy, type User } from '../types.d'
import UserComponent from './User'

interface Props {
  users: User[]
  showColors: boolean
  handleDelete: (email: string) => void
  handleChangeSort: (sort: SortBy) => void
}

export function UserList({ users, showColors, handleDelete, handleChangeSort }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>User</th>
          <th className='pointer' onClick={() => { handleChangeSort(SortBy.NAME) }}>Name</th>
          <th className='pointer' onClick={() => { handleChangeSort(SortBy.LAST) }}>Last Name</th>
          <th className='pointer' onClick={() => { handleChangeSort(SortBy.COUNTRY) }}>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#161616' : '#2c2c2c'
            const color = showColors ? backgroundColor : 'transparent'

            return (
              <UserComponent user={user} handleDelete={handleDelete} color={color} key={user.email} />
            )
          }
          )
        }
      </tbody>
    </table>
  )
}
