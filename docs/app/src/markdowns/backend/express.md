# Express

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is an essential part of the MEAN stack, along with MongoDB, AngularJS, and Node.js.

Get more information at [https://expressjs.com/](https://expressjs.com/).

## Installing Node.js and npm

Before you can use Express, you need to have Node.js and npm (Node Package Manager) installed on your system. You can download and install Node.js from [https://nodejs.org/](https://nodejs.org/). npm is included with Node.js, so you don't need to install it separately.

To verify that Node.js and npm are installed correctly, run the following commands in your terminal:

```bash
node -v
npm -v
```

## Setting Up an Express Project

First, create a new directory for your project and navigate into it:

```bash
mkdir myexpressapp
cd myexpressapp
```

Initialize a new Node.js project by running:

```bash
npm init -y
```

This will create a `package.json` file in your project directory.

Next, install Express and other necessary dependencies:

```bash
npm install express sqlite3
```

## Creating the API

Here, we'll create a simple API for managing posts using Express and SQLite.

Create a new file named `app.js` in your project directory and add the following code:

```javascript
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(
    "CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, description TEXT, content TEXT)",
  );
});

// Routes
app.get("/api/posts", (req, res) => {
  db.all("SELECT * FROM posts", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/api/posts", (req, res) => {
  const { title, description, content } = req.body;
  db.run(
    "INSERT INTO posts (title, description, content) VALUES (?, ?, ?)",
    [title, description, content],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID, title, description, content });
    },
  );
});

app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(row);
  });
});

app.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, content } = req.body;
  db.run(
    "UPDATE posts SET title = ?, description = ?, content = ? WHERE id = ?",
    [title, description, content, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: "Post not found" });
        return;
      }
      res.json({ id, title, description, content });
    },
  );
});

app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.status(204).end();
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

## Running the Application

To start the Express server, run the following command in your project directory:

```bash
node app.js
```

You can now access the API at [http://localhost:3000/api/posts](http://localhost:3000/api/posts).

This API could be used as a backend for a frontend application built with a framework like React, Vue, or Angular.
