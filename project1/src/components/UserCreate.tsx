import { User } from '../models/user';
import {createUser} from '../remote/services/users-service'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';


interface IUserCreateProps{
    currentUser: User | undefined;
}

export default function UserCreate(props: IUserCreateProps){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [admin, setAdmin] = useState(false);
    const [success, setSuccess] =useState(false);



    let updateUsername = (e:SyntheticEvent) => {
        setUsername((e.target as HTMLInputElement).value);
  
    }
    let updatePassword = (e:SyntheticEvent) => {
        setPassword(((e.target as HTMLInputElement).value));
  
    }
    let updateName = (e:SyntheticEvent) => {
        setName(((e.target as HTMLInputElement).value));
    }

    let updateAdmin = (e:SyntheticEvent) => {
        setAdmin(!admin); // Check box: if true make false.
    }

    let submitButton = async (e: SyntheticEvent) => {
      
        if (username !== undefined && password !== undefined && name !== undefined) {           
            try{
            
              let response = await createUser({username, password, name, admin});
              if (response.status === 200){
                setSuccess(true); 
                console.log('User created successfully')
              }
              
            }catch (err){
              console.log(err +" User?");
            }
          
        }
      }



    return( 

        !props.currentUser?.admin?
            <>
           Only managers are allowed to create Users.
            </>
        :
            success?
            <Navigate to = '/users'/> //'/'users/create
                
            
            :

        <Card sx={{ width: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {admin?
                'Manager'
                  :
                  'Employee'
              }
            </Typography>       
            <Typography variant="body2">
              <input
              type = "text"
              id = "Username"
              placeholder = "Enter Username"
              onChange = {updateUsername}
            />
          </Typography>
          <Typography variant="body2">
            <input
              type = "text"
              id = "Password"
              placeholder = "Enter Password"
              onChange = {updatePassword}              
            />  
            </Typography>
            <Typography variant="body2">
            <input
              type = "text"
              id = "Name"
              placeholder = "Enter Name"
              onChange = {updateName}              
            />  
            </Typography>
            
        </CardContent>
        <CardActions>  
          
          <Button
              onClick ={updateAdmin} // admin button
              size = "small"
            >Change Status 
          </Button>

          <Button
            onClick ={submitButton} // delete button
            type = "submit"
            size = "small"
          >Submit 
          </Button>
          
          </CardActions>
      </Card>

      
    );
}
