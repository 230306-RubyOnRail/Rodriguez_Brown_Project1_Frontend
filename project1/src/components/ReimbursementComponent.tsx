import { Reimbursement } from "../models/reimbursement"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    

    return (
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
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    );
}