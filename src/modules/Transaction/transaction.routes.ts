
import { Router } from 'express';
import { getAllTransactions, getMyTransactions } from './transaction.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../User/user.model';

const TransactionRoutes= Router();
TransactionRoutes.get('/my-transactions',checkAuth(Role.USER,Role.AGENT), getMyTransactions);
TransactionRoutes.get('/all-transactions',checkAuth(Role.ADMIN), getAllTransactions);


export default TransactionRoutes;