import { User } from '../models/user';
import {createReimbursement} from '../remote/services/reimbursements-service'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';


interface IReimbursementCreateProps{
    currentUser: User | undefined;
}

export default function ReimbursementCreate(props: IReimbursementCreateProps){

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [success, setSuccess] =useState(false);



    let updateDescription = (e:SyntheticEvent) => {
        setDescription((e.target as HTMLInputElement).value);
  
    }
    let updateAmount = (e:SyntheticEvent) => {
        setAmount(((e.target as HTMLInputElement).value));
  
    }
    
    let submitButton = async (e: SyntheticEvent) => {
      
        if (description !== undefined && amount !== undefined) {           
            try{
            
              let response = await createReimbursement({description, amount: parseInt(amount)});
              if (response.status === 200){
                setSuccess(true); 
                console.log('reimbursement created successfully')
              }
              
            }catch (err){
              console.log(err +" Reimbursement?");
            }
          
        }
      }



    return( 

        props.currentUser?.admin?
            <>
            Managers are not allowed to submit reimbursements.
            </>
        :
            success?
            <Navigate to = '/reimbursements'/>
                
            
            :

        <Card sx={{ width: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            New Reimbursement 
            </Typography>       
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Amount: <input
              type = "text"
              id = "Amount"
              placeholder = "100"
              onChange = {updateAmount}
            />
          </Typography>
          <Typography variant="body2">
            <input
              type = "text"
              id = "Description"
              placeholder = "Enter Description"
              onChange = {updateDescription}              
            />  
            
          </Typography>
        </CardContent>
        <CardActions>

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


