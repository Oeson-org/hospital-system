const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp();
// credential: admin.credential.cert(
//   // eslint-disable-next-line max-len
//   require("../../hospital-server-2688c-firebase-adminsdk-ahdck-a3f851a689.json")
// ),

const db = admin.firestore();

const writeToDB = async (collection, slotID, data) => {
  const collec = db.collection(collection);
  try {
    let r_data = await collec.doc(slotID).set(data);
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
    if (key && condition) {
      r_data = await collec.where(condition).get();
    } else if (key) {
      r_data = await collec.doc(key).get();
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

const findSlots = async (collection, date, time) => {
  try {
    let appoinmentarray = await readFromDB(collection, date);
  
  appoinmentarray = appoinmentarray.data._fieldsProto.slots.mapValue.fields;
  let l_apnmnts = [];
  for (apnmnt in appoinmentarray) {
    let doc = appoinmentarray[apnmnt];
    doc.mapValue.fields.timestamp = apnmnt;
    l_apnmnts.push(doc);
  }
  l_apnmnts = l_apnmnts.filter(doc => doc.mapValue.fields.timestamp === time);
  delete l_apnmnts[0].mapValue.fields.timestamp;
  //functions.logger.debug({ "returning_appts": l_apnmnts });
  return { data: l_apnmnts[0], error: null }
} catch (err) {
  functions.logger.error(err);
  return {data: null, error: err}
}
}

const addBookingtoSlots = async (date, time, ap_id, doc_id) => {
  const collec = db.collection("slots").doc(date);
  try {
    let updatedDoc = await collec.update(`slots.${time}.appnmt_id`, ap_id);
    return { data: updatedDoc, error: null }
  } catch (err) {
    functions.logger.error(err);
    return { data: null, error: err };
  }
}

module.exports = {
  write: writeToDB,
  read: readFromDB,
  delete: deleteFromDB,
  find: findSlots,
  addBooking: addBookingtoSlots
}