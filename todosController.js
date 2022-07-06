const createError = require('http-errors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://alyzande2:password2@cluster0.khie2.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
const {Todo} = require ('./models/todos')


exports.index = function (req, res) {
  //old connection
  //  client.connect (async (err) => {
  //   const findResult = client.db('mySecondDatabase').collection('todos').find();
  //   const result = await findResult.toArray();
  //   res.send(result);
  // });
  Todo.find()
  .then(todos =>
    res.send(todos))
}

exports.create = function (req, res, next) {
  if (!req.body.name) {
    return (next(createError(400, "name is required")))
  }
  // client.connect ((err) => {
  //   client.db('myFirstDatabase')
  //   .collection('todos')
  //   .insertOne({

  //     name: req.body.name,
  //     description: req.body.description 
  //   })
  //   .then  ( () => {res.send({result:true})})
  // });
  const todo = new Todo ({ name: req.body.name})
  todo.save()
  .then(() => res.send({ result: true }))
}

exports.show = function(req, res, next) {
  Todo.findOne({ _id: ObjectId(req.params.id)})
  .then((todoitem) => {
    console.log(todoitem)
    if (!todoitem) {
      return (next(createErrror(404, "no todo with that id")))
    }
    res.send(todoitem)
  })
}

exports.delete = function (req, res, next) {
  // client.connect (async (err) => {
  // client.db('myFirstDatabase').collection('todos').deleteOne( { id: parseInt(req.params.id)},)
  // .then ((result) => {
  //   if (result.deletedCount) {
  //     return res.send({result:true});
  //   }
  //   return (next(createError(404, "no todo with that id")))
  // })
  Todo.deleteOne({ _id: ObjectId(req.params.id)})
  .then((r) => {
    if (r.deletedCount) {
    return res.send({ result: true})
  }
  return (next(createError(404, "no todo with that id")))
})
}

exports.update = function (req, res, next) {
  // const todoitem = todolist.find((todo) => todo.id == req.params.id)
  if (!req.body.name) {
    return (next(createError(400, "name is required")))
  }
  // client.connect (async (err) => {
  //   const findResult = client.db('myFirstDatabase').collection('todos').updateOne(
  //     { id: parseInt(req.params.id)},
  //     {
  //       $set: {
  //         name: req.body.name,
  //         description: req.body.description
  //       }
  //     }
  //   )
  //   .then ((result) => {
  //     if(result.matchedCount){
  //       return res.send({result:true});
  //     }
  //     return (next(createError(404, "no todo with that id")))
  //   })
  // });
  Todo.findOne({ _id: ObjectId(req.params.id)})
  .then((result) => {
    if (!result) {
      return (next(createError(404, "no todo with that id")))
    }
    result.name = req.body.name
    result.completed = req.body.completed
    result.save().then(() => res.send({ result:true}))
  })
}