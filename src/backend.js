import { MongoClient, ObjectId } from "mongodb";
import express from "express";
import cors from "cors";

// required in post
const app = new express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors());




  async function findOneUser(req, res) {
    try {
      const uri = "mongodb://127.0.0.1:27017";
      const client = new MongoClient(uri);
  
      const db = client.db("TODO_PROJECT");
      const messageColl = db.collection("Users");
  
      let user =await messageColl.findOne({_id :new ObjectId(req.query.user_id)});
      console.log(user,req.query.user_id);
  
      await client.close();
      res.json(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async function login(req, res) {
    try {
      
      const uri = "mongodb://127.0.0.1:27017";
      const client = new MongoClient(uri);
  
      const db = client.db("ChiefChef");
      const messageColl = db.collection("user");
  
     
      let query = { email: req.body.email, password: req.body.password };
      let userRef = await messageColl.findOne(query);
  
      await client.close();
  
      // Negative: UserRef CANBE NULL;
      if (!userRef) {
        let errorMessage = `Record Not Found or Authentication Failure: ${req.body.email}`;
        throw new Error(errorMessage);
      }
  
      // Postive Scenario
      res.json(userRef);
    } catch (err) {
      console.log(err)
      res.status(500).send(err.message);
    }
  }
  


  async function addUser(req, res) {
    try {
      const uri = "mongodb://127.0.0.1:27017";
      const client = new MongoClient(uri);
  
      const db = client.db("ChiefChef");
      const messageColl = db.collection("user");
  
      let inputDoc = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        isAdmin : false
      };
      await messageColl.insertOne(inputDoc);
  
      await client.close();
  
      res.json({ opr: true });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async function addchef(req, res) {
    try {
      const uri = "mongodb://127.0.0.1:27017";
      const client = new MongoClient(uri);
  
      const db = client.db("ChiefChef");
      const messageColl = db.collection("chefs");

      let inputDoc = {
        name: req.body.name,
        email: req.body.email,
        address : req.body.address,
        speciality : req.body.speciality,
        mobileNumber :req.body.mobileNumber,
        image :req.body.image,
        isNonVeg : true,
        isAvailable : true
      };
      await messageColl.insertOne(inputDoc);
  
      await client.close();
  
      res.json({ opr: true });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }




async function findAllUser(req, res) {
    try {
      const uri = "mongodb://127.0.0.1:27017";
      const client = new MongoClient(uri);
  
      const db = client.db("ChiefChef");
      const messageColl = db.collection("user");
  
      let list = await messageColl.find().toArray();
      await client.close();

      res.json(list);

    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  

  async function findAllChef(req, res) {
    try {
      const uri = "mongodb://127.0.0.1:27017";
      const client = new MongoClient(uri);
  
      const db = client.db("ChiefChef");
      const messageColl = db.collection("chefs");
  
      let list = await messageColl.find().toArray();
      await client.close();

      res.json(list);

    } catch (err) {
      res.status(500).send(err.message);
    }
  }

app.post("/addUser", addUser);
app.get("/find-all-user",findAllUser);
app.get("/find-all-chef",findAllChef);
app.get("/find-one-user",findOneUser);
app.post("/login",login);
app.post("/addchef",addchef);




const port = 4000;
app.listen({port},()=>{ console.log(`Server listening on port ${port}`);});








