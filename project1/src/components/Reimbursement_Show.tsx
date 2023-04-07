import { Reimbursement } from "../models/reimbursement";
import { User } from "../models/user";

interface IReimbursementShowProps{
    currentUser: User | undefined;

}

export default function ReimbursementShow(props: IReimbursementShowProps){

    let getReimbursements = async () =>{
        try{
            let response = await fetch('http://localhost:3000/reimbursements', {
                method: 'GET',
                headers: {'Authorization': "Bearer ${props.currentUser?.token}" }
            });

            if (response.status === 200){
                console.log('Hello from ReimbursementShow');
            }

        }
        catch(err){
            console.log(err);
        }
    };
    
    return(
        <div className = 'ReimbursementList'>
           
        </div>
    );

}