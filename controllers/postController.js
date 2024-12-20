const posts = require("../data/posts.js");

const connection = require("../data/db.js");

// the logic of crud routs

/*Ora passiamo ad implementare le logiche delle nostre CRUD:
Index dovrà restituire la lista dei post in formato JSON
Show dovrà restituire un singolo post in formato JSON
Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.
Bonus
Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag
In Index e Destroy, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.
Sia per la show che per la destroy fate funzionare le due API anche quando viene inviato come parametro :id lo slug del post (senza registrare nuove rotte)*/

// Recuperiamo l'id per generare il nuovo elemento
let lastId = posts.at(-1).id;

// index /posts/

function index(req, res) {
  const listPost = posts;

  res.json(listPost);
  res.send("indico tutta la lista dei posts");
}

// show /posts/:id

function show(req, res, next) {
  const id = parseInt(req.params.id);
  console.log(`Ecco il post con id: ${id}`);

  console.log(id);

  const post = posts.find((post) => post.id === id);

  let result = post;

  if (!post) {
    return next({ message: "not found", status: 404 });
    // console.log("post not found on list");

    // res.status(404);
    // result = {
    //   error: " post not found",
    //   message: "il post non è stato trovato",
    // };
  }

  res.json(result);

  //res.send("mostro il post specifico");
}

//( il paramentro dinamico id: in questo caso viene recuperato dal server,
// in quanto non ho parametro dinamico finchè l'elemento non esiste, perciò è una info che riguarda il server)
// store /posts/

function store(req, res) {
  const {
    title,
    content,
    image = "",
    category,
    tags,
    published = true,
  } = req.body;

  lastId++;

  const post = {
    id: lastId,
    title,
    content,
    image,
    category,
    tags,
    published,
  };

  posts.push(post);

  res.status(201).send(post);

  res.json(post);
}

// la rotta update si occupa di una modifica di un elemento esistente nelle risorse presenti
// si recupera il parametro dinamico, e modifica le informazioni presenti nel body della request, aggiornamento completo della risorsa
// update /posts/

function update(req, res) {
  // prendo id con parametro dinamico del path e lo converto in numero intero
  const id = parseInt(req.params.id);

  // recupero il primo elemento che ha l'id corrispondente al post id
  const post = posts.find((post) => post.id === id);

  // controllo se post è presente nelle mie risorse
  if (!post) {
    res.status(404);

    return res.json({
      error: "post not found",
      message: "the post not exist.",
    });
  }

  // mi recupero le propietà dell'oggetto dentro req.body
  const { title, slug, tags } = req.body;

  // aggiorno il valore di TUTTE le proprietà
  post.title = title;
  post.slug = slug;
  post.tags = tags;

  res.json(post);
}

// la rotta update si occupa di una modifica di un elemento esistente nelle risorse presenti
// si recupera il parametro dinamico, e modifica alcune informazioni presenti nel body della request,
// aggiornamento parziale della risorsa
// modify /posts/:id

function modify(req, res) {
  const id = parseInt(req.params.id);

  // recupero il primo elemento che ha l'id corrispondente al post id
  const post = posts.find((post) => post.id === id);

  // controllo se post è presente nelle mie risorse
  if (!post) {
    res.status(404);

    return res.json({
      error: "post not found",
      message: "the post not exist.",
    });
  }

  // mi recupero le propietà dell'oggetto dentro req.body
  const { title, slug, tags } = req.body;

  // aggiorno il valore delle PROPRIETA' MODIFICATE
  // facendo un controllo su ogni proprietà
  if (title) post.title = title;

  if (slug) post.slug = slug;

  if (tags) post.tags = tags;

  res.json(post);
}

function destroy(req, res) {
  const id = parseInt(req.params.id);
  console.log(`Elimino la pizza con id: ${id}`);
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    res.status(404);

    return res.json({
      error: "Post not found",
      message: "il post non è stato trovato.",
    });
  }
  // console.log(postIndex)
  posts.splice(postIndex, 1);
  res.sendStatus(204);

  res.send("elimino un post preciso");
}

// export of controller function property

module.exports = { index, show, store, update, modify, destroy };
