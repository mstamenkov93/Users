import { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, CircularProgress, Pagination, Typography } from '@mui/material'
import { Layout, SearchAppBar, UserList, AddUserForm, ErrorHandler } from './components'
import { User } from './interfaces'
import { api } from './api'
import { useError } from './providers'

const limitPerPage = 10

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchUser, setSearchUsers] = useState<User[]>([]);
  const { handleError, errorMessage, clearError } = useError();

  const calculatedTotalPages = (currentCountPages: number) => {
    return Math.ceil(currentCountPages / limitPerPage);
  }

  const checkForName = (userName: string) => {
    const normalizedQuery = searchQuery.toLowerCase();
    return userName.toLowerCase().includes(normalizedQuery)
  }

  useEffect(() => {
    const userData = async () => {
      try {
        setIsLoading(true);
        const response = await api.fetchAllUsers();
        setUsers(response);
        const totalCountPages = calculatedTotalPages(response.length);
        setTotalPages(totalCountPages);
        setIsLoading(false);
      } catch (error) {
        handleError("Failed to fetch users from the API");
        setIsLoading(false);
      }
    };

    userData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;
    return users.slice(startIndex, endIndex);
  }, [page, users]);

  const getFilteredUsers = useCallback((id?: number) => {
    if (id) {
      return searchUser.filter(user => user.id !== id);
    }
    return users.filter(user => checkForName(user.name))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchUser, users]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: SetStateAction<number>) => {
    setPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filteredUsers = getFilteredUsers()
    setSearchUsers(filteredUsers)
  };

  const handleUserAdded = (user: User) => {
    const updatedUsers = [user, ...users];
    const updatedSearchedUsers = [user, ...searchUser];
    setUsers(updatedUsers);
    if (searchUser.length > 0 && checkForName(user.name)) {
      setSearchUsers(updatedSearchedUsers)
    }
    const totalCountPages = calculatedTotalPages(updatedUsers.length);
    setTotalPages(totalCountPages);
  };

  const handleUserRemove = async (id: number) => {
    try {
      await api.removeUser(id)
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      if (searchUser.length > 0) {
        const filteredUsers = getFilteredUsers(id)
        setSearchUsers(filteredUsers)
      }
      const totalCountPages = calculatedTotalPages(updatedUsers.length);
      setTotalPages(totalCountPages);
    } catch (error) {
      handleError("Failed to remove user");
    }
  };

  const renderSearchedResult = () => {
    return (
      searchUser.length > 0 ?
        < UserList users={searchUser} onRemoveUser={handleUserRemove} /> : <Typography>No users found</Typography>
    )
  }

  const handleCloseSnackbar = () => {
    clearError();
  };

  return (
    <>
      <SearchAppBar search={searchQuery} onChange={handleSearchChange} />
      <Layout>
        {isLoading ?
          <CircularProgress /> :
          <>
            <Box>
              {searchQuery.length > 0 ?
                renderSearchedResult()
                :
                <>
                  <UserList users={paginatedUsers} onRemoveUser={handleUserRemove} />
                  <Box display="flex" justifyContent="center" marginTop="12px">
                    {paginatedUsers.length ? <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      variant="outlined"
                      color="primary" />
                      : null}
                  </Box>
                </>
              }
            </Box>
            <AddUserForm onUserAdded={handleUserAdded} />
          </>
        }
        <ErrorHandler errorMessage={errorMessage} handleCloseSnackbar={handleCloseSnackbar} />
      </Layout>
    </>
  )
}

export default App
