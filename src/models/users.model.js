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
    { email: "reza.fauzan@example.com", password: "Test1234" },
    { email: "someone.love@example.com", password: "Test1234" },
    { email: "orang.khayalan@example.com", password: "Test1234" },
    { email: "lumba.lumba@example.com", password: "Test1234" },
    { email: "kucing.putih@example.com", password: "Test1234" },
    { email: "kucing.langit@example.com", password: "Test1234" },
    { email: "kucing.hallo@example.com", password: "Test1234" },
    { email: "orang.asing@example.com", password: "Test1234" },
    { email: "george.harris@example.com", password: "Test1234" },
    { email: "hannah.clark@example.com", password: "Test1234" }
];

export async function getAllUsers() {
    return usersData
}

/**
 * @param {number} id 
 * @returns {User}
 */
export async function getUserById(id) {
    const foundIndex = usersData.findIndex(user => user.id === id)

    if (foundIndex !== -1) {
        return usersData[foundIndex]
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
    usersData.push(data)
    return usersData
}

/**
 * 
 * @param {number} id 
 * @param {User} data 
 */
export async function updateUser(id, data) {
    const foundIndex = usersData.findIndex(user => user.id === id)

    if (foundIndex !== -1) {
        usersData[foundIndex] = {
            ...usersData[foundIndex],
            ...data
        }

        return usersData[foundIndex]
    } else {
        throw new Error("Users not found !");
    }
}

export async function deleteUser(id) {
    const user = getUserById(id)
}