import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                <Link to='/'>Home</Link>&nbsp;&nbsp;&nbsp;
                <Link to='/reimbursements'>Reimbursements</Link>&nbsp;&nbsp;&nbsp;
                <Link to="/login">Login</Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
    );
};