
export const storeUserToLS = (user) => {

    localStorage.setItem('user', JSON.stringify(user));

}

export const getUserFromLS = () => {

    const user = localStorage.getItem('user')

    return user !== null ? JSON.parse(user) : null;

}

export const removeFromLS = () => {

    localStorage.removeItem('user');

}