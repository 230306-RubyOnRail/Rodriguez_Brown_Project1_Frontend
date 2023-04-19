import {User} from '../models/user'
import { Link } from 'react-router-dom'

interface IDashboardProps{
    currentUser: User | undefined;
}

export default function Dashboard(props: IDashboardProps) {
    return (
        props.currentUser ?
        <div>
            <p>
                Welcome back to Revature ERS!
            </p>
        </div>
        :
        <div>
            <p>
                Welcome to Revature ERS!
            </p>
            <p>
                <Link to='/login'>Click to Login</Link>
            </p>
        </div>
    );
}