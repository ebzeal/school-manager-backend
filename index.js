import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';

const app = express();
app.use(cors());

const users = {
  1: {
    id: '1',
    firstname: 'Robin',
    username: 'Robin Wieruch',
    userType: 'Teacher',
  },
  2: {
    id: '2',
    firstname: 'Dave',
    username: 'Dave Davids',
    userType: 'Parent',
  },
  3: {
    username: 'ebzeal',
    firstname: 'Olusola',
    lastname: 'Ajayi',
    email: 'ebzeal@yahoo.com',
    password: '123456',
    userType: 'admin',
  },
  4: {
    id: '4',
    firstname: 'Dave',
    username: 'Dave Davids',
  },
  5: {
    id: '5',
    firstname: 'Dave',
    username: 'Dave Davids',
    userType: 'Student',
  },
};
// const me = users[3];

const schema = gql`
  type Query {
    users: [User!]
    me: User
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String
    firstname: String!
    lastname: String!
    fullname: String!
    email: String
    password: String!
    image: String
    userType: String!
  }
`;
const resolvers = {
  Query: {
    users: () => Object.values(users),

    user: (parent, { id }) => users[id],

    me: (parent, args, { me }) => me,
  },

  User: {
    fullname: (user) => (user.lastname ? `${user.firstname} ${user.lastname}` : user.firstname),
    userType: (user) => (user.userType ? user.userType : 'notDefined'),
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[3],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

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
