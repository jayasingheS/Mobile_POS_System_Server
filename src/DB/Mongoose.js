const mongoose = require('mongoose');

mongoose.connect (mongoDbUri,{useNewUrlParser: true, 
                             useUnifiedTopology: true,
                             useFindAndModify:false,
                             useCreateIndex:true    });

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo DB instance')
})
mongoose.connection.on('error',(err)=>{
    console.log('connction error',err)
})

