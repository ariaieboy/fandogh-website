
const RoleAccessHandler = (permitted_roles) => {
    return sessionStorage.getItem('user_role') in permitted_roles;
};

export default RoleAccessHandler



