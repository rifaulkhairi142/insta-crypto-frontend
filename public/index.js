import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js';
import ProductRoute from './routes/ProductRoute.js';  
import db from './config/Database.js';
import AuthRoute from './routes/AuthRoute.js';
import SequelizeStore from 'connect-session-sequelize';

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db:db
});

// (async()=>{
//   await db.sync();

// })();



// Add this middleware BEFORE session and other middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "https://instacrypto.shop"
  ];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie:{
        secure:false,
samSite : 'none',
 maxAge: 24 * 60 * 60 * 1000,
//domain : 'localhost'
    }
}));

app.use(
  cors({
    credentials: true,
    origin : ['http://localhost:5173', 'https://instacrypto.shop'],
allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running");
});
