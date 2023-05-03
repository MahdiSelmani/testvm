
const express = require('express')
const port = 3000;
const app = express();
const vmRouter = require('./routes/vmRoutes')
const loginRouter = require('./routes/loginRoute')
const connection = require('./util/database')
const sendMail = require('./controllers/mail')
const cors = require('cors')
const path = require('path')



app.use(cors({
    origin: true,
    credentials: true,
    methods: 'POST,GET,PUT,OPTIONS,DELETE'
}));

app.use(express.json());
app.use('', vmRouter)
app.use('', loginRouter)
app.use('', express.static('dist/restartVm'))
app.get('*', (req,res)=> {
    res.sendFile(path.resolve('dist/restartVm/index.html'))
})



setInterval(() => {
    let startedVms = stoppedVms = 0;
    connection.query('select (select count(*) from vms where startDate >= curdate() and up = 0 ) as stoppedVms, (select count(*) from vms where stopDate <= curdate() and up = 1 ) as startedVms', (err, data) => {
        if (err) console.log(err);
        startedVms = data[0]['startedVms'];
        stoppedVms = data[0]['stoppedVms'];
        if (startedVms + stoppedVms > 0) sendMail(startedVms, stoppedVms);
    })
}, 14400000)
app.listen(port, () => {
    console.log("server running on port " + port) 
})










