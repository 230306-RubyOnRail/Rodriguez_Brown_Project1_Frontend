import { SyntheticEvent, useState } from "react";
import { User } from "../models/user";
import { Navigate } from 'react-router-dom'
import { authenticate } from "../remote/services/session-service";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface ILoginProps{
    currentUser: User | undefined;
    setCurrentUser: (newUser: User) => void;
}

const theme = createTheme();

export default function Login(props: ILoginProps){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [redirect, setRedirect] = useState(false);

    let updateUsername = (e: SyntheticEvent) => {
        setUsername((e.target as HTMLInputElement).value);
    }
    let updatePassword = (e: SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value);
    }
    
    let submitLogin = async (e: SyntheticEvent) => {
        setErrorMessage('');
        if (username && password && username.length > 3 && username.length < 17 && password.length > 7 && password.length < 21) {
            console.log("success");
            try {
                let response = await authenticate({username, password});

                if (response.status === 201) {
                    props.setCurrentUser(response.data);
                    sessionStorage.setItem('token', response.data.token);
                    setRedirect(true);
                } else {
                    setErrorMessage('Username and/or password incorrect. Please try again.');
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            setErrorMessage("Usernames must be between 4 and 16 characters. Passwords must be between 8 and 20 characters.")
        }
    }

    return (     
        props.currentUser && redirect ?
        <Navigate to='/' />
        :
        <>
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
            <input type="text" id="Username" placeholder="Username" onChange={updateUsername}/>
            <br />
            <input type="text" id="Password" placeholder="Password" onChange={updatePassword}/>
              <Button
                onClick={submitLogin}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            <p>{errorMessage}</p>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
        </>

    );
}