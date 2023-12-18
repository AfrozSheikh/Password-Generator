 
 const inputSlider = document.querySelector("[data-lengthSlider]") ; 
 const lengthDisplay = document.querySelector("[data-lengthNumber]") ; 

  const passwordDisplay = document.querySelector("[data-passwordDisplay]")
  const copyBtn = document.querySelector("[data-copy]") ; 
  const copyMsg = document.querySelector("[data-copyMsg]");
  const uppercaseCheck  = document.querySelector("#uppercase") ; 
  const lowercaseCheck = document.querySelector("#lowercase")
  const numberCheck = document.querySelector("#numbers") ;
  const symbolCheck = document.querySelector("#symbols") ;
  const indicator = document.querySelector("[data-indicator]") ; 
  const generateBtn = document.querySelector(".generateButton") ; 
  const allCheckBox = document.querySelector("input[type=checkbox]") ; 
  const symbolString = "!@#$%^&*[]{}\|;:<>?,./()_+=-" ; 

  let passwordLength= 10 ; 
  let password  = "" ; 
  let checkCount = 1 ; 
  handleSlider() ; 


  //set PasswordLength
function handleSlider() { 
     inputSlider.value = passwordLength ; 
     lengthDisplay.innerHTML = passwordLength ; 

}

function setIndicator (color){ 
indicator.style.backgroundColor = color ;  
}

function getRandomInteger(min,max) {
    return Math.floor(Math.random()*(max-min)) + min ; 
}

function getRandomNumber() {
     return getRandomInteger(0,9) ; 
}
 
function generateLowercase(){
       return  String.fromCharCode(getRandomInteger(97,123)) ; 

}

function generateUppercase(){
    return  String.fromCharCode(getRandomInteger(65,91)) ; 
}

function generateSymbol() {
    const randomNumber = getRandomInteger(0,symbolString.length) ;
    return symbolString.charAt(randomNumber) ; 

}

function calculateStrength() {
    let hasUpper = false ; 
    let hasLower = false;
     let hasNum = false ; 
     let hasSym = false ; 

}


