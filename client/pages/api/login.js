import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
    const {email} = await req.body
    const {password} = await req.body

    console.log('email', email)
    console.log('password', password)
    
    const url = 'http://localhost:1000/akun/user'
    // const url = 'http://localhost:1000/akun/user'

    try {
        const response = await fetch(url)

        if (response.ok) {
            const {id} = await response.json()
            return res.status(200).json({ token:id })
        } else {
            // https://github.com/developit/unfetch#caveats
            const error = new Error(response.statusText)
            error.response = response
            throw error
        }
    } catch (error) {
        const { response } = error
        return response
        ? res.status(response.status).json({ message: response.statusText })
        : res.status(400).json({message: error.message})
    }
}