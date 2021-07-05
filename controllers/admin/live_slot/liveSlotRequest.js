const liveSlotRequest = async (req, res, pg) => {
    try {
        let resObj = [];
  const query = {
    text: "SELECT email,note,title,date_from,date_to,slot_uid,no_of_members from slot_request JOIN user_login ON (slot_request.user_uid = user_login.user_uid) where approved=false AND live=true;",
  };
  //TODO need to fetch the emails of participants too
  const data = await pg.query(query)
   
    //   console.log(data.rows);
      for (const row of data.rows) {  //this loop goes through every slot id and find all members of that slot id
        const slot_uid = row["slot_uid"];

        const query = {
          text: "select email from slots join user_login on (slots.user_uid=user_login.user_uid) where slot_uid = $1;",
          values: [slot_uid],
        };
        const data2 = await pg.query(query)
          if (typeof data2.rows[0]!="undefined") {
            // console.log("inner loop", data2.rows);
            row["members"] = data2.rows.map(element => {
                return element['email']
            });;
            resObj.push(row); // here push modified row
          } else {
            resObj.push(row); // here we push the rows as it was
          }
        }
        console.log(resObj);
        res.json(resObj).status(200);
    
      }
        
      catch (er) {
          console.log(er);
      }
    }
  

module.exports = {
  liveSlotRequest: liveSlotRequest,
};
