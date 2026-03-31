/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} email
 * @property {string} password
 */

/**
 * @type {User[]}
 */
const usersData = [
    {
        id: 1,
        email: "reza.fauzan@example.com",
        password: "Test1234"
    },
    {
        id: 2,
        email: "someone.love@example.com",
        password: "Test1234"
    },
    {
        id: 3,
        email: "orang.khayalan@example.com",
        password: "Test1234"
    },
    {
        id: 4,
        email: "lumba.lumba@example.com",
        password: "Test1234"
    },
    {
        id: 5,
        email: "kucing.putih@example.com",
        password: "Test1234"
    },
    {
        id: 6,
        email: "kucing.langit@example.com",
        password: "Test1234"
    },
    {
        id: 7,
        email: "kucing.hallo@example.com",
        password: "Test1234"
    },
    {
        id: 8,
        email: "orang.asing@example.com",
        password: "Test1234"
    },
    {
        id: 9,
        email: "george.harris@example.com",
        password: "Test1234"
    },
    {
        id: 10,
        email: "hannah.clark@example.com",
        password: "Test1234"
    }
]

export async function getAllUsers() {
    return usersData
}

/**
 * @param {number} id 
 * @returns {User}
 */
export async function getUserById(id) {
    const foundIndex = usersData.findIndex(user => user.id === parseInt(id))

    if (foundIndex !== -1) {
        return [usersData[foundIndex], foundIndex]
    } else {
        throw new Error("Users not found !");
    }
}

/**
 * 
 * @param {string} email 
 * @returns {User}
 */
export async function getUserByEmail(email) {
    const foundIndex = usersData.findIndex(user => user.email === email)

    if (foundIndex !== -1) {
        return [usersData[foundIndex], foundIndex]
    } else {
        throw new Error("Users not found !");
    }
}

/**
 * 
 * @param {User} data 
 * @returns 
 */
export async function createUsers(data) {
    data.id = usersData[usersData.length - 1].id + 1
    usersData.push(data)
    return data
}

/**
 * 
 * @param {number} id 
 * @param {User} data 
 */
export async function updateUser(id, newData) {
    const foundIndex = usersData.findIndex(user => user.id === parseInt(id))

    if (foundIndex !== -1) {
        usersData[foundIndex] = {
            ...usersData[foundIndex],
            ...newData
        }

        return usersData[foundIndex]
    } else {
        throw new Error("Users not found !");
    }
}

export async function deleteUser(id) {
    const [user, index] = await getUserById(id)
    usersData.splice(index, 1)
    return user
}