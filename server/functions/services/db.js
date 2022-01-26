const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(
    // eslint-disable-next-line max-len
    require("../../hospital-server-2688c-firebase-adminsdk-ahdck-a3f851a689.json")
  ),
});

const db = admin.firestore();

const writeToDB = async (collection, key, data) => {
  const collection = db.collection(collection);
  // In case of document exists it would be considered as update and document will be merged with the new data
  let data = await collection.doc(key).set(data, { merge: true });
  return data;
};

const readFromDB = async (collection, key, condition) => {
  let data;
  const collection = db.collection(collection);
  if (key) {
    data = await collection.doc(key).get();
  } else if (condition) {
    data = await collection.where(condition).get();
  } else {
    data = await collection.get();
  }
  return data;
};

const deleteFromDB = async (collection, key) => {
    const collection = db.collection(collection);
    let data = await collection.doc(key).delete();
    return data;
}

module.exports = {
    write: writeToDB,
    read: readFromDB,
    delete: deleteFromDB
}