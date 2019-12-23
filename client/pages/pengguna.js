import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import { withAuthSync } from '../utils/auth'
import getHost from '../utils/get-host'

const Profile = props => {
    const { email, username } = props.data

    return (
        <>
        <p>{email}</p>
        <p>{username}</p>
        </>
    )
}

// Profile.getInitialProps = async ctx => {
//     const { token } = nextCookie(ctx)
//     // const apiUrl = getHost(ctx.req) + '/api/profile'
//     const apiUrl = 'http://localhost:1001/api/profile'

//     const redirectOnError = () =>
//     typeof window !== 'undefined'
//       ? Router.push('/masuk')
//       : ctx.res.writeHead(302, { Location: '/masuk' }).end()

//       try {
//         const response = await fetch(apiUrl, {
//           credentials: 'include',
//           headers: {
//             Authorization: JSON.stringify({ token }),
//           },
//         })

//         if (response.ok) {
//             const js = await response.json()
//             console.log('js', js)
//             return js
//           } else {
//             // https://github.com/developit/unfetch#caveats
//             return await redirectOnError()
//           }
//         } catch (error) {
//           // Implementation or Network error
//           return redirectOnError()
//         }
// }

export default withAuthSync(Profile)
