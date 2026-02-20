require("dotenv").config();

const app = require("./src/app")
const connectDB = require("./src/db/db");

const PORT = process.env.PORT || 3004;

const startServer = async() => {

    await connectDB();
    app.listen(PORT,()=>{
        console.log(`apps running at port : ${PORT}`);
    })
}

startServer();

