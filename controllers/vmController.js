
const connection = require('../util/database')

const runningVms = async (req,res)=>{
    connection.query('select * from vms where stopDate <= curdate() and up = 1',(err, data)=>{
        if (err) return res.status(500).send('Error')
        res.send(data)
    })
}

const stoppedVms =  async (req,res)=>{
    connection.query('select * from vms where startDate >= curdate() and up = 0',(err, data)=>{
        if (err) return res.status(500).send('Error')
        res.send(data)
    })
}
const allVms = async (req, res) => {
    connection.query('select * from vms', (err, data) => {
        if (err) return res.status(500).send('Error')
        res.send(data)
    })
}

const getVm = async (req, res) => {
    const id = req.params.id;
    connection.query('select * from vms where id = ?', [id], (err, data) => {
        if (err) return res.status(500).send('Error')
        res.status(200).send(data)
    })
}
const updateVm = async (req, res) => {
    connection.query('update vms set name=?, ipAdress=?,ticket=?, stopDate=? where id=?', [req.body.name, req.body.ipAdress, req.body.ticket, req.body.stopDate, req.body.id], (err, date) => {
        if (err) return res.status(500).send('Error')
        else res.status(200).json("Updated sucessfully")
    })
}

const stopVm =  async (req, res) => {
    connection.query('update vms set up = 0 where id = ?', [req.body.id], (err, data) => {
        if (err) return res.status(500).send('Error')
        else res.status(200).json("Stopped sucessfully")
    })
}

const startVm = async (req, res) => {
    connection.query('update vms set up = 1 where id = ?', [req.body.id], (err, data) => {
        if (err) return res.status(500).send('Error')
        else res.status(200).json("Started sucessfully")
    })
}
const addVm = async (req, res) => {
    let date = '';
    req.body.vmState ? date = 'stopDate' : date = 'startDate'
    const query = `insert into vms (name, ipAdress, ${date}, ticket, up) values(?,?,?,?,?)`;
    connection.query(query, [req.body.vmName, req.body.vmIp, req.body.vmDate, req.body.vmTicket, req.body.vmState], (err, date) => {
        if (err) return res.status(500).send('Virtual machine already exists')
        else res.status(200).json("Added sucessfully")
    })
}

const searchVm = async (req, res) => {
    let text = req.query.search;
    connection.query(`select * from vms where name like '%${text}%' or ipAdress like '%${text}%'`, (err, data) => {
        if (err) return res.status(500).send('Error :' + err)
        res.status(200).send(data)
    })
}

const deleteVm = async (req, res) => {
    let id = req.params.id;
    connection.query(`delete from vms where id = ?`, [id], (err, data) => {
        if (err) return res.status(500).send('Error :' + err)
        res.status(200).send(data)
    })
}

module.exports = {runningVms, stoppedVms,allVms, getVm,updateVm, stopVm, startVm, addVm, searchVm, deleteVm};