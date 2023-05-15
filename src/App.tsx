import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UserList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res =>
        await res.json()
      )
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      }
      )
      .catch(err => {
        console.error(err)
      })
  }, [])

  /*   const filteredUsers = filterCountry !== null && filterCountry.length > 0
    ? users.filter((user) => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
    : users

  const sortedUsers = sortByCountry
    ? [...filteredUsers].sort((a, b) => { return a.location.country.localeCompare(b.location.country) })
    : filteredUsers */

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.COUNTRY) {
      return [...filteredUsers].sort((a, b) => { return a.location.country.localeCompare(b.location.country) })
    }

    if (sorting === SortBy.NAME) {
      return [...filteredUsers].sort((a, b) => { return a.name.first.localeCompare(b.name.first) })
    }

    if (sorting === SortBy.LAST) {
      return [...filteredUsers].sort((a, b) => { return a.name.last.localeCompare(b.name.last) })
    }

    if (sorting === SortBy.EMAIL) {
      return [...filteredUsers].sort((a, b) => { return a.email.localeCompare(b.email) })
    }

    if (sorting === SortBy.USER) {
      return [...filteredUsers].sort((a, b) => { return a.login.username.localeCompare(b.login.username) })
    }

    return filteredUsers
  }, [filteredUsers, sorting])

  return (
    <>
      <header>
        <h1>Users</h1>
        <button onClick={toggleColors}>
          Style
        </button>
        <button onClick={handleReset}>Reset</button>

        <input type="text" placeholder="Filter by country" onChange={(e) => { setFilterCountry(e.target.value) }} />
        <select onChange={(e) => { handleChangeSort(e.target.value as SortBy) }}>
          <option value={SortBy.NONE}>None</option>
          <option value={SortBy.NAME}>Name</option>
          <option value={SortBy.LAST}>Last Name</option>
          <option value={SortBy.COUNTRY}>Country</option>
          <option value={SortBy.EMAIL}>Email</option>
          <option value={SortBy.USER}>UserName</option>
        </select>
      </header>
      <UserList handleChangeSort={handleChangeSort} handleDelete={handleDelete} showColors={showColors} users={sortedUsers} />
    </>
  )
}

export default App
