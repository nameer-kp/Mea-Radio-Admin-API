
const express = require('express')
require('dotenv').config()
const app = express()
const fs = require('fs')
const { spawn, exec } = require('child_process');
const jwt = require('jsonwebtoken');
app.use(express.static('public'))
const cookieParser = require('cookie-parser');
const cors = require('cors')

var multer  = require('multer')
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CORS
}))
app.use(express.json())
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/thumbnail/')
  },
  filename: function (req, file, cb) {
    

      cb(null,  file.originalname+"."+file.mimetype.replace("image/",'') );

  }
});
var loopStorage = multer.diskStorage({
  destination: function (req, file, cb) {
  
    cb(null, './public/loop/')
  },
  filename: function (req, file, cb) {
   // to remove existing songs
    

      console.log("filename");
      cb(null,  Date.now()+"."+"mp3" );

  }
});
var showUpdate = multer({ storage })
var loopUpdate=multer({storage:loopStorage})
const { liveSlotRequest } = require('./controllers/admin/live_slot/liveSlotRequest')

const Pool = require('pg').Pool
const { liveSlotApproval } = require('./controllers/admin/live_slot/liveSlotApproval')
const { nonLiveRequest } = require('./controllers/admin/non_live_slot/nonLiveRequest')
const { nonLiveApprove } = require('./controllers/admin/non_live_slot/nonLiveApprove')
const { getAvailableShows } = require('./controllers/admin/show_updation/availableShow')
const { addToShow } = require('./controllers/admin/show_updation/addToShow')
const { currentShow } = require('./controllers/admin/show_updation/currentShow')
const { removeShow } = require('./controllers/admin/show_updation/removeShow')
const{removeRecording} = require('./controllers/admin/show_updation/removeRecording')
const { updateRadioLoop } = require('./controllers/admin/radio_loop/updateRadioLoop')
const { authenticateJWT } = require('./controllers/admin/util/authenticateJWT')
const {adminLogin} = require('./controllers/admin/login/adminLogin')
const pg = new Pool({

  user:process.env.DB_USER,
  host:process.env.DB_HOST,
  database:process.env.DB_NAME,
  password:process.env.DB_PASS,
  port:process.env.DB_PORT
})
app.get('/api/admin/bookslotview',authenticateJWT,(req,res)=>{liveSlotRequest(req,res,pg)})
app.post('/api/admin/bookslotapprove', (req, res) => { liveSlotApproval(req, res, pg) })

app.get('/api/admin/nonliveview',authenticateJWT,(req,res)=>{nonLiveRequest(req,res,pg)})
app.post('/api/admin/nonliveapprove', (req, res) => { nonLiveApprove(req, res, pg) })

// routes for shows updation

app.get('/api/admin/getavailableshows',authenticateJWT,(req,res)=>{getAvailableShows(req,res,pg)}) // this includes recorded and non_live
app.post('/api/admin/addtoshow',authenticateJWT ,showUpdate.single('thumbnail'), (req, res, next) => { addToShow(req, res, pg) })
app.get('/api/admin/getcurrentshow',authenticateJWT ,(req, res) => { currentShow(req, res, pg) })


app.post('/api/admin/removeshow',authenticateJWT,(req,res)=>{removeShow(req,res,pg)})
app.post('/api/admin/removerecording',authenticateJWT, (req, res) => { removeRecording(req, res, pg) })

app.post('/api/admin/updateradioloop',authenticateJWT,function (req,res,next) {
  exec(`rm ${__dirname}/public/loop/*.mp3`)
  next()
}, loopUpdate.array('files'), (req, res) => { updateRadioLoop(req, res) })

app.post('/api/admin/login', (req, res) => { adminLogin(req, res, jwt) })

app.get('/healthz',(req,res)=>res.status(200).send())

app.listen(process.env.HTTP_PORT,()=>{
    console.log("Server Started...")
})