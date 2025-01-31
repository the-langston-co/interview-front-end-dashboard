import sqlite3 from 'sqlite3';
import * as path from 'path';
import { mockProducts } from '@/database/mockProducts';

const dbPath = path.resolve(__dirname, 'collection.db');
console.log('dbPath', dbPath);
// Connecting to or creating a new SQLite database file
const db = new (sqlite3.verbose().Database)(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  db.run('drop table if exists product');

  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS product
     (
         id          INTEGER PRIMARY KEY AUTOINCREMENT,
         name        TEXT                                                      NOT NULL,
         image_url    TEXT                                                      NOT NULL,
         status      TEXT CHECK (status IN ('active', 'inactive', 'archived')) NOT NULL,
         price       REAL                                                      NOT NULL,
         stock       INTEGER                                                   NOT NULL,
         available_at TEXT                                                      NOT NULL -- Stores date as ISO 8601 string
     );`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Created product table.');

      // Clear the existing data in the products table
      db.run(`DELETE FROM product`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('All rows deleted from products');
        const products = mockProducts;

        const insertSql = `INSERT INTO product (name, image_url, status, price, stock, available_at) 
VALUES (?, ?, ?, ?, ?, ?);`;

        for (const product of products) {
          db.run(
            insertSql,
            [
              product.name,
              product.imageUrl,
              product.status,
              product.price,
              product.stock,
              product.availableAt
            ],
            function (err) {
              if (err) {
                return console.error(err.message);
              }
              const id = this.lastID; // get the id of the last inserted row
              console.log(`Rows inserted, ID ${id}`);
            }
          );
        }

        //   Close the database connection after all insertions are done
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Closed the database connection.');
        });
      });
    }
  );
});
