const liveSlotApproval = (req, res, pg) => {
    const slot_uid = req.body.slot_uid
    const query = {
        text: 'UPDATE slot_request SET approved=true WHERE slot_uid=$1',
        values:[slot_uid]
    }
    pg.query(query).then(data => {
        res.json({error:false}).status(200)
    })
}
module.exports = {
    liveSlotApproval:liveSlotApproval
}