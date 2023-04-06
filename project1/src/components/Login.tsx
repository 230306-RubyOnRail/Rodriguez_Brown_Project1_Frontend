import { SyntheticEvent, useState } from "react";
import { User } from "../models/user";
import { Navigate } from 'react-router-dom'

interface ILoginProps{
    currentUser: User | undefined;
    setCurrentUser: (newUser: User) => void;
}

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
                let response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json'
                        },
                    body: JSON.stringify({username, password})
                });
                if (response.status === 201) {
                    props.setCurrentUser(await response.json());
                    console.log(props.currentUser);
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
        <p>Login</p>
        <div>
            <input type="text" id="login-username" placeholder="Username" onChange={updateUsername}/>
            <input type="text" id="login-password" placeholder="Password" onChange={updatePassword}/>
            <button id="login-button" onClick={submitLogin}>Submit</button>
            <p>{errorMessage}</p>
        </div>
        </>
    );
}