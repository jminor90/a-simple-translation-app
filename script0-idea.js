const $searchBar = $('#searchBar')
const $submitBtn = $('#submitButton')


let userSearch = $searchBar.val()



function getTranslateAPI(seachBarVal) {

  userSearch = seachBarVal

  //const cloudURL = `https://translation.googleapis.com/language/translate/v2/languages?key=${translateAPIkey}`

  const countriesURL = `https://restcountries.com/v3.1/name/${userSearch}`;

  fetch (countriesURL)
  .then(function(serverResponse) {
    if (serverResponse.status !== 200 ) {
      alert("UH OH"+serverResponse.status)
      console.log("uh oh"+serverResponse.status)
    } else {
      return serverResponse.json();
    }
  })

  .then (function(data) {

    console.log(data)

    responseFunction(data)

  })
}

const $container = $('.container')

function responseFunction(data) {

  //VARIABLES 
  const dataCurrencies = JSON.stringify( data[0].currencies).split("\"")[1]//JSON.stringify()  .split("\"")[1]
  const dataLanguage = JSON.stringify(data[0].languages).split("\"")[3]//JSON.stringify() .split("\"")[3]
  const dataFlag = data[0].flags.png

  // const dataCurrenciesStr = JSON.stringify (Object.getOwnPropertyNames(dataCurrencies)[0]).slice(1,4)
  
  
  console.log(dataCurrencies)
  console.log(dataLanguage)
  console.log(dataFlag)

  
  const $pCurrency = $('<p>')
  const $pLanguage = $('<p>')
  const $imgFlag = $('<img>')
  const $divData = $('<div>')

  //ATTRIBUTES CLASSES TEXT CONTENT
  $pCurrency.text(`Currency: `+dataCurrencies)
  $pLanguage.text(`Language: `+dataLanguage)
  $imgFlag.attr("src", dataFlag)

  //APPENDING!
  $container.append($divData)
  $divData.append($pCurrency)
  $divData.append($pLanguage)
  $divData.append($imgFlag)
}

function buttonFunction() {
  const seachBarVal = $searchBar.val()
  console.log("Button Clicked")

  console.log(seachBarVal)
  getTranslateAPI(seachBarVal)
}

$submitBtn.on("click", buttonFunction)





/*
function renderCountryData (data) {
  

}
*/

//getTranslateAPI();