// ***Things to do:***
// - Figure out where the name parameter for the usersDB went (√)
// - Figure out how to automate the commenting of default items (√)
// - Figure out how to take the array of documents for each event and display it on the screen (√)
// - Figure out how to add scheduled classes to an array and display it on a profile page (√)
// - Build a search/filter feature (√)
// - Figure out how to decrement the number of spots left (√)
// - Create a team page



//Johanan Abraham
//12/20/2022

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// ----------------MongoDB Stuff----------------


mongoose.connect("mongodb+srv://admin-jo:iatestpassword2023@ia2023.05snhr0.mongodb.net/usersDB", {useNewUrlParser: true});
// mongoose.connect("mongodb+srv://admin-jo:iatestpassword2023@ia2023.05snhr0.mongodb.net/schedulerDB", {useNewUrlParser: true});
const conn = mongoose.createConnection('mongodb+srv://admin-jo:iatestpassword2023@ia2023.05snhr0.mongodb.net/schedulerDB', {useNewUrlParser: true});

//Setting up DB

const usersSchema = {
  memberID: Number,
  password: String,
  name: String,
  ipAddress: String,
  classes: Array
};

const eventsSchema = {
  title: String,
  date: String,
  startTime: String,
  endTime: String,
  instructor: String,
  image: String,
  spotsLeft: Number,
  description: String,
};

const User = mongoose.model("User", usersSchema);

const Event = conn.model("Event", eventsSchema);



const user1 = new User({
  memberID: 25968
});

const user2 = new User({
  memberID: 53201
});

const user3 = new User({
  memberID: 42716
});

const defaultUsers = [user1, user2, user3];


//change the descriptions
const event2 = new Event({
  title: "Yoga Level One",
  date: "03/15/2023",
  startTime: "2:30pm",
  endTime: "3:30pm",
  instructor: "Sebastian Vettel",
  image:"/images/yoga.jpg",
  spotsLeft: 25,
  description: "A fun and relaxing class for intermediate to beginners looking to improve their yoga skills."
});

const event1 = new Event({
  title: "Boxing 101",
  date: "03/15/2023",
  startTime: "2:30pm",
  endTime: "3:30pm",
  instructor: "Max Verstappen",
  image: "/images/boxing.jpg",
  spotsLeft: 25,
  description: "This class is designed to introduce participants to the fundamentals of boxing, from footwork and punching technique to defensive strategies and conditioning drills."
});

const event5 = new Event({
  title: "Advanced Self-Defense",
  date: "03/21/2023",
  startTime: "5:30pm",
  endTime: "6:30pm",
  instructor: "Sergio Perez",
  image: "/images/defense.webp",
  spotsLeft: 15,
  description: "Only for experienced students looking to develop their self-defense skills"
});

const event3 = new Event({
  title: "Positive Mindefulness",
  date: "03/18/2023",
  startTime: "10:30am",
  endTime: "11:30pm",
  instructor: "Daniel Riciardo",
  image: "/images/mindefullness.webp",
  spotsLeft: 15,
  description: "All levels are welcome! The goal of this class is to improve your overall mindefulness"
});

const event4 = new Event({
  title: "Money Management 101",
  date: "03/21/2023",
  startTime: "2:30pm",
  endTime: "3:30pm",
  instructor: "Lance Stroll",
  image: "/images/money.jpg",
  spotsLeft: 35,
  description: "This class is specifically for beginners looking to gain tips for money management."
});

const event9 = new Event({
  title: "Effective Leadership",
  date: "04/13/2023",
  startTime: "6:30pm",
  endTime: "7:30pm",
  instructor: "Mattia Binotto",
  image: "/images/leader.jpg",
  spotsLeft: 35,
  description: "This class is open to all levels and for those seeking to become effective leaders."
});

const event6 = new Event({
  title: "How to Deal with Adversity",
  date: "04/10/2023",
  startTime: "12:30am",
  endTime: "1:30pm",
  instructor: "Alex Albon",
  image: "/images/adversity.jpg",
  spotsLeft: 35,
  description: "This class is open to all levels and delves into the topic of how to deal with adversity."
});

const event8 = new Event({
  title: "Anger Management",
  date: "04/13/2023",
  startTime: "2:30pm",
  endTime: "3:00pm",
  instructor: "Yuki Tsunoda and Kimi Raikkonen",
  image: "/images/anger.jpg",
  spotsLeft: 25,
  description: "This class is specifically for beginners students and those seeking to improve their control on their tempers."
});

const event7 = new Event({
  title: "Fitness Stamina",
  date: "04/13/2023",
  startTime: "2:30pm",
  endTime: "3:30pm",
  instructor: "Fernando Alonso",
  image: "/images/stam.jpg",
  spotsLeft: 35,
  description: "This class is designed to help participants increase their endurance through a combination of cardiovascular exercises and strength training."
});

const event10 = new Event({
  title: "How to Build Self-Confidence",
  date: "04/18/2023",
  startTime: "5:30pm",
  endTime: "6:30pm",
  instructor: "George Russell",
  image: "/images/confi.webp",
  spotsLeft: 15,
  description: "This class is designed to help participants develop a positive and resilient mindset by teaching them practical techniques to overcome self-doubt and negative self-talk."
});

const event11 = new Event({
  title: "Strategic Conversationalism",
  date: "04/18/2023",
  startTime: "5:30pm",
  endTime: "6:30pm",
  instructor: "Lewis Hamilton",
  image: "/images/strat.jpg",
  spotsLeft: 15,
  description: "This class is designed to help participants improve their communication skills and build stronger relationships through intentional and strategic conversations."
});



const defaultEvents = [event1, event2, event3, event4,event5,event6,event7,event8,event9,event10,event11];


let ipAdress = 0;
let tempIP = 0;


// ----------------Rendering the Schedule Page----------------
app.get("/schedule", function(req, res){

  Event.find({}, function(err, foundEvents){
    if (foundEvents.length === 0){
      Event.insertMany(defaultEvents, function(err){
        if(err){
          console.log(err); 
        } else{
          console.log("Sucessfully saved events into the DB");
        }
      });
      res.redirect("/schedule");
    } else{
      res.render("schedule", {events: foundEvents, addedClassIsMatch: null, noResults: false});
    }
  });
});



//Started: 3/7/23
// ----------------Adding Classes For Users----------------
app.post("/schedule", function(req, res){

  function findClass(req, res, callback, callback2){
    fetch('https://ipapi.co/json/')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      tempIP = data.ip;
      const idOfAddedClass = req.body.addClass; //finds the id of the class that the user wants to add
      let classTitle = "";
      let classDate = "";
      let spots = 0;
      let startTime = "";
      Event.findOne({_id: idOfAddedClass}, {"title":1, "date":1, "spotsLeft":1, "startTime":1},function(err, foundEvent){ //querys the DB
        classTitle = foundEvent.title;
        classDate = foundEvent.date;
        spots = foundEvent.spotsLeft;
        startTime = foundEvent.startTime;
        callback(req, res, classTitle, classDate, idOfAddedClass, spots, tempIP, startTime, callback2)
      });
    })


  }


  function checkAvailability(req, res, classTitle,classDate, idOfAddedClass, spots, tempIP, startTime, callback2){
    spots = spots - 1;
    const newClass = [classTitle, classDate, startTime];
    let takenClass = false;
    User.findOne({ipAddress: tempIP}, {"classes":1, "date":1, "startTime":1},function(err, foundUser){ //querys the DB
      console.log(foundUser);
      let classes = foundUser.classes;
      classes.forEach((c) => {
        console.log(c[1]);
        if(c[0] === classTitle || (c[1] === classDate && c[2] === startTime)){
          takenClass = true;
        }
      });

      callback2(req, res, takenClass, tempIP, idOfAddedClass, spots, newClass)
    });

  }

  function updateDB(req, res, takenClass, tempIP, idOfAddedClass, spots, newClass){

    // console.log(takenClass);
    if(takenClass === false){
      Event.updateOne({_id: idOfAddedClass}, {$set: {spotsLeft: spots} }, function(err, res){
        if (err) throw err;
      });
      User.updateOne({ipAddress:tempIP},{$push: {classes: newClass} }, function(err,res){ //updating the DB
        if (err) throw err;
      });
      Event.find({}, function(err, foundEvents){
        res.render("schedule", {events: foundEvents, addedClassIsMatch: false, noResults: false});
      });
    }

    else{
      Event.find({}, function(err, foundEvents){
        res.render("schedule", {events: foundEvents, addedClassIsMatch: true, noResults: false});
      });

    }


  }
  findClass(req, res, checkAvailability, updateDB);
});


app.get("/search-bar", function(req, res){
  res.redirect("/schedule");
})

app.post("/search-bar", function(req, res){

  function handleSearchBar(req, res, callback1){
    const searchValue = req.body.searchbar;
    let searchResults = [];
    Event.find({}, function(err, foundEvents){
      foundEvents.forEach(function(event){
        // title, date, and instructor
        if(event.title === searchValue || event.date === searchValue || event.instructor === searchValue){
          console.log(searchValue);

          searchResults.push(event);
          console.log(searchResults);
        }
      })
      let noRes = false;
      if(searchResults.length === 0){
        noRes = true;
      }
      callback1(req, res, searchResults, noRes);
    });

  }

  function renderResults(req, res, searchResults, noRes){
    console.log(searchResults);
    res.render("schedule", {events: searchResults, addedClassIsMatch: false, noResults: noRes});
  }
  handleSearchBar(req, res, renderResults);
})






// ----------------Rendering Stuff----------------
app.get("/", function(req, res){
  fetch('https://ipapi.co/json/')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    ipAdress = data.ip;
    })

  User.find({}, function(err, foundUsers){
    if (foundUsers.length === 0){
      User.insertMany(defaultUsers, function(err){
        if(err){
          console.log(err); 
        } else{
          console.log("Sucessfully saved users into the DB");
        }
      });
      res.redirect("/");
    } else{
      res.render("home-page");
    }
  });
});





// ----------------Signing Up and Saving Credentials----------------
//Completed: 1/09/2023 10:53am
app.post("/sign-up", function(req, res){

  var result = undefined;
  var output = undefined;
  var computationFinished = undefined;

  function query(req, res, id, callback, callback2){

    User.findOne({memberID:id}, function(err, foundUser){ //Method to find member in the DB

      if(err){
        console.log(err);
      }
      if(foundUser !== null){ //If a user is found it sets result to true
        result = true;
      }else{
        result = false;
      }
      callback(req, res, result, callback2); //calls the callback function to update variables
    }) //End of User.findOne function
  } //End of query function

  function logResult(req, res, logResult, callback2){
    output = result;
    computationFinished = true; //updates all the variables and calls the second callback function
    callback2(req, res, computationFinished)
  }

  function updateDB(req, res, computationFinished){

    if(computationFinished){ //this function handles updating the DB

      if(output == true){
        const pass = req.body.p;
        const n = req.body.n;
        User.updateOne({memberID:req.body.ID},{$set: {password: pass, name: n, ipAddress: ipAdress} }, function(err,res){ //updating the DB
          if (err) throw err;
        });
        console.log("right cred");
        res.render("sign-up",{wrongCred:false});
      } else{
        console.log("wrong cred");
        res.render("sign-up", {wrongCred:true}); //If there is not member then it displays the error message
      }
    }
  }
  query(req, res, req.body.ID, logResult, updateDB);
});//End of sign-up post


app.get("/sign-up", function(req, res){

  res.render("sign-up", {wrongCred:null});
});
// ----------------End of all sign-up related functions----------------





// ----------------Signing In and Authenticating Credentials----------------
//Started: 1/11/2023 10:36am
//Completed: 1/11/2023 11:12am
app.get("/sign-in", function(req, res){
  res.render("sign-in",{wrongCred:null});
});

app.post("/sign-in", function(req, res){
  var result = undefined;
  var output = undefined;
  var computationFinished = undefined;

  function query(req, res, id, pass, callback){

    User.findOne({memberID:id, password:pass}, function(err, foundUser){ //Method to find member in the DB

      if(err){
        console.log(err);
      }
      if(foundUser === undefined || foundUser === null){ //If a user is found it sets result to true
        result = false;
      }else{
        result = true;
      }
      callback(req, res, result); //calls the callback function to update variables
    }); //End of User.findOne function
  } //End of query function

  function logResult(req, res, result){
    output = result;
    computationFinished = true; //updates all the variables and calls the second callback function
    if(output == true){
      res.render("sign-in",{wrongCred:false});
    } else{
      console.log(output);
      res.render("sign-in",{wrongCred:true}); //If there is not member then it displays the error message
    }
  }

  query(req, res, req.body.ID, req.body.p, logResult);
});//End of sign-up post


app.get("/sign-in", function(req, res){

  res.render("sign-in",{wrongCred:null});
})
// ----------------End of sign in functions---------------


app.get("/profile", function(req, res){
  fetch('https://ipapi.co/json/')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    ipAdress = data.ip;
    User.findOne({ipAddress:ipAdress},{"name":1, "classes":1}, function(err, foundUser){
      // console.log(foundUser);
      res.render("profile", {userName: foundUser.name, addedClasses: foundUser.classes});
    });
    })
})

app.get("/our-team", function(req, res){
  res.render("our-team");
})


// app.post("/cancel", function(req, res){
//   fetch('https://ipapi.co/json/')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(req.body.cancel);
//     ipAdress = data.ip;
//     User.findOne({ipAddress:ipAdress}, function(err, foundUser){
//
//
//     });
//   })//get id of class
// })



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

// ----------------Running the website on localhost:3000----------------
app.listen(port, function(){
  console.log("Server has started sucessfully");
});
