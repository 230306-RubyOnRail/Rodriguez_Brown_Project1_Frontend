import { useEffect, useState } from "react";
import { User } from "../models/user";
import { Link } from "react-router-dom";
import UserComponent from "./UserComponent";
import { getListUser } from "../remote/services/users-service";
import Button from '@mui/material/Button';

interface IUserListProps{
    currentUser: User | undefined;

}

export default function UserList(props: IUserListProps){

    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState<User[]>();

    useEffect(() => {
        setIsLoading(true);
        getUsers();
        
    }, [])

    let getUsers = async () =>{
        try{
            let response = await getListUser();

            if (response.status === 200){
                console.log(response.data);
                console.log(response.data.length);
                let Users: User[] = [];
                let i = 0;
                response.data.forEach((usr: any) => {
                    Users[i] = new User(' ', usr.id, usr.admin, usr.name);
                    i++;
                });
                setUserList(Users);
                console.log(UserList);
                setIsLoading(false);
            }
        }
        catch(err){
            console.log(err);
        }
    };
    
    return(

        !props.currentUser?.admin? 
            <div className = 'UserList'>
                <p>You do not have permission to view this page.</p>
            </div>
        :
        
        !isLoading && userList ?

        <div className = 'UserList'>
            
            <Link to="/users/create">
            <Button 
                size = "small"
            >New User
            </Button>
            </Link>
    
        
            <br />
            <ul>
            {
                userList.map((usr: User, key) =>{
                    return (
                        <div key={key}>
                            <UserComponent currentUser={props.currentUser} user={usr} key={key} />
                            <br />
                        </div>
                    );
                })
            }
            </ul>
        </div>
        :
        <div className = 'UserList'>
           <p>Loading...</p>
        </div>

    );

}