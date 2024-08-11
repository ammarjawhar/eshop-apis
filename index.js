import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
import multer from 'multer';
import path from 'path';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRouts.js';

const app = express();
app.use(cors());

dotenv.config();
const port = process.env.PORT || 8000;

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: './uploads/images',
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
    return cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('api is running');
});

app.use('/images', express.static('./uploads/images'));
app.post('/upload', upload.single('product'), (req, res) => {
  res.status(200).json({
    success: true,
    image_url: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  });
});

app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
