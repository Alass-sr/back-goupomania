const UserModel = require("../models/user.model"); // Incrémente le lien pour l'utilisatuer
const fs = require("fs"); // incrémente des élèments dans un fichier
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline); //
const { uploadErrors } = require("../utils/errors.utils");


module.exports.uploadProfil = async (req, res) => {
  try {

    // Format de l'image
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");
    
      // Size de l'image
    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  // Traitement du fichier retourner
  const fileName = req.body.name + ".jpg";// Ecrase l'image existante

  await pipeline(
    req.file.stream,

    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}` // indique le chemin ou stocker l'image
    )
  );

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: "./uploads/profil/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
