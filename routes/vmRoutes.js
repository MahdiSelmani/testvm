const express = require('express')
const router = express.Router()
const vmController = require('../controllers/vmController')


router.get('/runningvms', vmController.runningVms)

router.get('/stoppedvms', vmController.stoppedVms)

router.get('/allvms', vmController.allVms)

router.get('/vm/:id', vmController.getVm)

router.put('/update',vmController.updateVm )

router.put('/stop',vmController.stopVm)

router.put('/start', vmController.startVm)

router.post('/add', vmController.addVm)

router.get('/search', vmController.searchVm)

router.delete('/delete/:id', vmController.deleteVm)


module.exports = router;