import { Reimbursement } from "../models/reimbursement"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deleteReimbursement } from "../remote/services/reimbursements-service";
import { SyntheticEvent, useState } from "react";

interface IReimbursementProps{
    reimbursement: Reimbursement | undefined
}

export default function ReimbursementComponent(props: IReimbursementProps){

    let status:string = "";
    if (props.reimbursement?.status === 1) {
        status = "Pending";
    } else if (props.reimbursement?.status === 2) {
        status = "Approved";
    } else {
        status = "Rejected";
    }

    const [deleted, setDeleted] = useState(false);

    let deleteButton = async (e: SyntheticEvent) => {
      console.log('Reimbursement Hello?');
      if (props.reimbursement !== undefined) {
        try{

          let response = await deleteReimbursement(props.reimbursement.id);
          if (response.status === 200){
            setDeleted(true);
          }
          
        }catch (err){
          console.log(err +" Reimbursement?");
        }
      }
    }


    
    
    //Card 
    return (
      deleted?
      <>
      Reimbursement Deleted !
      </>
      
      :

        <Card sx={{ width: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ID: {props.reimbursement?.id}
            <br/>
            User ID: {props.reimbursement?.user_id}
          </Typography>
          <Typography variant="h5" component="div">
            {status}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Amount: {props.reimbursement?.amount}
          </Typography>
          <Typography variant="body2">
            {props.reimbursement?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Update</Button>
          <Button
            onClick ={deleteButton} // delete button
            type = "submit"
            size = "small"
            >Delete 
          </Button>
          </CardActions>
      </Card>
    );
}

