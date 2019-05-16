const userIdKey = 'kpiTaskUserId'

const userIsLoggedIn = () => {
    return !!localStorage.getItem(userIdKey)
}

const logout = async () => {
    await fetch('/api/user/logout', {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    })
    return localStorage.removeItem(userIdKey)
}

export {userIsLoggedIn, logout}