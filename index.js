import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json('This is School Manager');
});
app.get('*', (req, res) => {
  res.status(404).json({
    status: 'failure',
    data: {
      statusCode: 404,
      message: 'Route does not exist',
    },
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App started on ${port}`);
});

export default app;
