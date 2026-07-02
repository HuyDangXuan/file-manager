import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router from './routers/index.route';


const app = express();
const port = 4000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Máy chủ đang chạy trên cổng ${port}`);
});