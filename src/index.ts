import express from 'express';
import userRoutes from './routes/userRoutes';
import dispatcherRoutes from './routes/dispatcherRoutes';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import parcelRoutes from './routes/parcelRoutes';
import ratingRoutes from './routes/ratingRoutes';
import targetRoutes from './routes/targetRoutes';


const app = express();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/dispatcher", dispatcherRoutes);
app.use("/auth", authRoutes);
app.use("/order", orderRoutes);
app.use("/parcel", parcelRoutes);
app.use("/rating", ratingRoutes);
app.use("/target", targetRoutes);



app.get('/', (req, res) => {
  res.send('Hello Big Bytes!');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});