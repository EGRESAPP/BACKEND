require('dotenv').config();
const server = require("./src/server");
const dbConnect = require("./src/lib/db");


dbConnect()
.then(()=>{
    console.log("database connected");
    server.listen(8080,()=>{
        console.log("Server listening... port:8080")
    });
})
.catch(error => console.error(error));