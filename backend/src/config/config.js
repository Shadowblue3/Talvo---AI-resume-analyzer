if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not present in the environment variables")
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not present in the environment variables")
}

if(!process.env.GEMMA_API_KEY){
    throw new Error("GEMMA_API_KEY is not present is the environmental variables")
}

config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GEMMA_API_KEY: process.env.GEMMA_API_KEY
}

module.exports = config