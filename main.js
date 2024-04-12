import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const app = express(); 
const PORT = 3000; 
app.use(express.json());
app.use(morgan('dev'));    // Logger

app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.post('/data', (req, res) => {
    res.json({
      message: 'Data received',
      data: req.body
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
