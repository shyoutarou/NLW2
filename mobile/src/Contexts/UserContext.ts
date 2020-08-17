import { Dispatch, SetStateAction, createContext} from 'react'

interface IUser {
    id: number
    name: string
    subject: string
    avatar: string
    whatsapp: string
    bio: string
    email: string
}

interface IContext {
    token: string | null,
    user: IUser | null,
    setUser: Dispatch<SetStateAction<IUser | null>>
    setToken: Dispatch<SetStateAction<string | null>>
}

const UserContext = createContext<IContext>({
    token: null,
    user: null,
    setUser: () => {},
    setToken: () => {}
})

export default UserContext