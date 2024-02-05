import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEventHandler } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "10%",
}));

const SearchIconWrapper = styled('div')(() => ({
  padding: "0px 16px",
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: "10px 32px 10px 52px",
  },
}));

interface SearchAppBarProps {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  search: string
}

export const SearchAppBar = ({ onChange, search }: SearchAppBarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onChange={onChange}
            required
            fullWidth
            value={search}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}