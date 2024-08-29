const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
session = require('express-session');
// Route imports
const igdbRoutes = require('./routes/igdb_routes');

dotenv.config();

// Coors
const corsOptions = {
  origin: ['http://localhost:8081'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(
  session({
    secret: 'Yunaismybestfriendforever511022',
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/igdb', igdbRoutes);

app.use(function (req, res, next) {
  if (req.secure) {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }
  next();
});

app.listen(process.env.PORT || 3001, () =>
  console.log(
    `Server is up and running on ${
      process.env.PORT ? process.env.PORT : '3001'
    }`
  )
);

// app.get('/', (req, res) => {
//   res.redirect(
//     `${process.env.CLIENT_URL}?access_token=${req.query.access_token}`
//   );
// });

// module.exports = {
//   plugins: [new CompressionPlugin()],
// };
