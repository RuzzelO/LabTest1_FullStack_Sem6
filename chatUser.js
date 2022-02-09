const mongoose  = require("mongoose");

const chatUserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
   
})

chatUserSchema.pre('save',(next) =>{
    console.log("Before Save")
    let now = Date.now()
    this.updatedat = now
    
    if(!this.created){
        this.created = now
    }

    next()
});

chatUserSchema.static("getUsername", function(value) {
    return this.find({username: value})
});


chatUserSchema.post('init', (doc) => {
    console.log('%s has been initialized from the db', doc._id);
})
chatUserSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
})
chatUserSchema.post('save', (doc) => {
    console.log('%s has been saved', doc._id);
})
chatUserSchema.post('remove', (doc) => {
    console.log('%s has been removed', doc._id);
})

const ChatUser = mongoose.model("ChatUser", chatUserSchema)
module.exports = ChatUser;