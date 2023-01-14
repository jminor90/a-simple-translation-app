const $language1Input = $('#language1Input')

const $userTranslateInput = $('#userTranslateInput')
const $submitBtn = $('#submitButton')

const translateAPIkey = `AIzaSyBD1YPYxIGxb0Fs4qjXKgba41XhADpNF-8`;

const cloudURL = `https://translation.googleapis.com/language/translate/v2/languages?key=${translateAPIkey}&target=en`

let userSearch = $language1Input.val()


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

  //console.log(foundLang)

  const translateURL = `https://translation.googleapis.com/language/translate/v2?key=${translateAPIkey}`

  fetch (translateURL, {
    method: "POST",
    body: JSON.stringify({
      q: "Space: the final frontier",
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
    console.log(translateData)
  })
}


function buttonFunction(event) {
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

$submitBtn.on("click", buttonFunction)