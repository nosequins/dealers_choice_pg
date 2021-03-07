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
                <div class="logo"> 
                <img src="https://www.stata.com/includes/images/stata-logo-release-16.svg" width="150" height = "150"> 
                </div> 
                <div class='middle'>
                    <div class='commands'>
                        <div>
                            ${commands.map(command=>(
                                `<div class='stataCommand'>
                                    <div>
                                        ${command.id}|<a href="http://localhost:3000/commands/${command.id}"> ${command.command}</a>
                                    </div>
                                    <div>
                                        <a href=${command.link} target='_blank'>Click here to read command documentation</a>
                                    </div>
                                </div>`
                            )).join('')}
                        </div>
                    </div>
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
                <div class="logo"> 
	            <img src="https://www.stata.com/includes/images/stata-logo-release-16.svg" width="150" height = "150"> 
                </div> 
                <button type="button" onclick="location.href='http://localhost:3000/commands/';">Back</button>
                <div class= 'commanders'>
                    <div>
                        <div>
                            <h1>${stataName[0].command}</h1>
                        </div>
                        ${stataName.map(command=>(
                            `<div class='box'>
                                <div class='item'>
                                    ${command.id}| ${command.command}
                                </div>
                                <div class='item'>
                                    ${command.description}
                                </div>
                                <div class='item'>
                                    ${command.example}
                                </div>
                                <div class='item'>
                                    <a href='${command.link}' target='_blank'>Click here for stata documentation on ${command.command}</a>
                                </div>
                            </div>`
                        )).join('')}
                </div>
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