 
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
   const allCheckBox = document.querySelectorAll('input[type=checkbox]');
  const symbolString = "!@#$%^&*[]{}\|;:<>?,./()_+=-" ; 

  let passwordLength= 10 ; 
  let password  = "" ; 
  let checkCount = 0 ; 
  handleSlider() ; 
  setIndicator('grey') ;



  //set PasswordLength
function handleSlider() { 
     inputSlider.value = passwordLength ; 
     lengthDisplay.innerHTML = passwordLength ; 

}

function setIndicator (color){ 
indicator.style.backgroundColor = color;  
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
     
    if(uppercaseCheck.checked) hasUpper = true ; 
    if(lowercaseCheck.checked) hasLower = true ;
     if(numberCheck.checked) hasNum = true ; 
     if(symbolCheck.checked) hasSym = true ; 

     if(hasUpper && hasLower &&(hasNum || hasSym) && passwordLength>=8) {
         setIndicator("#0f0");
     } 
     else if(
     (hasLower|| hasUpper) && 
     (hasNum|| hasSym) &&  
     passwordLength>=6 ){
        setIndicator("#ff0") ; 
     }
     else{ 
        setIndicator("#f00");
     }

}

async function copyContent() { 
    try {
      
    await navigator.clipboard.writeText(passwordDisplay.value)  ; 
      
     
    }
     catch (e) {
         copyMsg.innerText = "failed" ;
     }
     // To make copy span visible . 
      copyMsg.classList.add("active"); 

      // To remove copy span 
      setTimeout( () =>{
         copyMsg.classList.remove("active") ;
      }),2000;
}

        // To make changes in password Length after changing slider position 
inputSlider.addEventListener('input',(e)=>{
    passwordLength= e.target.value ; 
    handleSlider() ; 
});

// Shuffle the password 
// Fisher Yates Method
function shufflePassword(arrayPass)  {
     for(let i =arrayPass.length -1 ; i>0 ; i--   ) {
         const j = Math.floor(Math.random()*(i+1)) ; 
         const temp = arrayPass[i] ; 
         arrayPass[i] = arrayPass[j] ; 
         arrayPass[j] = temp ;

     }
     let str = '' ; 
     arrayPass.forEach((ele) => (str += ele));
     return str ; 
}

// Copy to clipboard Button
copyBtn.addEventListener('click' , ()=>{
    if(passwordDisplay.value) 
    {  
        
         copyContent() ; 
    }
})

//Checkbox checked or not 
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange) ;
});


function handleCheckBoxChange() { 
    checkCount =0 ; 
    allCheckBox.forEach((checkbox) => {
         if(checkbox.checked) 
         checkCount++ ; 
    });
    if(passwordLength < checkCount) { 
        passwordLength = checkCount ; 

    }
}

generateBtn.addEventListener('click',()=>{

   // none of the check box are selected 

   if(checkCount <= 0 ) return ; 
   if(passwordLength < checkCount) { 
    passwordLength = checkCount ; 
    handleSlider() ;
   }
   console.log("starting ");
    // lets start to find new password 
     password ="" ; 
    
      //lets put the stuff mentioned by chekcboxes 
       
    //   if(uppercaseCheck.checked) { 
    //     password += generateUppercase() ;
    //   }

    //   if(lowercaseCheck.checked)
    //   password += generateLowercase() ; 
    //  if(numberCheck.checked) {
    //      password += generateRandomNumber() ; 
    //  }
    //  if(symbolCheck.checked) { 
    //     password += generateSymbol() ; }

     let funArr = [] ; 

    if(uppercaseCheck.checked){ 
        funArr.push(generateUppercase) ;} 

     if(lowercaseCheck.checked)
            funArr.push(generateLowercase) ;

    if(symbolCheck.checked)
                funArr.push(generateSymbol) ;

    if(numberCheck.checked)
     funArr.push(getRandomNumber) ;
        
     //compulsory addition 

     for(let i = 0 ; i<funArr.length ; i++ ) { 
        password += funArr[i]()  ; 
     }


      //remainng addition 

      for(let i = 0 ; i<passwordLength-funArr.length; i++ )
     {
        let randomIndex = getRandomInteger(0, funArr.length) ;
        password += funArr[randomIndex]() ; 
     }

     // shuffle the PAssword 
      password = shufflePassword(Array.from(password)) ; 

      // Display Password 
       
      passwordDisplay.value = password ; 
      calculateStrength() ; 
     
})




