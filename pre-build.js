const axios = require('axios')
var fs = require("fs");
var striptags = require('striptags');

var allActivities = []
var listOfActivityDetails = []
fromDate = "2019-06-22",
toDate = "2020-06-25",
rawData = null,
location = [{"id":1,"locationname":"Port Blair","city_id":1},{"id":2,"locationname":"Havelock","city_id":2}],
authToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM4LCJpc3MiOiJodHRwczovL3RyYXZlbGNoZWNraW5zLmNvbS9hcGl0ZXN0L2FwaS9hdXRoZW50aWNhdGUiLCJpYXQiOjE1NjMyMDA1MzIsImV4cCI6MTU2MzIwNDEzMiwibmJmIjoxNTYzMjAwNTMyLCJqdGkiOiJ4aFIwaEJkbkZrbDkxcWZXIn0.ZlIGk6HLORbkpdzMf5B_RyigIOKCP_POC1B1PW_Zqz4"
let data = {"searchdata":{
    "fromdate":"2019-06-22",
    "todate":"2019-07-25",
    "location":[{"id":1,"locationname":"Port Blair","city_id":1},{"id":2,"locationname":"Havelock","city_id":2}]
  }
}

data = JSON.stringify(data);
let  headers = {
    'Content-Type': 'application/json',
    'Authorization': authToken
  }

  function slugify(string) {
    const a = 'àáäâãåăæąçćčđďèéěėëêęǵḧìíïîįłḿǹńňñòóöôœøṕŕřßśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeeghiiiiilmnnnnooooooprrssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    string = striptags(string)
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

axios
  .post(`https://travelcheckins.com/apitest/api/booking/search/activity`, data,  {headers: headers} )
  .then(data => {
    // console.log(Object.keys(data.data.data));
    Object.keys(data.data.data).map((eachPlace)=>{
      Object.keys(data.data.data[eachPlace].data).map((eachDate)=> {
        // console.log('Activity date' , eachDate);
        data.data.data[eachPlace].data[eachDate].map((eachDetail, index)=> {
          // console.log("eachDetail" , eachDetail.name + " index " + index);
          // add date to the flat array
          eachDetail.date = eachDate
          // make sure activity is not a duplicate.
        //   sad
          if( ! allActivities.find(x => x.id === eachDetail.id) ){
            //   make location name more accessible
            eachDetail.location = data.data.data[eachPlace].name
            // create a url slug
            eachDetail.url = slugify(eachDetail.small_description)
              listOfActivityDetails.push(eachDetail) 
               allActivities.push(eachDetail)
               console.log(eachDetail.duration)
            //   console.log(allActivities,listOfActivityDetails)
          }else{
            // if duplicate add date to activity available dates 
            if (!allActivities.find(x => x.id === eachDetail.id).dates){
              allActivities.find(x => x.id === eachDetail.id).dates = []
            }
            allActivities.find(x => x.id === eachDetail.id).dates.push(eachDate)
          }
          return eachDetail
        })
        return eachDate
      })
      return eachPlace
      
    })}
    ).then( () => {
        // console.log(allActivities)
        fs.writeFile("pages.json", JSON.stringify(allActivities), (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
          });
    })
    

