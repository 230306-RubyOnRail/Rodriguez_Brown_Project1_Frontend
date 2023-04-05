import { SyntheticEvent, useState } from "react";
import { User } from "../models/user";

export default function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [principal, setPrincipal] = useState<User>();

    let updateUsername = (e: SyntheticEvent) => {
        setUsername((e.target as HTMLInputElement).value);
    }
    let updatePassword = (e: SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value);
    }
    let submitLogin = async (e: SyntheticEvent) => {
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
                    setPrincipal(await response.json());
                    console.log(principal);
                } else {
                    alert('Username and/or password incorrect. Please try again.');
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("Usernames must be between 4 and 16 characters. Passwords must be between 8 and 20 characters.")
        }
    }

    return (
        principal ?
        <>
            Hello! Your user_id: {principal.user_id}
        </>
        :
        <>        
        <p>Login</p>
        <div>
            <input type="text" id="login-username" placeholder="Username" onChange={updateUsername}/>
            <input type="text" id="login-password" placeholder="Password" onChange={updatePassword}/>
            <button id="login-button" onClick={submitLogin}>Submit</button>
        </div>
        </>
    );
}