import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { User } from '../models/user';

interface INavProps{
  currentUser: User | undefined;
}

export default function Nav(props:INavProps) {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                <Link to='/'>Home</Link>&nbsp;&nbsp;&nbsp;
                <Link to='/reimbursements'>Reimbursements</Link>&nbsp;&nbsp;&nbsp;
                 {props.currentUser?.admin ? <>  <Link to='/users'>Users</Link> &nbsp;&nbsp;&nbsp; </> : <></>}              
                <Link to="/login">Login</Link>
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
    );
};

//