import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
import multer from 'multer';
import path from 'path';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRouts.js';

const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: './uploads/images',
  filename: function (req, file, cb) {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

app.use('/images', express.static('./uploads/images'));
app.post('/upload', upload.single('product'), (req, res) => {
  res.status(200).json({
    success: true,
    image_url: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  });
});

app.get('/', (req, res) => {
  res.send('api is running');
});
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectDB();
});
