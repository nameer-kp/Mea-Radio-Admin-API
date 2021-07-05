const {exec} = require('child_process')
const updateRadioLoop = (req, res) => {
    const path = __dirname + "/../../../public/loop/"
    exec(`bash ${__dirname}/loopCreater.sh ${path}`, (err, stdo, stderr) => {
        console.log(stdo,err,stderr);
    })
    
    
    

}
module.exports = {
    updateRadioLoop
}