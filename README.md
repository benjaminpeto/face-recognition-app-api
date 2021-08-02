# face-recognition-app-api

*This is the backend of my Face-Recognition-App, built with Node and ExpressJS. Contains libraries like bcrypt for password hashing, knex and pg for the postgreSQL database, CORS to provide a middleware, and the face detection API from Clarifai.*

### If you would like to use it, you will need to register on [Clarifai](https://www.clarifai.com/models/ai-face-detection) to get you own API key. __It's free!__

After you registered on Clarifai, you will need to change the API_KEY to you own in the __./components/image.js__ file.

```// API of face recognition
const app = new Clarifai.App({
  apiKey: process.env.API_KEY,
});
```

And also you must change to your local database in the __./server.js__, inside the object.

```const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }
});
```

## You can find the live website [here](https://ai-face-recognition.herokuapp.com/), and the front-end part of my project [on this link](https://github.com/benjaminpeto/face-recognition-app).
