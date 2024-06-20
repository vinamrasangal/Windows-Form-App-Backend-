import express from 'express';
import bodyParser from 'body-parser';
import submissionRoutes from './routes/submissionRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', submissionRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
