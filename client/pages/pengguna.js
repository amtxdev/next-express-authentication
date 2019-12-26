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
export default withAuthSync(Profile)
