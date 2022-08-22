const { MongoClient, ServerApiVersion } = require("mongodb");
let client;
let database;
let movies;
async function init() {
  const uri = "";
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  database = client.db("stealth");
  movies = database.collection("movies");
}
async function addOne(doc) {
  try {
    const result = await movies.insertOne(doc);
    return result;
  } finally {
  }
}
async function getall() {
  let all = [];
  try {
    database = client.db("stealth");
    movies = database.collection("movies");

    const query = { name: { $ne: "" } };
    const options = {
      sort: { title: 1 },
    };
    const cursor = await movies.find(query, options);

    if ((await cursor.count()) === 0) {
    }

    await cursor.forEach((val) => {
      all.push(val);
    });
    return all;
  } finally {
  }
}
async function updateOne(data, title) {
  try {
    database = client.db("stealth");
    movies = database.collection("movies");

    const filter = { name: title };

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        ...data,
      },
    };
    const result = await movies.updateOne(filter, updateDoc, options);

    return result;
  } finally {
  }
}
async function getOne() {
  try {
    database = client.db("stealth");
    movies = database.collection("movies");

    const query = { name: "Vikram" };
    const movie = await movies.findOne(query);
  } finally {
  }
}

async function deleteOne(name) {
  try {
    const query = { name: name };
    const result = await movies.deleteOne(query);
    if (result.deletedCount === 1) {
    } else {
    }
    return result;
  } finally {
  }
}
module.exports = { getOne, init, addOne, getall, updateOne, deleteOne };
