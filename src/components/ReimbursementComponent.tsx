import { Reimbursement } from "../models/reimbursement"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deleteReimbursement, updateReimbursementAdmin, updateReimbursement} from "../remote/services/reimbursements-service";
import { SyntheticEvent, useState} from "react";
import { User } from "../models/user";


interface IReimbursementProps{
    reimbursement: Reimbursement | undefined
    currentUser: User | undefined
}

export default function ReimbursementComponent(props: IReimbursementProps){


    const [deleted, setDeleted] = useState(false);
    const [description, setDescription] = useState(props.reimbursement?.description);
    const [amount, setAmount] = useState(props.reimbursement?.amount);
    const [status, setStatus] = useState(props.reimbursement?.status);      
    const [myStatus, setMyStatus] = useState(() => {
            if (status === 1) {
              return "Pending";
          } else if (status === 2) {
              return "Approved";
          } else if (status === 3) {
              return "Rejected";
          }
            else{
              return "Error";
            }
          });

     
    // let updateStatus = () => {
    //         if (status === 1) {
    //           setMyStatus("Pending");
    //       } else if (status === 2) {
    //           setMyStatus("Approved");
    //       } else {
    //           setMyStatus("Rejected");
    //       }
    //       }
  
    let updateDescription = (e:SyntheticEvent) => {
      setDescription((e.target as HTMLInputElement).value);

    }
    let updateAmount = (e:SyntheticEvent) => {
      setAmount(parseInt((e.target as HTMLInputElement).value));

    }


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
    let updateButton = async (e: SyntheticEvent) => {
      
      if (props.reimbursement !== undefined && description !== undefined && amount !== undefined) {           
          try{
          
            let response = await updateReimbursement(props.reimbursement.id, {description, amount});
            if (response.status === 200){
              console.log("thousand"); //Updating 
            }
            
          }catch (err){
            console.log(err +" Reimbursement?");
          }
        
      }
    }

    let approveButton = async (e: SyntheticEvent) => {
      
      if (props.reimbursement !== undefined && status !== undefined ) {           
          try{
            
            let response = await updateReimbursementAdmin(props.reimbursement.id, {status:2});
            if (response.status === 200){
              setStatus(2);
              setMyStatus("Approved");
              console.log("approve"); //Updating 
            }
            
          }catch (err){
            console.log(err +" Reimbursement?");
          }
        
      }
    }

    let denyButton = async (e: SyntheticEvent) => {
      
      if (props.reimbursement !== undefined && status !== undefined) {           
          try{
                        
            let response = await updateReimbursementAdmin(props.reimbursement.id, {status:3});
            if (response.status === 200){
              setStatus(3);
              setMyStatus("Denied");
              console.log("deny"); //Updating 
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
      
      : props.currentUser?.admin?

        <Card sx={{ width: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ID: {props.reimbursement?.id}
            <br/>
            Name: {props.reimbursement?.name}
          </Typography>       
          <Typography variant="h5" component="div">
            {myStatus}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Amount: {props.reimbursement?.amount}
          </Typography>
          <Typography variant="body2">
            Description: {props.reimbursement?.description}              
                       
          </Typography>
        </CardContent>
        <CardActions>

          <Button size="small"
            onClick ={approveButton} // update button   
          >Approve
          </Button>
          <Button
            onClick ={denyButton} // delete button
            type = "submit"
            size = "small"
          >Deny 
          </Button>
          <Button
            onClick ={deleteButton} // delete button
            type = "submit"
            size = "small"
          >Delete 
          </Button>
          </CardActions>
      </Card>
      :
        <Card sx={{ width: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ID: {props.reimbursement?.id}
            <br/>
            Name: {props.reimbursement?.name}
          </Typography>       
          <Typography variant="h5" component="div">
            {myStatus}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Amount: <input
              type = "text"
              id = "Amount"
              placeholder = {props.reimbursement?.amount.toString()}
              onChange = {updateAmount}
            />
          </Typography>
          <Typography variant="body2">
            <input
              type = "text"
              id = "Description"
              placeholder = {props.reimbursement?.description}
              onChange = {updateDescription}              
            />  
            
          </Typography>
        </CardContent>
        <CardActions>

          <Button size="small"
            onClick ={updateButton} // update button   
          >Update
          </Button>
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

