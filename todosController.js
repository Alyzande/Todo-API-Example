const createError = require('http-errors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://alyzande:password@cluster0.khie2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});

// let todolist = []
// let idno = 0

exports.index = function (req, res) {
  //old connection
  // res.send(todolist)
  client.connect (async (err) => {
    const findResult = client.db('myFirstDatabase').collection('todos').find();
    const result = await findResult.toArray();
    res.send(result);
  });
}

exports.create = function (req, res, next) {
  if (!req.body.name) {
    return (next(createError(400, "name is required")))
  }
  client.connect ((err) => {
    client.db('myFirstDatabase')
    .collection('todos')
    .insertOne({
      // id: idno,
      name: req.body.name,
      description: req.body.description 
    })
    .then  ( () => {res.send({result:true})})
  });

  // old connection
  // todolist.push({ id: idno, name: req.body.name })
  // res.send({ result: true })
  // idno++
}

// exports.show = function (req, res, next) {
//   const todoitem = todolist.find((todo) => todo.id == req.params.id)
//   if (!todoitem) {
//     return (next(createError(404, "no todo with that id")))
//   }
//   res.send(todoitem)
// }

exports.delete = function (req, res, next) {
  client.connect (async (err) => {
  client.db('myFirstDatabase').collection('todos').deleteOne( { id: parseInt(req.params.id)},)
  .then ((result) => {
    if (result.deletedCount) {
      return res.send({result:true});
    }
    return (next(createError(404, "no todo with that id")))
  })
});
}

exports.update = function (req, res, next) {
  const todoitem = todolist.find((todo) => todo.id == req.params.id)
  if (!req.body.name) {
    return (next(createError(400, "name is required")))
  }
  client.connect (async (err) => {
    const findResult = client.db('myFirstDatabase').collection('todos').updateOne(
      { id: parseInt(req.params.id)},
      {
        $set: {
          name: req.body.name,
          description: req.body.description
        }
      }
    )
    .then ((result) => {
      if(result.matchedCount){
        return res.send({result:true});
      }
      return (next(createError(404, "no todo with that id")))
    })
  });
}

