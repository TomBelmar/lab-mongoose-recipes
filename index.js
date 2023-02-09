const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const panquecas = ({
  title: "Panquecas de Aveia",
  level:"Easy Peasy",
  ingredients:"Colocar os ovos numa taça juntar a farinha de aveia e o iogurte natural e mexer",
  dishType:"breakfast",
  image: "https://anasousanutricionista.com/wp-content/uploads/2021/10/Panqueca-de-Aveia-1-1024x1024.jpg",
  duration: 10,
  creator:"Chef"
});

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    await Recipe.create(panquecas)
    const insert = await Recipe.insertMany(data)
    insert.forEach(insertTitle => console.log(insertTitle.title));
    const updatedRecipe = await Recipe.updateOne(
      { duration: 220 },
      { duration: 100 }
    );
    console.log("Recipe Updated");
    const deleteRecipe = await Recipe.deleteOne({title: "Carrot Cake"});
    console.log ("Recipe Delete")

    // Run your code here, after you have insured that the connection was made
    dbConnection.disconnect();
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
