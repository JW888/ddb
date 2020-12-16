import bcrypt from 'bcryptjs'


const users = [
    {
        name: "admin",
        email: "admin@email.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "jw",
        email: "jw@email.com",
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "am",
        email: "am@email.com",
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "pk",
        email: "pk@email.com",
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users