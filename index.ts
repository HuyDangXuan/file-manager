import express from 'express';
import router from './routers/index.route';

const app = express();
const port = 4000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Máy chủ đang chạy trên cổng ${port}`);
});