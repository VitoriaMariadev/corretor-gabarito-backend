import pool from "../database/db.js"
import jwt from 'jsonwebtoken'


const TokenValid = async (req, res) => {
    const token =  req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
    req.token = token

    if(!token){
        return res.status(200).json({Message:"Token inválido.", status:400})
    }

    jwt.verify(token, 'AluW4ok65cOK0iLdZbP6600b88ab4b30', (err, decoded) =>{
        if(err){
            return res.status(200).json({Message:"Token inválido.", status:400})
        }else{
            req.users = decoded.users
            return res.status(200).json({Message:"Token válido."})
        }
    })
}

const DeleteToken = async (req, res) => {
    const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];

    if(!token){
       return res.status(200).json({Message:"Logout não autorizado.", status:400})
    }
    res.cookie('token', null, {httpOnly:true})
    
    return res.status(200).json({Message:"Você foi desconectado."})
};

export {
    TokenValid, DeleteToken
}