import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.config';
import requestRoutes from './routes/request.routes';

dotenv.config({
    path: process.env.NODE_ENV === "production" ? ".env" : ".env.development.local"
});

connectDB();


const app = express();

//body parser midddleware 
app.use(express.json({limit: '40kb'}));
app.use(express.urlencoded({ extended: true , limit: '40kb'}));



//global error handler
app.use((err:any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: "error",
        error: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
});




//cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE","HEAD", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "device-remember-token",
        "Allow-Control-Allow-Origin",
        "Origin",
        "Accept",
    ],
}));




app.get("/", (req, res)  => {
    res.send("API is running...");
});

//api routes
app.use("/api/requests", requestRoutes);

const PORT = process.env.PORT || 5000;


//404 handler
app.use((req,res) => {
    res.status(404).json({error: "Route not found"});
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});