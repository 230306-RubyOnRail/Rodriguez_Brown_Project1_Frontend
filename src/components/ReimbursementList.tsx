import { useEffect, useState } from "react";
import { Reimbursement } from "../models/reimbursement";
import { User } from "../models/user";
import { Link } from "react-router-dom";
import ReimbursementComponent from "./ReimbursementComponent";
import { getListReimbursements } from "../remote/services/reimbursements-service";
import Button from '@mui/material/Button';

interface IReimbursementListProps{
    currentUser: User | undefined;

}

export default function ReimbursementList(props: IReimbursementListProps){

    const [isLoading, setIsLoading] = useState(true);
    const [reimbursementList, setReimbursementList] = useState<Reimbursement[]>();

    useEffect(() => {
        setIsLoading(true);
        getReimbursements();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let getReimbursements = async () =>{
        try{
            let response = await getListReimbursements();

            if (response.status === 200){
                let reimbursements: Reimbursement[] = [];
                let i = 0;
                response.data.forEach((reim: any) => {
                    reimbursements[i] = new Reimbursement(reim.id, reim.description, reim.amount, reim.status, reim.name);
                    i++;
                });
                setReimbursementList(reimbursements);
                setIsLoading(false);
            }
        }
        catch(err){
            console.log(err);
        }
    };
    
    return(
        !props.currentUser ?
        <div className = 'ReimbursementList'>
           <p>Please <Link to="/login">Log in</Link> to view your reimbursement statements.</p>
        </div>
        :
        !isLoading && reimbursementList ?

        <div className = 'ReimbursementList'>
        {props.currentUser?.admin?
            <></>
            :
            <Link to="/reimbursements/create">
            <Button 
                size = "small"
            >New Reimbursement
            </Button>
            </Link>
        
        }
            <br />
            <ul>
            {
                reimbursementList.map((reim: Reimbursement, key) =>{
                    return (
                        <div key={key}>
                            <ReimbursementComponent currentUser={props.currentUser} reimbursement={reim} key={key} />
                            <br />
                        </div>
                    );
                })
            }
            </ul>
        </div>
        :
        <div className = 'ReimbursementList'>
           <p>Loading...</p>
        </div>

    );

}