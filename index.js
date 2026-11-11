import express from "express";
import cors from 'cors'
import { obtenerTodasLasPizzasAsync, obtenerPizzaPorIdAsync, agregarPizzaAsync, actualizarPizzaAsync, eliminarPizzaAsync } from './repositorios/pizza.repositorio2.js'

const app = express();
app.use(cors())

const PORT = 3000; // Puerto en el que escuchará el servidor

//Configuración para usar el body en un metodo/verbo POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/pizzas", async (req, res) => {
  const pizzas = await obtenerTodasLasPizzasAsync()

  return res.status(200).json(pizzas);
});

app.get("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = await obtenerPizzaPorIdAsync(id)

  return res.status(200).json(pizza);
});

app.post("/api/v1/pizzas", async (req, res) => {
  const pizza = req.body
  const id = await agregarPizzaAsync(pizza)

  const idDto = { id: id, fecha: new Date() }
  return res.status(201).json(idDto);
})

app.put("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = await obtenerPizzaPorIdAsync(id)
  if (pizza == undefined) {
    const mensaje = { mensaje: "No existe la pizza con ese id" }
    return res.status(404).json(mensaje);
  }

  const pizzaAactualizar = req.body
  await actualizarPizzaAsync(id, pizzaAactualizar)

  const mensaje = { mensaje: "Datos actualizados" }
  return res.status(202).json(mensaje)
})

app.delete("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  await eliminarPizzaAsync(id)

  const mensaje = { mensaje: "Datos eliminados" }
  return res.status(202).json(mensaje)
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor Express escuchando en el puerto http://localhost:${PORT}`,
  );
});
