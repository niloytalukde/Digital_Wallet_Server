import { Router } from "express"
import authRoutes from "../modules/Auth/auth.routes"
import walletRouter from "../modules/Wallet/wallet.routes"
import { UserRoutes } from "../modules/User/user.routes"
import agentRouter from "../modules/Agent/agent.routes"
import TransactionRoutes from "../modules/Transaction/transaction.routes"

export const indexRouter =Router()

const moduleRoutes=[
  
    {
        path:"/auth",
        route:authRoutes
    },
    {
        path:"/wallet",
        route:walletRouter
    },
    {
        path:"/user",
        route:UserRoutes
    },
    {
        path:"/agent",
        route:agentRouter
    },
{
        path:"/transactions",
        route:TransactionRoutes
    },
]
moduleRoutes.forEach((route)=>{
indexRouter.use(route.path,route.route)
})