import { JSX } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { signIn } from "next-auth/react"


type Props = {
  is_auth: boolean;
};

const Header = ({ is_auth }: Props): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1, mb: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Payment History
          </Typography>
          <Button color="inherit" onClick={() => signIn("google")} disabled={is_auth}>Google認証</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;