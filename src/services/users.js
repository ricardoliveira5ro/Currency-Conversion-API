//Logic layer
const users = [{ id: 1, name: 'Ricardo', age: '22' }, { id: 2, name: 'Ines', age: '23' }]

const getUsers = async () => {
    try {
        return users
    } catch (e) {
        throw new Error(e.message)
    }
}

const getUserById = async (id) => {
    try {
        return users.find(e => e.id == id)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getUsers, getUserById
}