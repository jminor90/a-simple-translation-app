const $language1Input = $('#language1Input')

const $userTranslateInput = $('#userTranslateInput')
const $LanguageSubmit = $('#LanguageSubmit')

const $translateResult = $('#translateResult')
const $CaptPicard= $('#CaptPicard')

const translateAPIkey = `AIzaSyBD1YPYxIGxb0Fs4qjXKgba41XhADpNF-8`;

const cloudURL = `https://translation.googleapis.com/language/translate/v2/languages?key=${translateAPIkey}&target=en`

let language1Input = $language1Input.val().trim()



const $countryInput = $('#countryInput')
const $destinationSubmit = $('#destinationSubmit')
const $container = $('.container')




function nametoCodeAPI(seachBarVal) {
  fetch (cloudURL)
  .then(function(serverResponse) {
    if (serverResponse.status !== 200 ) {
      alert("UH OH"+serverResponse.status)
      console.log("uh oh"+serverResponse.status)
    } else {
      return serverResponse.json();
      
    }
  })
  .then(function(data) {

    nameToCode(data, seachBarVal)
  })

}

function nameToCode(data, SteveSearchBar) {
  //const found = data.languages.find()

  const found = data.data.languages.find(ElementBob => SteveSearchBar == ElementBob.name)
  const foundLang = found.language

  //console.log(data)
  //console.log(SteveSearchBar)
  //console.log(foundLang)

  translateAPI(foundLang)
}

function translateAPI(foundLang) {
  let userTranslateInput = $userTranslateInput.val().trim()
  console.log(userTranslateInput)

  const translateURL = `https://translation.googleapis.com/language/translate/v2?key=${translateAPIkey}`

  fetch (translateURL, {
    method: "POST",
    body: JSON.stringify({
      q: userTranslateInput,
      source: "en",
      target: foundLang,
      format: "text"
    })
  })
  .then (function (serverResponse) {
    if (serverResponse.status !== 200) {
      alert("Oh No! Error: "+serverResponse.status)
      console.log("Oh No! Error: "+serverResponse.status)
    } else {
      return serverResponse.json()
    }
  })
  .then (function(translateData) {
    //console.log(translateData)
    renderResult(translateData)
  })
}


function languageFunction(event) {
  event.preventDefault()

  const seachBarVal = $language1Input.val()
  console.log("Button Clicked")
  
  if (seachBarVal === undefined) {
    alert("You entered nothing")
    return;
  } else {

    nametoCodeAPI(seachBarVal)
  }

  //console.log('The user entered: '+seachBarVal)

  
}

function renderResult (translateData){

  let translateResult = translateData.data.translations[0].translatedText

  $translateResult.text(translateResult)
  console.log(translateResult)
  //console.log(translateResult.data.translations[0].translatedText)
  //console.log("RenderResult happening here")
}

function destinationFunction(event) {
  event.preventDefault()
  let countryInput = $countryInput.val().trim()


  console.log(countryInput)
  getRestCountryAPI(countryInput)

  //console.log("destinationFunction clicked")
}


function getRestCountryAPI(countryInput) {

  const countriesURL = `https://restcountries.com/v3.1/name/${countryInput}`;

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

    dataFunction(data)

  })
}


function dataFunction(data) {

  $container.html('');

  //VARIABLES 
  const dataCurrencies = JSON.stringify( data[0].currencies).split("\"")[1]
  const dataLanguage = JSON.stringify(data[0].languages).split("\"")[3]
  const dataLanguage2 = JSON.stringify(data[0].languages).split("\"")[7]
  const dataFlag = data[0].flags.png

  // const dataCurrenciesStr = JSON.stringify (Object.getOwnPropertyNames(dataCurrencies)[0]).slice(1,4)
  
  
  console.log(dataCurrencies)
  console.log('Language 1 '+dataLanguage)
  console.log('Language 2 '+dataLanguage2)
  console.log(dataFlag)

  $language1Input.val(dataLanguage)
  
  const $pCurrency = $('<p>')
  const $pLanguage1 = $('<p>')
  const $pLanguage2 = $('<p>')
  const $imgFlag = $('<img>')
  const $divData = $('<div>')

  //ATTRIBUTES CLASSES TEXT CONTENT
  $pCurrency.text(`Currency: `+dataCurrencies)
  $pLanguage1.text(`Language: `+dataLanguage)
  if (!dataLanguage2) {
    $pLanguage2.text(``);
  } else { 
  $pLanguage2.text(`Language 2: `+dataLanguage2)
  
}

  $imgFlag.attr("src", dataFlag)

  //APPENDING!
  $container.append($divData)
  $divData.append($pCurrency)
  $divData.append($pLanguage1)
  $divData.append($pLanguage2)
  $divData.append($imgFlag)

}

function buttonFunction() {
  const seachBarVal = $searchBar.val()
  console.log("Button Clicked")

  console.log(seachBarVal)
  getTranslateAPI(seachBarVal)
}



$LanguageSubmit.on("click", languageFunction)

$destinationSubmit.on("click", destinationFunction)
