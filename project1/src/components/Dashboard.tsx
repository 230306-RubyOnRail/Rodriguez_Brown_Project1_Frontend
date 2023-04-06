import {User} from '../models/user'
import { Link, Navigate } from 'react-router-dom'

interface IDashboardProps{
    currentUser: User | undefined;
}

export default function Dashboard(props: IDashboardProps) {
    return (
        props.currentUser ?
        <div>
            <p>
                Hello user number {props.currentUser.user_id}
            </p>
            <p>
                <Link to='/login'>Click to Login</Link>
            </p>
        </div>
        :
        <>
            <Navigate to="/login" />
        </>
    );
}