import { Access } from 'payload'

export const allowLoggedIn: Access = ({ req }) => Boolean(req.user)
export const allowAll: Access = () => true
