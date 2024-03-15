import axios from "axios";
import express from "express";
import  bodyParser       from "body-parser"

const app= express();
const port= 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get ("/", (req,res)=> {

    res.render('index.ejs',{})
})

app.post('/word', async(req,res)=>{
    try {
        const word = req.body.word;
        const response = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/'+word);
        res.render('index.ejs',{SearchedWord : response.data[0]})
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.render('index.ejs', { error: 'Error fetching data' });
    }
    }
)


app.listen(port, ()=>
{
    console.log(`server running on port ${port}`)
}
)

