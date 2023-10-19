const mongoose = require("mongoose");

(async () => {
    try {
        mongoose.set("strictQuery", false);

        const mongoDBURL = ""; // MongoDB server URL
        await mongoose.connect(mongoDBURL);
        
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
})();