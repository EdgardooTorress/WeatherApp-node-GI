
console.log("cliente side javascript file is working")


// Get elements from the DOM
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// create an even to handle the submit
weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()

    const location = search.value // get the calue from the imput

    messageOne.textContent = "Loading ..."  // display loading while getting the data from API
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => { 
    response.json().then((data) => {
        if(data.error){
           messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        
   
    })
})

})