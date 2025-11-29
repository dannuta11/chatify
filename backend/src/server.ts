import path from 'path';

import express from 'express';

import auth from '@api/auth';
import users from '@api/users';
import { PORT } from '@constants/index';
import { Send } from '@utils/responses';

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend', 'dist')));

// API routes
app.use('/api/auth', auth);
app.use('/api/users', users);

// Test route to see if express is working
app.get('/test', (req, res) => {
  Send.successfulResponses(res, { status: 'Express is working!!!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
