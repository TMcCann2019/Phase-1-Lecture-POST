// fetches information from API endpoint and processes it into usable code
// TODO: write GET request here
//using console.log in places helps debug the code throughout so there are less mistakes,
//but can also help with less errors and finding them quicker
//could have made the http a const called url and put it in where the fetches are

fetch ("http://localhost:3000/characters")
    .then ((resp) => resp.json())
    //.then ((data) => console.log(data)) //this should be next
    //as this would be to make sure
    //there are no errors in this part of the code
    .then ((data) => renderCharacters(data))

function renderCharacters(charArr) {
    // console.log(charArr)

    const ul = document.querySelector('ul')

    charArr.forEach((charObj) => {

        const li = document.createElement('li')

        // grabs name from object and places it within <p> tag
        const p = document.createElement('p')
        let name = charObj.name
        p.textContent = name
        p.style.color = '#7a2d96'

        // grabs image URL from object and sets it to <img> tag src
        const img = document.createElement('img')
        let imgURL = charObj.image
        img.src = imgURL
        img.style.margin = '5px'
        img.style.border = 'solid 2px #7a2d96'

        // combine DOM tree to render to screen
        li.appendChild(p)
        li.appendChild(img)
        // li.append(p, img)

        ul.append(li)

    })
}

// named function will be handleAddNewChar

const form = document.querySelector('form')
//console.log(form)

form.addEventListener('submit', (e) => handleAddNewChar(e))

function handleAddNewChar(e){
    e.preventDefault()
    //console.log(e.target.age.value)

    let newCharObj = {
       name : e.target.name.value,
       image : e.target.image.value,
       age : e.target.age.value,
    }
    
    //console.log(newCharObj)

    fetch ("http://localhost:3000/characters", {
        method: 'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(newCharObj)
    })
        .then ((resp) => resp.json())
        .then((data) => renderCharacters([data]))
}

//post is a type of fetch that has some extra stuff compared to a get
