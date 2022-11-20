class User {
    
}

interface IUser {
    id: string,
    created_at: Date,
    name: string,
    tz?: string,
    location?: string,
    currency?: string,
    language?: string,
    mess_count: number
}