const currentShow = (req, res, pg) => {
    const query = {
        text:'SELECT email,slot_uid,title,note,genre,likes FROM shows JOIN user_login ON (shows.user_uid=user_login.user_uid);'
    }
    pg.query(query).then(data => {
        if (typeof data.rows[0] != 'undefined') {
            res.json(data.rows).status(200)
        }
        else {
            res.json({error:true}).status(400)
        }
        
    }).catch(err => {
        console.log(err);
        res.json({error:true}).status(400)
    })

}
module.exports = {
    currentShow
}