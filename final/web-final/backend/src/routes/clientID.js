import dotenv from 'dotenv-defaults';

// for sending process.env.CLIENT_ID to frontend
exports.getClientID = async (req, res) => {
    dotenv.config()
    if (!process.env.CLIENT_ID) {
        console.error("Missing CLIENT_ID!!!");
        process.exit(1);
    }
    res.status(200).send({client_id: process.env.CLIENT_ID});
}