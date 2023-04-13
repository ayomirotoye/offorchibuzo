require("dotenv").config();
const app = require("../app");
const { connect } = require("./db")


const PORT = process.env.PORT
connect();



app.listen(PORT, (e) => {
    console.log(`Server running on ${PORT}`)
})