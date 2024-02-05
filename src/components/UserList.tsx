import { User as UserType } from '../interfaces'
import { List, styled } from '@mui/material'
import { User } from './User'

interface UserListProps {
    users: UserType[] | null,
    onRemoveUser: (userId: number) => void;
}

const StyledList = styled(List)(({ theme }) => ({
    width: "100%",
    backgroundColor: theme.palette.background.paper
}));

export const UserList = ({ users, onRemoveUser }: UserListProps) => {
    return (
        <StyledList>
            {users && users.map((user) =>
                <User key={user.id} user={user} onRemoveUser={onRemoveUser} />
            )}
        </StyledList>
    )
}
