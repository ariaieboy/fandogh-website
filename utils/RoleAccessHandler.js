const RoleAccessHandler = (user_role, permitted_roles) => {
    return user_role in permitted_roles;

};

export default RoleAccessHandler



