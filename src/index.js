document.addEventListener("DOMContentLoaded", function() {
    console.log('Connected!')
    getRecipes()
})

const recipesURL = 'http://localhost:3000/recipes/'

function getRecipes() {
    fetch(recipesURL)
    .then(response => response.json())
    .then(recipes => {
        recipes.forEach(renderRecipes)
        // return recipes
    })
    // .then(recipes => {
    //     let searchQuery = document.querySelector('.search').value
    //     let recipeNameArray = []
    //     recipes.forEach(element => {
    //         recipeNameArray.push(element.name)
    //         debugger
    //         // recipes.filter(element => element.name.toLowerCase().includes(searchQuery.toLowerCase()))
    //     })
    // })
}
// array of recipes

function renderRecipes(recipe) {
    const line = document.createElement('hr')
    
    const recipesContainer = document.getElementById('recipes-container')
    let recipesList = document.querySelector('.recipes-list')

    const recipeCard = document.createElement('div')
    recipeCard.classList.add('columns', 'recipe-card', 'is-vcentered')
    recipesList.appendChild(recipeCard)

    const recipeImageDiv = document.createElement('div')
    recipeImageDiv.classList.add('column', 'is-three-fifths', 'recipe-image')
    recipeCard.appendChild(recipeImageDiv)
    const recipeImage = document.createElement('img')
    recipeImage.src = recipe.image
    recipeImageDiv.appendChild(recipeImage)

    const recipeTextDiv = document.createElement('div')
    recipeTextDiv.classList.add('column', 'recipe-text')
    recipeCard.appendChild(recipeTextDiv)
    const recipeH3 = document.createElement('h3')
    recipeH3.classList.add('title')
    recipeH3.innerText = recipe.name
    recipeTextDiv.appendChild(recipeH3)
    const recipeH4 = document.createElement('h4')
    recipeH4.classList.add('subtitle')
    recipeH4.innerText = recipe.description
    recipeTextDiv.appendChild(recipeH4)

    const recipeButtonDiv = document.createElement('div')
    recipeButtonDiv.classList.add('recipe-button')
    recipeTextDiv.appendChild(recipeButtonDiv)
    const recipeButton = document.createElement('button')
    recipeButton.innerText = "See Recipe"
    recipeButtonDiv.appendChild(recipeButton)
    recipeButton.addEventListener('click', () => seeRecipe(recipe))

    recipesList.appendChild(line)

}

function seeRecipe(recipe) {
    let id = recipe.id
    fetch(recipesURL + `${id}`)
    .then(response => response.json())
    .then(renderRecipe)
}

function renderRecipe(recipe) {
    const recipeHero = document.querySelector('.hero-body')
    recipeHero.style.backgroundImage = `url('${recipe.image}')`
    
    const recipesContainer = document.getElementById('recipes-container')
    while (recipesContainer.firstChild) {
        recipesContainer.removeChild(recipesContainer.firstChild)
    }
    const recipeInfoContainer = document.createElement('div')
    recipeInfoContainer.classList.add('recipe-info-container')
    recipesContainer.appendChild(recipeInfoContainer)
    
    const recipeH1 = document.createElement('h1')
    recipeH1.classList.add('title', 'recipe-h1-name')
    recipeH1.innerText = recipe.name
    recipeInfoContainer.appendChild(recipeH1)
    
    const recipeH2 = document.createElement('h2')
    recipeH2.classList.add('subtitle', 'recipe-h2-description')
    recipeH2.innerText = recipe.description
    recipeInfoContainer.appendChild(recipeH2)
    
    const line = document.createElement('hr')
    recipeInfoContainer.appendChild(line)

    const recipePreparationDiv = document.createElement('div')
    recipePreparationDiv.id = 'recipe-preparation'
    recipesContainer.appendChild(recipePreparationDiv)

    const recipeColumnsDiv = document.createElement('div')
    recipeColumnsDiv.classList.add('recipe-columns')
    recipePreparationDiv.appendChild(recipeColumnsDiv)
    
    const recipePreparationCard = document.createElement('div')
    recipePreparationCard.classList.add('columns', 'recipe-preparation-card')
    recipeInfoContainer.appendChild(recipePreparationCard)

    // let column1 = document.createElement('div')
    // column1.classList.add('column', 'is-one-fifth')
    // recipePreparationCard.appendChild(column1)
    
    const recipeIngredientsDiv = document.createElement('div')
    recipeIngredientsDiv.classList.add('column', 'recipe-ingredients', 'is-one-third')
    recipePreparationCard.appendChild(recipeIngredientsDiv)
    const recipeIngredientsUl = document.createElement('ul')
    recipeIngredientsDiv.appendChild(recipeIngredientsUl)
    recipe.foods.forEach(element => {
        let recipeIngredientsLi = document.createElement('li')
        recipeIngredientsLi.innerText = element.name
        recipeIngredientsUl.appendChild(recipeIngredientsLi)
    })
    
    const recipeStepsDiv = document.createElement('div')
    recipeStepsDiv.classList.add('column', 'recipe-steps', 'is-three-fifths')
    recipePreparationCard.appendChild(recipeStepsDiv)

    const recipeSteps = document.createElement('div')
    recipeSteps.classList.add('recipe-steps')
    recipeSteps.innerText = recipe.steps
    recipeStepsDiv.appendChild(recipeSteps)

    const editRecipeButtonDiv = document.createElement('div')
    editRecipeButtonDiv.classList.add('edit-recipe-button')
    const editRecipeButton = document.createElement('button')
    editRecipeButton.innerText = 'Edit Recipe'
    editRecipeButtonDiv.appendChild(editRecipeButton)
    recipeInfoContainer.appendChild(editRecipeButtonDiv)
    editRecipeButton.addEventListener('click', () => editRecipeModal(recipe))
    
    const deleteRecipeButtonDiv = document.createElement('div')
    deleteRecipeButtonDiv.classList.add('delete-recipe-button')
    const deleteRecipeButton = document.createElement('button')
    deleteRecipeButton.innerText = 'Delete Recipe'
    deleteRecipeButtonDiv.appendChild(deleteRecipeButton)
    recipeInfoContainer.appendChild(deleteRecipeButtonDiv)
    deleteRecipeButton.addEventListener('click', () => deleteRecipe(recipe))

    const allRecipesButtonDiv = document.createElement('div')
    allRecipesButtonDiv.classList.add('see-all-recipes-button')
    const allRecipesButton = document.createElement('button')
    allRecipesButton.innerText = 'Back to All Recipes'
    allRecipesButtonDiv.appendChild(allRecipesButton)
    recipeInfoContainer.appendChild(allRecipesButtonDiv)
    allRecipesButton.addEventListener('click', goBack)
}

function goBack() {
    // delete recipe info container
    document.querySelector('.recipe-info-container').remove()
    // const recipeHero = document.querySelector('.hero-body')
    // recipeHero.style.backgroundImage = `url('${recipe.image}')`
    // add recipes list back
    let recipesList = document.createElement('div')
    recipesList.classList.add('recipes-list')
    document.querySelector('#recipes-container').appendChild(recipesList)
    const recipeHero = document.querySelector('.hero-body')
    recipeHero.style.backgroundImage = "url('/Users/ashley/Recipes App/recipes-frontend/assets/images/lily-banse--YHSwy6uqvk-unsplash.jpg')"
    // get fetch
    getRecipes()
}

///////////////////////
// CREATE/ADD RECIPE //
///////////////////////

const addRecipeButton = document.querySelector('.add-recipe')
addRecipeButton.addEventListener('click', createRecipeModal)

function createRecipeModal() {
    const createRecipeModal = document.querySelector('.create-recipe-modal')

        const modalDiv = document.createElement('div')
        modalDiv.classList.add('modal', 'is-active')
        createRecipeModal.appendChild(modalDiv)

            // might not need this
            const modalBackground = document.createElement('div')
            modalBackground.classList.add('modal-background')
            modalDiv.appendChild(modalBackground)

            const modalCard = document.createElement('div')
            modalCard.classList.add('modal-card')
            modalDiv.appendChild(modalCard)

                const modalHeader = document.createElement('header')
                modalHeader.classList.add('modal-card-head')
                modalCard.appendChild(modalHeader)

                    const modalP = document.createElement('p')
                    modalP.classList.add('modal-card-title')
                    modalP.innerText = "Add a Recipe"
                    modalHeader.appendChild(modalP)

                    const modalButton = document.createElement('button')
                    modalButton.classList.add('delete')
                    modalButton.setAttribute('aria-label', 'close')

                const modalSection = document.createElement('section')
                modalSection.classList.add('modal-card-body')
                modalCard.appendChild(modalSection)

                    const modalLabel1 = document.createElement('label')
                    modalLabel1.classList.add('label')
                    modalLabel1.innerText = "Recipe Image"
                    modalSection.appendChild(modalLabel1)

                    const modalDivContent1 = document.createElement('div')
                    modalDivContent1.classList.add('control')
                    modalLabel1.appendChild(modalDivContent1)

                    const modalInput1 = document.createElement('input')
                    modalInput1.classList.add('input', 'recipe-modal-image')
                    modalInput1.setAttribute('type', 'text')
                    modalInput1.setAttribute('placeholder', 'Image URL')
                    modalDivContent1.appendChild(modalInput1)

                    const br1 = document.createElement('br')
                    modalSection.appendChild(br1)

                    const modalLabel2 = document.createElement('label')
                    modalLabel2.classList.add('label')
                    modalLabel2.innerText = "Recipe Name"
                    modalSection.appendChild(modalLabel2)

                    const modalDivContent2 = document.createElement('div')
                    modalDivContent2.classList.add('control')
                    modalLabel2.appendChild(modalDivContent2)

                    const modalInput2 = document.createElement('input')
                    modalInput2.classList.add('input', 'recipe-modal-name')
                    modalInput2.setAttribute('type', 'text')
                    modalInput2.setAttribute('placeholder', 'Recipe Name')
                    modalDivContent2.appendChild(modalInput2)

                    const br2 = document.createElement('br')
                    modalSection.appendChild(br2)

                    const modalLabel3 = document.createElement('label')
                    modalLabel3.classList.add('label')
                    modalLabel3.innerText = "Recipe Description"
                    modalSection.appendChild(modalLabel3)

                    const modalDivContent3 = document.createElement('div')
                    modalDivContent3.classList.add('control')
                    modalLabel3.appendChild(modalDivContent3)

                    const modalInput3 = document.createElement('textarea')
                    modalInput3.classList.add('textarea', 'recipe-modal-description')
                    modalInput3.setAttribute('type', 'text')
                    modalInput3.setAttribute('placeholder', 'Description')
                    modalDivContent3.appendChild(modalInput3)

                    const br3 = document.createElement('br')
                    modalSection.appendChild(br3)

                    const modalLabel4 = document.createElement('label')
                    modalLabel4.classList.add('label')
                    modalLabel4.innerText = "Recipe Steps"
                    modalSection.appendChild(modalLabel4)

                    const modalDivContent4 = document.createElement('div')
                    modalDivContent4.classList.add('control')
                    modalLabel4.appendChild(modalDivContent4)

                    const modalInput4 = document.createElement('textarea')
                    modalInput4.classList.add('textarea', 'recipe-modal-steps')
                    modalInput4.setAttribute('type', 'text')
                    modalInput4.setAttribute('placeholder', 'Steps')
                    modalDivContent4.appendChild(modalInput4)

                const modalFooter = document.createElement('footer')
                modalFooter.classList.add('modal-card-foot')
                modalCard.appendChild(modalFooter)

                    const modalFooterButtonCreate = document.createElement('button')
                    modalFooterButtonCreate.classList.add('button', 'is-success', 'save-button')
                    modalFooterButtonCreate.innerText = "Add Recipe"
                    modalFooter.appendChild(modalFooterButtonCreate)
                    modalFooterButtonCreate.addEventListener('click', () => {
                        modalDiv.classList.remove('is-active')
                        createRecipe()
                    })

                    const modalFooterButtonCancel = document.createElement('button')
                    modalFooterButtonCancel.classList.add('button', 'cancel-button')
                    modalFooterButtonCancel.innerText = "Cancel"
                    modalFooter.appendChild(modalFooterButtonCancel)
                    modalFooterButtonCancel.addEventListener('click', () => {
                        modalDiv.classList.remove('is-active')
                    })
}

function createRecipe() {
    let data = {
        name: document.querySelector('.recipe-modal-name').value,
        image: document.querySelector('.recipe-modal-image').value,
        description: document.querySelector('.recipe-modal-description').value,
        steps: document.querySelector('.recipe-modal-steps').value
    }
    fetch(recipesURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(renderRecipe)
}

/////////////////
// EDIT RECIPE //
/////////////////

function editRecipeModal(recipe) {
    const modal = document.querySelector('.modal')
    modal.classList.add('is-active')

    const modalCardTitle = document.querySelector('.modal-card-title')
    modalCardTitle.innerText = 'Edit ' + document.querySelector('.recipe-h1-name').innerText

    const modalImage = document.querySelector('.recipe-modal-image')
    modalImage.value = recipe.image

    const modalName = document.querySelector('.recipe-modal-name')
    modalName.value = document.querySelector('.recipe-h1-name').innerText

    const modalDescription = document.querySelector('.recipe-modal-description')
    modalDescription.value = document.querySelector('.recipe-h2-description').innerText

    const modalSteps = document.querySelector('.recipe-modal-steps')
    modalSteps.value = document.querySelector('.recipe-steps').innerText

    const closeButton = document.querySelector('.delete')
    closeButton.addEventListener('click', () => {
        modal.classList.remove('is-active')
    })

    const saveButton = document.querySelector('.save-button')
    saveButton.addEventListener('click', () => {
        editRecipe(recipe)
        modal.classList.remove('is-active')
    })

    const cancelButton = document.querySelector('.cancel-button')
    cancelButton.addEventListener('click', () => {
        modal.classList.remove('is-active')
    })
}

function editRecipe(recipe) {
    let id = recipe.id
    let data = {
        name: document.querySelector('.recipe-modal-name').value,
        // image: recipe.image,
        description: document.querySelector('.recipe-modal-description').value,
        steps: document.querySelector('.recipe-modal-steps').value
    }
    fetch(recipesURL + `${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('.recipe-h1-name').innerText = data.name
        document.querySelector('.recipe-h2-description').innerText = data.description
        document.querySelector('.recipe-steps').innerText = data.steps
    })
}

///////////////////
// DELETE RECIPE //
///////////////////

function deleteRecipe(recipe) {
    debugger
    let id = recipe.id
    fetch(recipesURL + `${id}`, {
        method: "DELETE"
    })
    .then(goBack)
}

////////////////////
// SEARCH RECIPES //
////////////////////

// function searchRecipes() {
//     let recipeNameArray = []
//     function getRecipes() {
//         fetch(recipesURL)
//         .then(response => response.json())
       
//     // if value of search input == anything in array of recipes
//     // push to new array
//     // and display on the DOM
// }