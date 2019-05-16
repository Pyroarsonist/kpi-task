const userIdKey = 'kpiTaskUserId'

const userIsLoggedIn = () => {
    return !!localStorage.getItem(userIdKey)
}

const logout = () => {
    return localStorage.removeItem(userIdKey)
}

export {userIsLoggedIn, logout}