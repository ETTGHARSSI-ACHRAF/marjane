const {createUser,getAllAdmin,getAdminCentreById,deletAdminCentre,updateAdminCentre,loginAdminCentre}=require('../controllers/adminControllers');
const router = require('express').Router();

router.post('/',createUser);
router.get('/',getAllAdmin);
router.get('/:id',getAdminCentreById);
router.delete('/:id',deletAdminCentre);
router.patch('/',updateAdminCentre);
router.post('/login',loginAdminCentre);
module.exports = router;