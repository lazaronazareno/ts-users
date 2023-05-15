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

  const toggleSortByCountry = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorting)
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

    return filteredUsers
  }, [filteredUsers, sorting])

  return (
    <>
      <h1>Prueba tecnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'Orden por defecto' : 'Ordenar por pais'}
        </button>
        <button onClick={handleReset}>Resetear estado</button>

        <input type="text" placeholder="Filtrar por Pais" onChange={(e) => { setFilterCountry(e.target.value) }} />
      </header>
      <UserList handleChangeSort={handleChangeSort} handleDelete={handleDelete} showColors={showColors} users={sortedUsers} />
    </>
  )
}

export default App
