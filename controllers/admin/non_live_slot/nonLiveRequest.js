const nonLiveRequest = (req,res,pg) => {
    const query = {
     text:'SELECT email,note,title,date_from,date_to,slot_uid from slot_request JOIN user_login ON (slot_request.user_uid = user_login.user_uid) where approved=false AND live=false;'//this should also return file url incase of S3 storing
    }
    pg.query(query).then(data => {
        if (typeof data.rows[0] != 'undefined') {
            res.json(data.rows).status(200)
        } else {
            res.json({error:true}).status(200)
        }
        
    }).catch(err => {
        console.log(err);
        res.status(400)
    })
}
module.exports = {
    nonLiveRequest
}