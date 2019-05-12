const userIsLoggedIn=()=>{
    return !!localStorage.getItem("kpiTaskUserId")
}

export {userIsLoggedIn}