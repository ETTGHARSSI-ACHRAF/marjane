const pool = require('../../config/database');
const nodemailer = require('nodemailer');
module.exports= {
    // create admin  centre
    create : (data,callBack)=>{
        pool.query(
            'INSERT INTO admin_centre(nom_admin,email_admin,password_admin,fk_centre) VALUES (?,?,?,?)',
            [
                data.nom_admin,
                data.email_admin,
                data.password_admin,
                data.fk_centre
            ],
            (error,results,fields)=>{
                if(error){
                  return  callBack(error);
                }
                         // Step 1
                         let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'testcoding975@gmail.com', // TODO: your gmail account
                                pass: 'testCoding1998' // TODO: your gmail password
                            }
                          });
                          // Step 2
                          let mailOptions = {
                            from: 'testcoding975@gmail.com', // TODO: email sender
                            to: data.email_admin, // TODO: email receiver
                            subject: 'votre compte sur la platforme marjane',
                            text: 'votre code pour connecter sur la platforme : '+data.password_admin ,
                          };

                          // Step 3
                          transporter.sendMail(mailOptions, (err, data) => {
                            if (err) {
                                return log('Error occurs');
                            }else{
                                return callBack(null,results);
                            }
                            
                          });
                
            }
        );
    },
    // get all admin
    getAllAdminCentre : callBack =>{
        pool.query(
            'SELECT * FROM admin_centre',
            [],
            (error,results,fields)=>{
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            } 
            
            )
    },

    // get admin by id
    getAdminCentreById : (id,callBack) =>{
        pool.query(
            'SELECT * FROM admin_centre where id_admin = ?',
            [id],
            (error,results,fields)=>{
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results[0]);
            } 
            
            )
    },

    // delete admin by id
    deleteAdminCentre : (id,callBack) =>{
        pool.query(
            'DELETE FROM admin_centre WHERE id_admin=?',
            [id],
            (error,results,fields)=>{
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            } 
            
            )
    },

    // dupdate data admin by id
    updateAdminCentre : (data,callBack) =>{
        pool.query(
            'UPDATE admin_centre SET nom_admin=?,email_admin=?,password_admin=?,fk_centre=? WHERE id_admin=?',
            [    
                data.nom_admin,
                data.email_admin,
                data.password_admin,
                data.fk_centre,
                data.id_admin
            ],
            (error,results,fields)=>{
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            } 
            
            )
    },
    gitAdminCentreByEmail : (email_admin,callBack)=>{
        pool.query(
            'select * from admin_centre where email_admin=?',
            [email_admin],
            (error,results,fields)=>{
                if(error){
                   return callBack(error);
                }
                return callBack(null,results[0]);
                
            }
        )
    }

}