const fs = require("fs");
const glob = require("glob");
const removeShow = (req, res, pg) => {
  const slot_uid = req.body.slot_uid;
  const query = {
    text: "DELETE FROM shows WHERE slot_uid=$1",
    values: [slot_uid],
  };
  audioFiles = glob.sync(
    __dirname + "/../../../public/audio/" + slot_uid + ".*"
  );
  thumbnailFiles = glob.sync(
    __dirname + "/../../../public/thumbnail/" + slot_uid + ".*"
  );

  try {
      fs.unlinkSync(audioFiles[0]);
      if (thumbnailFiles.length > 0) {
          fs.unlinkSync(thumbnailFiles[0]);
      }
    
    console.log("File is deleted.");
  } catch (error) {
    console.log(error);
  }

    pg.query(query).then(data => {
        res.json({ error: false }).status(200)

    }).catch(err => {
        console.log(err);
        res.json({error:true}).status(400)
  })
};

module.exports = {
  removeShow,
};
