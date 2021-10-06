const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');
const mongoose = require('mongoose');





async function startServer(){
const app = express();
const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

await apolloServer.start();
apolloServer.applyMiddleware({app:app});

app.use((req, res) => {
    res.send('hello from the apolo server');
});

await mongoose.connect('mongodb://localhost:27017/post_db',{
    useUnifiedTopology: true,
    useNewUrlParser: true 
});
console.log("mongodb is connectred")
app.listen(4000, ()=>{
    console.log("app is running at port 4000");
});
}

startServer();