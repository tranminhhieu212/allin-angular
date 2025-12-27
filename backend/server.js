const app = require("./src/index");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log('Counterparty server running on port', PORT);
})

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    })
})
