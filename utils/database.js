import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transactionObj) => {
      transactionObj.executeSql(
        `CREATE TABLE IF NOT EXISTS places 
      (id INTEGER PRIMARY KEY NOT NULL, 
        title TEXT NOT NULL, 
        imageUri TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL)`,
        // REAL mean real number with decimal
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((trObj) => {
      trObj.executeSql(
        `INSERT INTO places (title, imageUri, lat, lng)
       VALUES (?, ?, ?, ?)`,
        [place.title, place.imageUri, place.location.lat, place.location.lng],
        // this bellow happen if success we get 2 params from expo which are transaction and result
        (_, result) => {
          console.log("insert/added", result);
          resolve(result);
        },
        // bellow if fail 2 params wich are transaction and error
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          console.log('get db',result.rows._array);
          const places = [];
          for (const dataPoint of result.rows._array) {
            places.push(
              new Place(
                dataPoint.title,
                dataPoint.imageUri,
                { lat: dataPoint.lat, lng: dataPoint.lng },
                dataPoint.id
              )
            );
          }
          resolve(places);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          const dbPlace = result.rows._array[0]
          const place = new Place(dbPlace.title, dbPlace.imageUri, {lat: dbPlace.lat, lng: dbPlace.lng}, dbPlace.id)
          resolve(place)
        },
        (_, error) => {
          reject(error)
        },
      );
    });
  });
  return promise
}

export function deletePlace(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `DELETE FROM places WHERE id = ?`,
        [id],
        (_, result) => {
          console.log("Deleted SQL:", result);
          resolve(result);
        },
        (_, error) => {
          console.log("Error deleting SQL:", error);
          reject(error);
        }
      );
    });
  });
  return promise;
}
