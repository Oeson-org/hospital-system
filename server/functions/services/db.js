const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp();
// credential: admin.credential.cert(
//   // eslint-disable-next-line max-len
//   require("../../hospital-server-2688c-firebase-adminsdk-ahdck-a3f851a689.json")
// ),

const db = admin.firestore();

const writeToDB = async (collection, key, data) => {
  const collec = db.collection(collection);
  // In case of document exists it would be considered as update and document will be merged with the new data
  try {
    let r_data = await collec.doc(key).set(data, { merge: true });
    functions.logger.info({ data: r_data });
    return { data: r_data, error: null };
  } catch (err) {
    functions.logger.error({ error: err });
    return { data: null, error: err };
  }
};

const readFromDB = async (collection, key, condition) => {
  let r_data;
  const collec = db.collection(collection);
  try {
    if (key) {
      r_data = await collec.doc(key).get();
    } else if (condition) {
      r_data = await collec.where(condition).get();
    } else {
      r_data = await collec.get();
    }
    return { data: r_data, error: null };
  }
  catch (err) {
    functions.logger.error(err);
    return { data: null, error: err };
  }
};

const deleteFromDB = async (collection, key) => {
  const collec = db.collection(collection);
  try {
    let r_data = await collec.doc(key).delete();
    return { data: r_data, error: null };
  } catch (err) {
    functions.logger.error(err);
    return { data: null, error: err };
  }
}

module.exports = {
  write: writeToDB,
  read: readFromDB,
  delete: deleteFromDB
}