const userKey = 'kpiTaskUser'

const getUserName = () => {
    return localStorage.getItem(userKey)
}

const logout = async () => {
    await fetch('/api/user/logout', {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    })
    return localStorage.removeItem(userKey)
}

export {getUserName, logout}