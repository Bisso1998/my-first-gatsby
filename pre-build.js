const axios = require('axios')
var fs = require("fs");
var striptags = require('striptags');

var allActivities = []
var listOfActivityDetails = []
fromDate = "2019-06-22",
toDate = "2020-06-25",
rawData = null,
location = [{"id":1,"locationname":"Port Blair","city_id":1},{"id":2,"locationname":"Havelock","city_id":2}],
authToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM4LCJpc3MiOiJodHRwczovL3RyYXZlbGNoZWNraW5zLmNvbS9hcGl0ZXN0L2FwaS9hdXRoZW50aWNhdGUiLCJpYXQiOjE1NjMyNzg4MzEsImV4cCI6MTU2MzI4MjQzMSwibmJmIjoxNTYzMjc4ODMxLCJqdGkiOiJuME9wcVdhYkhRZXp4MmRSIn0.wFbLEDNmgg97UFZ6cEVY68NwyTzBlicwZWEF6IWllfI"
let data = {"searchdata":{
    "fromdate":"2019-06-22",
    "todate":"2020-06-25",
    "location":[{"id":1,"locationname":"Port Blair","city_id":1},{"id":2,"locationname":"Havelock","city_id":2}]
  }
}
login = () => {
  axios
  .post(`https://travelcheckins.com/apitest/api/authenticate`, '{"username":"ferrybooking","password":"ferrybooking"}',  {headers: {'Content-Type': 'application/json'}} )
  .then(data => {
    authToken = "Bearer "+data.data.token
    fetchData()
  })
}
login()
data = JSON.stringify(data);


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
fetchData= () =>{
  let  headers = {
    'Content-Type': 'application/json',
    'Authorization': authToken
  }
axios
  .post(`https://travelcheckins.com/apitest/api/booking/search/activity`, data,  {headers: headers} )
  .then(data => {
    Object.keys(data.data.data).map((eachPlace)=>{
      Object.keys(data.data.data[eachPlace].data).map((eachDate)=> {
        data.data.data[eachPlace].data[eachDate].map((eachDetail, index)=> {
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
              //  console.log(eachDetail.duration)
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
    

}