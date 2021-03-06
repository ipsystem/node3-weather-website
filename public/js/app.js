const searchWeather = (location) => {
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            }else{
                console.log(data.location)
                console.log(data)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.desc
                messageIcon.src = data.forecast.icon
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageIcon = document.querySelector('#message-icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = search.value
    searchWeather(location)
})


