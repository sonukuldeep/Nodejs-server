import express from 'express';
import { login, logout, register, resetPassowrd } from '../controllers/authentication';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.post('/auth/register', register)
    router.post('/auth/login', login)
    router.get('/auth/logout', logout)
    router.post('/auth/reset-password', isAuthenticated, resetPassowrd)
}