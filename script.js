/*
Filename: script.js
Author: Mike Tam
Contains functions and core logic for the Pokedex Project webpage
*/

// Variables Section
const $caughtList = document.getElementById('view-caught-list')
const $about = document.getElementById('about')
const $loadMore = document.getElementById('loadMore')
const $pokedexGrid = document.getElementById('pokedex-grid')
const $dialog = document.getElementById('dialog')
const $dialogContent = document.getElementById('dialogContent')
const $dialogAction = document.getElementById('dialogAction')
const $dialogClose = document.getElementById('dialogClose')
const $dialogCaughtList = document.getElementById('caught-list')
const $dialogCaughtListRelease = document.getElementById('caught-list-release')
const $dialogCaughtListClose = document.getElementById('caught-list-close')
const $dialogCaughtListContent = document.getElementById('caught-list-content')
const $dialogAbout = document.getElementById('about-dialog')
const $dialogAboutClose = document.getElementById('about-close')
const $dialogAboutContent = document.getElementById('about-content')


// URL for PokeAPI call
const fetchPokedexURL = 'https://pokeapi.co/api/v2/pokemon/'
// Stores the PokeAPI link to the next page of Pokedex
let nextURL = ''
// URL for PokeAPI fetch for Pokedex attributes
const pokedexAttributesLink = 'https://pokeapi.co/api/v2/pokemon/'

// Stores the list of pokedex objects
const pokedexArr = []
// Stores caught pokedex saved in local storage
const pokedexCaughtList = JSON.parse(localStorage.getItem('pokedex-caught-list')) || []

// Functions Section
/**
 * Generates Pokedex list items for the website
 * @param {*} pokedexList List of Pokedex objects to be added to the primary Pokidex array
 * @returns {void} Nothing to return
 */
function displayPokedexGrid(pokedexList) {
    // Check if pokedex list parameter is used
    if(pokedexList) {
        pokedexArr.push(...pokedexList)
        console.log('Appending to primary list')
    }
    
    // Generate Pokidex HTML elements to be added to the Pokidex grid
    $pokedexGrid.innerHTML = pokedexArr.reduce((html, pokedexObj) => {
        // Stores pokedex id
        const pokedexId = pokedexObj.id
        // Stores the class name to be set for the overlay element
        let overlayClassName = ''
        
        // Set the proper class name for overlay element if the current pokedex object is in the caught list
        overlayClassName = checkCaughtStatus(pokedexId) ? 'overlay caught' : 'overlay'

        // Add Pokedex element to the Pokidex grid
        return html + 
        `
        <div class="pokedex" data-id="${pokedexObj.id}">
            <div class="${overlayClassName}">CAUGHT</div>
            <img class="thumbnail" src="${pokedexObj.smallImageURL}"/>
            <span class="name">${pokedexObj.name}</span>
        </div>
        `
    }, '')
}

/**
 * Display caught list to caught list dialog box
 */
function displayCaughtList() {
    // Clear dialog box content before loading
    $dialogCaughtListContent.innerHTML = ''

    // Load all Pokedex to dialog box content section
    $dialogCaughtListContent.innerHTML = pokedexCaughtList.reduce((html, pokedexObj) => {
        // Add Pokedex element to the Pokidex grid
        return html + 
        `
        <div class="pokedex" data-id="${pokedexObj.id}">
            <img class="thumbnail" src="${pokedexObj.smallImageURL}"/>
            <span class="name">${pokedexObj.name}</span>
        </div>
        `
    }, '')
    // Show caught list dialog box
    $dialogCaughtList.showModal()
}

/**
 * Display a Pokedex item in the dialog box
 * @param {*} pokedexObj Pokedex object to be displayed
 * @returns {void} Nothing to return
 */
function displayPokedexAttributes(pokedexObj) {
    
    // Set the name of the dialog action button whether this Pokedex object is in the caught list
    $dialogAction.textContent = checkCaughtStatus(pokedexObj.id) ? 'RELEASE' : 'CATCH'
    // Change the button colour to RED if its already caught OR GREEN if its not caught yet
    $dialogAction.style.backgroundColor = checkCaughtStatus(pokedexObj.id) ? 'red' : 'green'
    
    // Clear dialog content section before loading
    $dialogContent.innerHTML = ''
    // Generate Pokidex attribute elements to be set for the dialog box
    $dialogContent.innerHTML =
        `
        <section id="pokedex-content" data-id="${pokedexObj.id}">
            <h2 id="pokedexName">${pokedexObj.name}</h2>
            <img id="pokedexImage" src="${pokedexObj.largeImageURL}"/>
            
            <article id="stats-container">
                <h3>Statistics</h3>
                <ul>
                    <li class="stat">Attack:          ${pokedexObj.attack}</li>
                    <li class="stat">Defense:         ${pokedexObj.defense}</li>
                    <li class="stat">HP:              ${pokedexObj.hp}</li>
                    <li class="stat">Speed:           ${pokedexObj.speed}</li>
                    <li class="stat">Special Attack:  ${pokedexObj['special-attack']}</li>
                    <li class="stat">Special Defense: ${pokedexObj['special-defense']}</li>
                </ul>        
            </article>

            <article id="moves-container">
                <h3>Moves</h3>
                <p class="moves">${pokedexObj.moves}</p>
            </article>

            <article id="abilities-container">
                <h3>Abilities</h3>
                <p class="abilities">${pokedexObj.abilities}</p>
            </article>

            <article id="types-container">
                <h3>Types</h3>
                <p class="types">${pokedexObj.types}</p>
            </article>
        </section>
        `
}

/**
 * Generate Pokedex object using the provided parmeters
 * @param {string} id Id number of Pokedex
 * @param {string} name String representation of name of Pokedex
 * @param {string} smImageURL String presentation of URL to small image of Pokedex
 * @param {string} lgImageURL String presentation of URL to large image of Pokedex
 * @param {string} atk Attack stat
 * @param {string} def Defence stat
 * @param {string} hp HP stat
 * @param {string} spd Speed stat
 * @param {string} satk Special attack stat
 * @param {string} sdef Special defence stat
 * @param {string} types List of types of this Pokedex
 * @param {string} moves List of moves for this Pokedex
 * @param {string} abilities List of abilities for this Pokedex
 * @returns Generated Pokedex object
 */
function generatePokedexObject(id, name, smImageURL, lgImageURL, atk, def, hp, spd, satk, sdef, types, moves, abilities) {
    const pokedexObj = {
        'id': id,
        'name': name.toUpperCase(),
        'smallImageURL': smImageURL,
        'largeImageURL': lgImageURL,
        'attack': atk,
        'defense': def,
        'hp': hp,
        'speed': spd,
        'special-attack': satk,
        'special-defense': sdef,
        'types': types,
        'moves': moves,
        'abilities': abilities,
    }
    return pokedexObj
}

/**
 * Checks if the Pokedex object is in the caught list
 * @param {*} pokedexId Id of Pokedex object
 * @returns Boolean value of Pokedex is in the caught list (True) or not in the caught list (False)
 */
function checkCaughtStatus(pokedexId) {
    // Returns the pokedex id in caught list if found
    const status = pokedexCaughtList.find(caught => pokedexId == caught.id)

    // Return true if status has a value, else return false
    return status ? true : false
}

/**
 * Saves caught list to local storage
 * @param {*} caughtList list of caught Pokedex
 * @returns Nothing to return
 */
function saveCaughtPokedex (caughtList) {
    // Save caught list array to local storage
    localStorage.setItem('pokedex-caught-list', JSON.stringify(caughtList))
}

/**
 * Generates a list of Pokedex objects using the Pokedex JSON object
 * @param {JSON} jsonObj Pokedex JSON Object to process
 * @returns {Array} A list of Pokedex objects
 */
function generatePokeDexList(jsonObj) {
    // Get the results array from JSON object
    const resultsJSON = jsonObj.results
    // Stores all fetched Pokedex items as a list of objects
    const resultList = []

    // Process all JSON array items to generate Pokedex objects and save them to the resultList array 
    for(const result of resultsJSON) {
        const pokedexId = parseUrl(result.url)
        const pokedexName = result.name
        const smImageURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokedexId + '.png'
        
        const pokedexObj = generatePokedexObject(pokedexId, pokedexName, smImageURL)
       
        resultList.push(pokedexObj)
    }

    // Return list of Pokidex objects
    return resultList
}

/**
 * Makes a call to the Pokedex API to fetch a list of Pokedex in JSON format, generates a list of Pokedex objects, then displays them
 * to the webpage
 * @param {*} url PokeAPI address
 * @returns Nothing to return
 */
async function fetchPokedex(url) {
    await fetch(url)
        // Extract the JSON object from the PokiAPI response
        .then(response => response.json())
        // Generate the list of Pokedex objects using the JSON object retrieved
        .then(pokedexJSONData => {
            // Store the next page URL for fetching more pokedex
            nextURL = pokedexJSONData.next
            // Generate list and return it to the next .then statement
            return generatePokeDexList(pokedexJSONData)
        })
        // Update list of Pokedex on the webpage
        .then(displayPokedexGrid)
        .catch(error => console.log('Fetch failed:', error))
}

/**
 * Retrieves the full details of the pokedex item using the fetchPokedexAttributes function
 * @param {*} e event object
 */
async function fetchPokedexItem(e) {
    // Get pokedex element in the grid
    const $pokedex = e.target.closest('.pokedex')
    // Check if pokedex element has been fetched successfully 
    if($pokedex) {
        await fetchPokedexAttributes(pokedexAttributesLink + $pokedex.dataset.id)
            .then(pokedexObj => {
                // Output fetched Pokedex attributes to dialog box
                displayPokedexAttributes(pokedexObj)
                $dialog.showModal()
            })
            .catch(error => console.log('Fetch failed:', error))
    }
}
/**
 * Fetches the full Pokedex attribute listing and returns a Pokedex object if the fetch promise has been successful.
 * @param {string} url The string representation of the PokeAPI URL call
 * @returns {object} a Pokedex object if the fetch promise has been successful
 */
async function fetchPokedexAttributes(url) {
    return fetch(url)
            .then(response => response.json())
            .then(pokedexAttributes => {
                
                // Initially create pokedex object with id, name, small image URL, and large image URL
                const pokedexObj = generatePokedexObject
                (
                    pokedexAttributes.id, 
                    pokedexAttributes.name, 
                    pokedexAttributes.sprites.front_default,
                    pokedexAttributes.sprites['other']['official-artwork']['front_default'],
                )

                // Add all stats to pokedex object
                for(const stat of pokedexAttributes.stats) {
                    pokedexObj[stat.stat.name] = stat.base_stat    
                }

                // Add all abilities into a single text
                let abilities = ''
                for(const ability of pokedexAttributes.abilities) {
                    abilities = abilities + ability.ability.name + ', '
                }
                abilities = abilities.slice(0, abilities.length - 2)
                pokedexObj.abilities = abilities

                // Add the first 10 moves into a single text
                let moves = ''
                let totalMoves
                // Check if the total number of moves for this Pokedex is less than 10
                if(pokedexAttributes.moves.length < 10) {
                    totalMoves = pokedexAttributes.moves.length
                }
                else {
                    totalMoves = 10
                }

                for(let i = 0; i < totalMoves; i++) {
                    moves = moves + pokedexAttributes.moves[i].move.name + ', '
                }
                moves = moves.slice(0, moves.length - 2)
                pokedexObj.moves = moves
                
                // Add all types into a single text
                let types = ''
                for(const type of pokedexAttributes.types) {
                    types = types + type.type.name + ', '
                }
                types = types.slice(0, types.length - 2)
                pokedexObj.types = types
                
                // Return generated Pokedex object
                return pokedexObj
            })
            .catch(error => console.log('Fetch failed:', error))
}

/**
 * Parses the Id from the Pokedex URL and returns the Id. 
 * Source code provided in Pokedex project notes
 * @param {*} url PokedexAPI address
 * @returns Id of Pokedex
 */
function parseUrl (url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
}

// Event Listeners Section

// Buttons Section

// Event listener for the ABOUT button
$about.addEventListener('click', (e) => {
    $dialogAboutContent.innerHTML = ''
    $dialogAboutContent.innerHTML = `
                            <h1>Pokedex</h1>
                            <p>Version: 2.0</p>
                            <p>Powered by <a href="https://pokeapi.co/" target="_blank">PokeAPI</a></p>
                            <p>Forked from Pokedex academic project developed by Mike Tam</p>
                            <h3>Instructions</h3>
                            <ol>
                                <li>To view the full details of a Pokedex item, click on Pokedex item in the main listing.</li>
                                <li>To catch a Pokedex item, click on Pokedex item in the main listing and click on the CATCH button.</li>
                                <li>Access the CAUGHT LIST by clicking on MENU -> CAUGHT LIST</li>
                                <li>To release a Pokedex item from the caught list, you can click on the caught Pokedex in either the main listing or the CAUGHT LIST. Then click on the RELEASE button</li>
                            </ol>
                            `
    // $dialogAboutContent.innerHTML = `
    //                         <h1>Pokedex</h1>
    //                         <p>Version: 2.0</p>
    //                         <p>Powered by <a href="https://pokeapi.co/" target="_blank">PokeAPI</a></p>
    //                         <p>Forked from Pokedex academic project developed by Mike Tam</p>
    //                         `
    $dialogAbout.showModal()
})

// Event listener for the CAUGHT LIST button
$caughtList.addEventListener('click', (e) => {
    // Run function to display caught list to caught list dialog box
    displayCaughtList()
})

// Event listener for the Load More button
$loadMore.addEventListener('click', async (e) => {
    // Fetch the next batch of pokedex using PokeAPI link
    await fetchPokedex(nextURL)
})

// Pokedex content grid

// Event listener for pokedex grid
$pokedexGrid.addEventListener('click', async (e) => {
    fetchPokedexItem(e)
})

// Dialog related

// Event listener for the close button in the ABOUT dialog box
$dialogAboutClose.addEventListener('click', () => $dialogAbout.close())

// Event listener for the close button in the CAUGHT LIST dialog box
$dialogCaughtListClose.addEventListener('click', () => $dialogCaughtList.close())

// Event listener for caught list content grid
$dialogCaughtListContent.addEventListener('click', async (e) => {
    fetchPokedexItem(e)
})

// Event Listener for the RELEASE ALL button
$dialogCaughtListRelease.addEventListener('click', (e) => {
    // Clear all pokedex in caught list and update local storage
    pokedexCaughtList.length = 0
    saveCaughtPokedex(pokedexCaughtList)
    // Refresh Pokedex content page
    displayPokedexGrid()
    $dialogCaughtList.close()
})

// Event Listener for the dialogAction button (catch/release)
$dialogAction.addEventListener('click', async (e) => {
    // Get the pokedex id from the pokedexName element
    const $pokedex = document.getElementById('pokedex-content')

    // Check if pokedexName element has been loaded successfully into dialog box
    if($pokedex) {
        await fetchPokedexAttributes(pokedexAttributesLink + $pokedex.dataset.id)
            .then(pokedexObj => {
                // Add Pokidex to caught list if not caught
                if(!checkCaughtStatus(pokedexObj.id)) {
                    pokedexCaughtList.push(pokedexObj)
                }
                // Release Pokidex from caught list if already caught
                else {
                    // Remove pokedex object from caught list
                    // Source for findIndex for properly searching array for key value in object
                    // https://stackoverflow.com/questions/21659888/find-and-remove-objects-in-an-array-based-on-a-key-value-in-javascript
                    const idx = pokedexCaughtList.findIndex(caught => caught.id === pokedexObj.id)
                    pokedexCaughtList.splice(idx, 1)
                }
                // Save updated caught list to local storage
                saveCaughtPokedex(pokedexCaughtList)
                // Update Pokedex content on webpage
                displayPokedexGrid()
                // Close caught list if its opened
                $dialogCaughtList.close()
                // Close pokedex dialog box
                $dialog.close()
            })
            .catch(error => console.log('Fetch failed:', error))
    }
    else {
        console.log('Error: PokedexName element has not been loaded on the dialog page properly')
    }
    
})

// Close dialog box when close button is pressed
$dialogClose.addEventListener('click', () => $dialog.close())
// Close dialog box when user clicks anywhere on the dialog box or outside the dialog box EXCEPT the buttons
$dialog.addEventListener('click', () => $dialog.close())

// Execution Section

// Fetch the first batch of Pokedex objects
fetchPokedex(fetchPokedexURL)