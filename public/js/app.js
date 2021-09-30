console.log('this is from the public folder!')


const query = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector('#message2')

query.addEventListener('submit', (e) => {
    e.preventDefault()
    msg2.textContent = ""
    msg1.textContent = "Loading..!"

    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.forecast
                msg2.textContent = data.location
            }
        })
    })
})