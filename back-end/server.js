/* ==================== Dependencies ==================== */

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const config = require("./config.js");

/* ==================== Initialize Express ==================== */

const app = express();
const port = process.env.PORT || 8080;

/* ==================== Initialize Pool ==================== */

const connectionString = config.connectionString;
const pool = new Pool({ connectionString: connectionString });

/* ==================== Middleware ==================== */

app.use(cors());
app.use(express.json());

/* ==================== Routes ==================== */

/* ========== General ========== */
app.get("/test", (req, res) => {
  res.send("hello");
});

// Get full tables
app.get("/Amazon/:table", (req, res) => {
  pool.query(`SELECT * FROM ${req.params.table}`).then((result) => {
    res.send(result.rows);
  });
});

/* ========== Q&A Routes ========== */

app.post("/amazon_qa", (req, res) => {
  const { question, answer, product_id, rating } = req.body;
  pool.query(
    "INSERT INTO amazon_qa (question, answer, product_id, rating) VALUES ($1, $2, $3, $4)",
    [question, answer, product_id, rating],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result.body);
      }
    }
  );
});

// app.get('/amazon_qa', (req, res) => {
//   pool.query('SELECT * FROM amazon_qa', (error, result) => {
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       res.send(result.rows);
//     }
//   });
// });

app.get("/amazon_qa", (req, res) => {
  pool
    .query("SELECT * FROM amazon_qa")
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.status(400).send("Failed to GET questions");
    });
});

/* ========== Recommendation Routes ========== */

app.get("/recs", (req, res) => {
  pool
    .query("SELECT * FROM recommendations")
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(400).send("Failed to GET recommendations");
    });
});

app.post("/recs", (req, res) => {
  let rec = req.body;
  let product_img = rec.product_img;
  let product_name = rec.product_name;
  let product_seller = rec.product_seller;
  let num_reviews = rec.num_reviews;
  let operating_system = rec.operating_system;
  let price = rec.price;
  let is_best_seller = rec.is_best_seller;
  let is_limited_time_deal = rec.is_limited_time_deal;
  let is_prime_delivery = rec.is_prime_delivery;
  let limited_time_end = rec.limited_time_end;
  let is_offers = rec.is_offers;
  let is_climate_friendly = rec.is_climate_friendly;
  pool.query(
    "INSERT INTO recommendations (product_img, product_name, product_seller, num_reviews, operating_system, price, is_best_seller, is_limited_time_deal, is_prime_delivery, limited_time_end, is_offers, is_climate_friendly) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
    [
      product_img,
      product_name,
      product_seller,
      num_reviews,
      operating_system,
      price,
      is_best_seller,
      is_limited_time_deal,
      is_prime_delivery,
      limited_time_end,
      is_offers,
      is_climate_friendly,
    ],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result.rows);
      }
    }
  );
});

/* ========== Product Review Routes ========== */

app.post("/reviews", (req, res) => {
  pool
    .query(
      `INSERT INTO reviews (title, body, rating, username, datecreated ) VALUES ($1,$2,$3,$4,$5)`,
      [
        req.body.title,
        req.body.body,
        req.body.rating,
        req.body.username,
        req.body.datecreated,
      ]
    )
    .then((result) => res.send(result))
    .catch((err) => res.status(404).send(err));
});

/* ==================== Listener ==================== */

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
