import { useRouter } from 'next/router'
import Link from 'next/link'

const Indax = () => {
    const router = useRouter()
    const {username} = router.query

    return (
        <h1>username: {username} </h1>
    )
}
export default Indax