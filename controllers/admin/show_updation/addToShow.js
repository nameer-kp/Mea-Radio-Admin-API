const addToShow = (req, res, pg) => {
    const slot_uid = req.file.originalname;

    const query1 = {
        text: "SELECT user_uid,slot_uid,note,title,genre FROM slot_request WHERE slot_uid=($1);",
        values: [slot_uid],
    };
    pg.query(query1)
        .then((data) => {
            if (typeof data.rows != "undefined") {
                const user_uid = data.rows[0]["user_uid"];
                const slot_uid = data.rows[0]["slot_uid"];
                const note = data.rows[0]["note"];
                const title = data.rows[0]["title"];
                const genre = data.rows[0]["genre"];
      

                const query2 = {
                    text: "DELETE FROM slot_request WHERE slot_uid=$1;",
                    values: [slot_uid],
                };
                const query3 = {
                    text: "INSERT INTO shows (user_uid,slot_uid,note,title,genre) VALUES($1,$2,$3,$4,$5);",
                    values: [user_uid, slot_uid, note, title, genre],
                };

                pg.query(query2).then((data2) => {
                    pg.query(query3).then((data3) => {
                        res.json({ error: false }).status(200);
                    });
                });
            }
            else {
                res.json({error:true}).send(400)
            }
})
    .catch((e) => {
      console.log(e);
    });
};
module.exports = {
  addToShow,
};
