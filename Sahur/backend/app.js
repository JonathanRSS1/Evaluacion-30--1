// Importo todo lo de la libreria de Express
import express from "express";


import loginRoute from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js"


import clientsRoutes from "./src/routes/clients.js"
import registerClientRoutes from "./src/routes/registerClients.js";

import employeeRoutes from "./src/routes/employees.js";
import registerEmployessRoutes from "./src/routes/registerEmployees.js";

import moviesRoute from "./src/routes/movies.js";



import cookieParser from "cookie-parser";




// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());
//Que postman acepte guardar cookies
app.use(cookieParser());


app.use("/api/clients", clientsRoutes);
app.use("/api/registerClients", registerClientRoutes);

app.use("/api/employee", employeeRoutes);
app.use("/api/registerEmployees", registerEmployessRoutes);


app.use("/api/movies", moviesRoute);

app.use("/api/login", loginRoute);

app.use("/api/logout", logoutRoute);












// Exporto la constante para poder usar express en otros archivos
export default app;