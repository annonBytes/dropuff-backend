import express from 'express';
import userRoutes from './routes/userRoutes';
import dispatcherRoutes from './routes/dispatcherRoutes';

const app = express();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/dispatcher", dispatcherRoutes);

app.get('/', (req, res) => {
  res.send('Hello Big Bytes!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});