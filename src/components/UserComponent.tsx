import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deleteUser} from "../remote/services/users-service";
import { SyntheticEvent, useState} from "react";
import { User } from "../models/user";


interface IUserProps{
    user: User | undefined;
    currentUser: User | undefined;
}

export default function UserComponent(props: IUserProps){


    const [deleted, setDeleted] = useState(false);
    
    let deleteButton = async (e: SyntheticEvent) => {
      console.log('Hello User');
      if (props.user !== undefined) {
        try{

          let response = await deleteUser(props.user.user_id);
          if (response.status === 200){
            setDeleted(true);
          }
          
        }catch (err){
          console.log(err +" Users");
        }
      }
    }
        
    //Card 
    return (
      deleted?
      <>
      User deleted!
      </>
      
      : props.currentUser?.admin?

        <Card sx={{ width: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ID: {props.user?.user_id}
            </Typography>       
          <Typography variant="h5" component="div">
            {props.user?.name}
          </Typography>
          <Typography variant="body2">
            {props.user?.admin? 'Manager' : 'Employee'}            
                       
          </Typography>
        </CardContent>
        <CardActions>

          <Button
            onClick ={deleteButton} // delete button
            type = "submit"
            size = "small"
          >Delete 
          </Button>
          </CardActions>
      </Card>
      :
      <></>
    );
}

