// const path = require('path')
const fs = require('fs');

const getAvailableShows = async (req, res, pg) => {
    try {
        let resObj=[]
const path = __dirname+"/../../../public/audio"

    const nameArr = fs.readdirSync(path).map(ele=>ele.replace(".mp3",""))
    console.log(nameArr);

    for (const slot_uid of nameArr) {

        const query={
            text: 'SELECT email,slot_uid,note,title,genre FROM slot_request JOIN user_login ON (slot_request.user_uid=user_login.user_uid) WHERE slot_uid =$1;',
            values:[slot_uid]
        }
        const data = await pg.query(query)
        if (typeof data.rows[0] != 'undefined') {
            resObj.push(data.rows[0])
        }
        
        
        

        
        }
        console.log("available", resObj);
        res.json(resObj).status(200)
    } catch (err) {
        console.log(err);
    }
    

}
module.exports = {
    getAvailableShows
}