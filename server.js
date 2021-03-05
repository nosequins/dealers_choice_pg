const express= require('express');
const {client, syncAndSeed}= require('./db')
const path= require('path')
const app= express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/commands', async(req, res)=>{
    try{
        const commands= (await client.query('SELECT * FROM "Commands" ;')).rows;
        res.send(`<html>
            <head>
                <link rel='stylesheet' href='/public/style.css'/>
                <title>Stata Commands</title>
            </head>
            <body>
                <h1>Stata Commands</h1>
                <div class= 'commands'>
                    ${commands.map(command=>(
                        `<div class='stataCommand>
                            <div class='box'>
                                ${command.id}|<a href="http://localhost:3000/commands/${command.id}"> ${command.command}</a>
                            </div>
                            <div>
                                ${command.link}
                            </div>
                        </div>`
                    )).join('')}

                </div>
            </body>
        </html>`)

    }catch(err){
        console.log(err)
    }

})
app.get('/commands/:id', async(req, res)=>{
    try{ 
        const stataName= (await client.query('SELECT * FROM "Commands" WHERE id = $1;',[req.params.id])).rows
        res.send(`<html>
            <head>
                <link rel='stylesheet' href='/public/style.css'/>
                <title>${stataName[0].command}</title>
            </head>
            <body>
                <h1>${stataName[0].command}</h1>
                <div class= 'commands'>
                    ${stataName.map(command=>(
                        `<div class='namesId box'>
                            <div>
                                ${command.id}| ${command.command}
                            </div>
                            <div>
                                ${command.description}
                            </div>
                            <div>
                                ${command.example}
                            </div>
                            <div>
                                <a href='${command.link}'>Click here for stata documentation on ${command.command}</a>
                            </div>
                        </div>`
                    )).join('')}

                </div>
            </body>
        </html>`)
    }catch(err){
        console.log(err)
    }
    
})
app.get('/', async(req, res)=>{
    try{
        res.redirect('/commands');
    }catch(err){
        console.log(err);
    }
})

const init= async()=>{
    try{
        await client.connect()
        await syncAndSeed()
        const port = process.env.PORT || 3000;
        app.listen(port, ()=>{
            console.log(`listening to port ${port}`)
})
    }catch(err){
        console.log(err)
    }
    
}
init()