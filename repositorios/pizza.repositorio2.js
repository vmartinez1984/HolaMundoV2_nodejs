import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://root:12345678@localhost:27017";
const client = new MongoClient(uri);

const database = client.db("prueba");
const collection = database.collection("pizzas");

/**
 * Regresa una lista de las pizzas
 * @returns []
 */
export async function obtenerTodasLasPizzasAsync() {
   await client.connect();

   const pizzas = await collection.find({}).toArray();

   return pizzas;
}

/**
 * Regresa la pizza del id buscado o undefined si no lo encuentra
 * @param {*} id
 */
export async function obtenerPizzaPorIdAsync(id) {
   await client.connect();

   const pizza = await collection.findOne({
      _id: new ObjectId(id)
   });

   return pizza;
}

/**
 * Agrega una pizza
 * @param {*} pizza
 * @returns {string}
 */
export async function agregarPizzaAsync(pizza) {
   await client.connect();

   const resultado = await collection.insertOne(pizza);

   return resultado.insertedId.toString();
}

/**
 * Actualiza una pizza existente
 * @param {*} id
 * @param {*} pizza
 */
export async function actualizarPizzaAsync(id, pizza) {
   await client.connect();

   const resultado = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: pizza }
   );

   return resultado.modifiedCount > 0;
}

/**
 * Elimina una pizza
 * @param {*} id
 */
export async function eliminarPizzaAsync(id) {
   await client.connect();

   const resultado = await collection.deleteOne({
      _id: new ObjectId(id)
   });

   return resultado.deletedCount > 0;
}