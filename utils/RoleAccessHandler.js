import {getValue} from "./cookie";

const RoleAccessHandler = ( permitted_roles) => {
    return getValue('user_role') in permitted_roles;

};

export default RoleAccessHandler



