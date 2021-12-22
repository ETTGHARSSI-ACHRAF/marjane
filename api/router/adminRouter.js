const {createUser,getAllAdmin,getAdminCentreById,deletAdminCentre,updateAdminCentre,loginAdminCentre}=require('../controllers/adminControllers');
const router = require('express').Router();
const {checkToken} =require('../../auth/token_validation');

router.post('/',checkToken,createUser);
router.get('/',checkToken,getAllAdmin);
router.get('/:id',checkToken,getAdminCentreById);
router.delete('/:id',checkToken,deletAdminCentre);
router.patch('/',checkToken,updateAdminCentre);
router.post('/login',loginAdminCentre);
module.exports = router;