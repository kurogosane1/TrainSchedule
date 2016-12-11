$(document).ready(function(){



  // var tFrequency = 3;

  //     // Time is 3:30 AM
  //     var firstTime = "03:30";

  //     // First Time (pushed back 1 year to make sure it comes before current time)
  //     var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  //     console.log(firstTimeConverted);

  //     // Current Time
  //     var currentTime = moment();
  //     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  //     // Difference between the times
  //     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  //     console.log("DIFFERENCE IN TIME: " + diffTime);

  //     // Time apart (remainder)
  //     var tRemainder = diffTime % tFrequency;
  //     console.log(tRemainder);

  //     // Minute Until Train
  //     var tMinutesTillTrain = tFrequency - tRemainder;
  //     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  //     // Next Train
  //     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  //     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
      
      //initializing firebase//
      // Initialize Firebase
        var config = {
          apiKey: "AIzaSyC5mPvjwaRoIX5so4EBPQzDcb5-7bajaTE",
          authDomain: "train-b8651.firebaseapp.com",
          databaseURL: "https://train-b8651.firebaseio.com",
          storageBucket: "train-b8651.appspot.com",
          messagingSenderId: "843961182513"
        };
        firebase.initializeApp(config);



        //this variable would be where the firebase database would be stored//
        var database = firebase.database();

        var name ="";
        var destination = '';
        var time = '00:00';
        var frequency= 0;
        var firstTimeConverted;


      $("#submit").on('click',function(){
        // This is where the user input would be stored at//

        var name = $('#nameReq').val();
        var destination = $('#desReq').val();
        var time = $('#trainTimer').val();
        var form = "hh:mm";
        var timeConv = moment(time,'hh:mm');
        console.log(timeConv);//this is simply to check if its working or not//
        var enteredFreq = $('#trainFreqr').val();
        console.log(enteredFreq);//This is a check//
        var frequency = parseInt($('#trainFreqr').val());
        var currentTime = moment();

        // var firstTime = time;

        // First Time (pushed back 1 year to make sure it comes before current time)
        firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Difference between the times//
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment(tMinutesTillTrain).add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain,"hh:mm"));




        //this is to test if the values are actually stored in the variable so kind of like a test//
        console.log(name);
        console.log(destination);
        console.log(time);
        console.log(form);
        console.log(timeConv);
        console.log(enteredFreq);
        console.log(frequency);
        console.log(tMinutesTillTrain);
        console.log(nextTrain);
       

        //Code for the push to firebase//
        database.ref().push({
          name: name,
          destination: destination,
          time: time,
          frequency: frequency,
        
          tMinutesTillTrain: tMinutesTillTrain,

        });
        console.log('just fired push')
    //Don't refresh the page//
       return false;
       });

      database.ref().on("child_added", function(snapshot){
    //log everything that's coming out of snapshot//
        console.log(snapshot.val());
        console.log(snapshot.val().name);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().time);
        console.log(snapshot.val().frequency);
        console.log(snapshot.val().tMinutesTillTrain)

  //Change to HTML to reflect//
        $("#trainName").append('<tr><td>'+ snapshot.val().name+   '<td><tr>');
        $("#trainDes").append('<tr><td>'+ snapshot.val().destination+'<td><tr>');
        $("#trainFreq").append('<tr><td>'+snapshot.val().frequency+'<td><tr>');
        $("#trainTime").append('<tr><td>'+snapshot.val().time+'<td><tr>');
        $("#trainArr").append('<tr><td>'+snapshot.val().nextTrain+'<td><tr>');
        $("#trainMin").append('<tr><td>'+snapshot.val().tMinutesTillTrain+'<td><tr>');


      },function(errorObject){//this is to check if an error that would be brought up//
    console.log('errors handled: ' + errorObject.code);
  });
});



