/*Esercizio
Milestone 1
Come prima cosa, creiamo un controller per i nostri post, in una cartella controllers.
All’interno, prepariamo tutte le funzioni necessarie e copiamo in ciascuna la logica delle funzioni che attualmente si trovano nel router (al momento restituiscono solo dei messaggi).
Poi torniamo sul file delle rotte.
Qui importiamo le funzioni dichiarate nel controller e le associamo alle varie rotte, come visto in classe.
Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima.
Se tutto funziona, passiamo alla prossima milestone
Milestone 2
Per iniziare, creiamo una cartella data in cui creare un file che contenga ed esporti l’array di posts che trovate in allegato. Importiamo questo file in cima al controller.
Ora passiamo ad implementare le logiche delle nostre CRUD:
Index dovrà restituire la lista dei post in formato JSON
Show dovrà restituire un singolo post in formato JSON
Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.
Bonus
Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag
In Index e Destroy, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.
Sia per la show che per la destroy fate funzionare le due API anche quando viene inviato come parametro :id lo slug del post (senza registrare nuove rotte)*/

const express = require("express");
const cors = require("cors");
const postRouter = require("./routers/posts.js");
const app = express();
const errorsHandler = require("./middlewares/errorsHandler.js");
const notFound = require("./middlewares/notfound.js");
const port = 3000;

app.use(cors());

// to show static asset
app.use(express.static("public")); // http://localhost:3000/imgs/posts/...

// body parsing to convert request.body content-type otherwise console.log request.body is undefined
app.use(express.json());

// main root
app.get("/", (req, res) => {
  console.log("main root");
  res.send("response server, main root");
});

// middleware for router
app.use("/posts", postRouter);

app.use(errorsHandler);
app.use(notFound);

// start server function
app.listen(port, () => {
  console.log("server listening on port 3000");
});
