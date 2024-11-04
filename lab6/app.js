const express = require ( "express" );
const fs = require( "fs" );

const app = express(); 


const port = 3000; 



app.use(express.static("public"));



app.use(express.urlencoded({ extended: true})); 



app.listen (port, () => {
    console.log (`Server is running on http://localhost:${port}`);
});



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html")
});

app.get("/app", (req, res) => {
    res.sendFile(__dirname + "/public/notevote.html")
});


app.post ("/public/home", (req, res) => {
    const { email, password } = req.body;
    fs.readFile ( __dirname + "/emailpass.json",
        "utf8", 
        ( err, jsonString ) => {
if ( err ) {
    console.log("Error reading file:", err);
    return;
}
try {
    const user = JSON.parse(jsonString);
    let isValidUser = false;

    for(let i = 0; i<user.length; i++){
        if (user[i].email === email && user[i].password === password) {
            isValidUser = true;
            break;
    }
}
    if(isValidUser === true)
        res.redirect("/app");
    else{
        res.redirect("/");
}
    

} catch ( err ) {
    console.log("Error parsing JSON:", err);
}
});
});