import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box, Divider, IconButton } from '@mui/material'
import { User as UserType } from '../interfaces'
import DeleteIcon from '@mui/icons-material/Delete';

interface UserProps {
    user: UserType
    onRemoveUser: (userId: number) => void;
}

export const User = ({ user, onRemoveUser }: UserProps) => {
    const { id, name, email, phone } = user;
    const stringAvatar = (name: string) => {
        if (name.includes(' ')) {
            const [firstName, lastName] = name.split(' ');
            return {
                children: `${firstName[0]}${lastName[0]}`,
            };
        } else {
            return {
                children: `${name[0]}`,
            };
        }
    }

    return (
        <Box>
            <ListItem alignItems="flex-start"
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => onRemoveUser(id)}>
                        <DeleteIcon />
                    </IconButton>
                }>
                <ListItemAvatar>
                    <Avatar {...stringAvatar(name)} />
                </ListItemAvatar>
                <ListItemText>
                    <Typography  variant="subtitle1">
                        {name}
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                        >
                            {`Email address: ${email}`}
                        </Typography>
                        <Typography  variant="body2">
                        
                        {`Phone number: ${phone}`}
                    </Typography>
                    </Box>
                </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
        </Box >
    )
}
