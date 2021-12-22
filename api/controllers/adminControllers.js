const {create,getAdminCentreById,getAllAdminCentre,updateAdminCentre,deleteAdminCentre,gitAdminCentreByEmail}=require('../modules/adminModules');
const {genSaltSync,hash,compare} = require('bcrypt');

const {sign} =require('jsonwebtoken')
module.exports = {
    createUser : async (req,res)=>{
        // console.log('tedt');
        const body = req.body;
        // const salt = genSaltSync(10);
        const saltRounds = 10;

        body.password_admin = await hash(body.password_admin, saltRounds);
        
        create(body,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error"
                });
            }

            return res.status(200).json({
                success : 1,
                data : result,
                body:body
            });
        });
    },
    getAllAdmin : (req,res)=>{
        getAllAdminCentre((err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : result
            });
        })
    },

    getAdminCentreById : (req,res)=>{
        const id=req.params.id;
        getAdminCentreById(id,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : result
            });
        });
    },
    deletAdminCentre : (req,res)=>{
        const id=req.params.id;
        deleteAdminCentre(id,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : result
            });
        });
    },
    updateAdminCentre : (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password_admin = hashSync(body.password_admin, salt);
        
        updateAdminCentre(body,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : result
            });
        });
    },
    loginAdminCentre : (req,res)=>{
        const body = req.body;
        gitAdminCentreByEmail(body.email_admin,async (err,result)=>{
            if(err){
                console.log(err);
            }
            if(!result){
                return res.json({
                    success:0,
                    date : 'invalide email or password1'
                });
            }
            console.log(body.password_admin);
            const resu = await compare(body.password_admin,result.password_admin);
            console.log(result.password_admin);
            console.log(resu);
            if(resu){
                result.password_admin = undefined;
                const jsontoken = sign({result:result},"qwe1234",{
                    expiresIn:"1h"
                });
                return res.json({
                    success : 1,
                    message : 'login succesfully',
                    token: jsontoken
                });
            }else{
                return res.json({
                    success : 0,
                    data : "invalid email or password"
                })
            }
        });
    }
}