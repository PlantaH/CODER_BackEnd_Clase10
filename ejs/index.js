const express = require("express")

const contenedor = require("./api/contenedor.js")
const file = new contenedor('./api/productos.txt')

const PORT = 8080 || process.env.PORT;


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(express.static('public'))

app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/productos', (req,res) =>{
    const items = file.getAll()

    res.render("index", {
        items: items,
        lenItems: items.length
    });
})
 
app.post('/productos', (req, res) => {  
    let item =  file.save(req.body.title,req.body.price,req.body.thumb)
   
    res.redirect('/productos')    
})


const server = app.listen(PORT, () => {
    console.log(`EJS: Index.js http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))