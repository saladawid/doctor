import express from 'express';
import cors from 'cors';
import {config} from './config/config.js';
import {connectDB} from './config/db.js';
import {patientRoutes} from './routes/patientRoutes.js';
import {handleError, notFound} from './middleware/errorMiddleware.js';
import {userRoutes} from './routes/userRoutes.js';
import {protect} from './middleware/authMiddleware.js';


connectDB();

const app = express();

app.use(cors({
    origin: config.cors,
}));

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))})


app.use(express.json());

app.use('/api/patients', protect, patientRoutes);
app.use('/api/users', userRoutes);



app.use(notFound);
app.use(handleError);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});