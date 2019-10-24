import { User } from './user.model';

export class UserSession{
    constructor(public sessionCheck:boolean, public user:User){}
}