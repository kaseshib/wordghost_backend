const app = require('express')();
const fs = require('fs')
const cors = require('cors')

var corsOptions = {
    origin: ['https://wordghost-d4c0f.web.app', 'localhost:3000', 'wordghost.org'],
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

let rawwords = fs.readFileSync('collins.json');


let words = JSON.parse(rawwords)


const PORT = process.env.PORT || 5000;

function shortenDef(def) {
    if (def.length < 150) {
        return def
    }
    return def.slice(0, 150) + "..."
}

app.get("/:word", (req, res) => {
    input = req.params["word"]
    definition = words[input]

    var output = { "definition": "" }
    if (definition) {
        definition = shortenDef(definition)
        output = {
            "definition": definition
        }
    }
    res.send(output)
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}!`);
});