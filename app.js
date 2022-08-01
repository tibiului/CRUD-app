const ACTION = {
    DELETE: '0',
    EDIT: '1',
};

const mainContainer = document.querySelector('#cat-container');
const addCatButton = document.querySelector('#cat-add');
const catForm = document.querySelector('#cat-form');
const saveCatButton = document.querySelector('#cat-save');
const cancelCatButton = document.querySelector('#cat-cancel');
const formInputCatName = document.querySelector('#cat-name');

let isEditMode = false;
let editCatId = null;


(function init() {
    server.getCats().then(ui.displayCats);

    server.filterByAdoptable().then((cats) => {
        cats.forEach((cat) => ui.addSortedCatElement(cat));
    });

    mainContainer.addEventListener('click', actionHandler);
    addCatButton.addEventListener('click', showCatForm);
    saveCatButton.addEventListener('click', saveCatHandler);
    cancelCatButton.addEventListener('click', hideCatForm);
    formInputCatName.addEventListener('input', handleFormValidity);



})();

function actionHandler(ev) {
    const action = ev.target.dataset["action"];

    if (!action) {
        return;
    }

    const catId = ev.target.dataset["id"]

    if (action === ACTION.DELETE) {
        const confirmation = confirm('Are you sure you want to delete this cat?');
        if (confirmation) {
            return server.removeCat(catId)
        }
    }

    if (action === ACTION.EDIT) {
        isEditMode = true;
        editCatId = catId;

        server.getCat(catId).then((cat) => {
            document.forms['cat-form']['cat-name'].value = cat.name;
            document.forms['cat-form']['cat-description'].value = cat.description;
            document.forms['cat-form']['cat-status'].value = cat.status;
            
            saveCatButton.textContent = 'Update';
            showCatForm();
            saveCatButton.removeAttribute('disabled');
        });

    }

}

function showCatForm() {
    catForm.classList.remove("d-none");
}

function hideCatForm() {
    catForm.classList.add("d-none");
}

function saveCatHandler() {
    // cautam formularul in consola document.forms
    const payload = {
        name: document.forms['cat-form']['cat-name'].value,
        description: document.forms['cat-form']['cat-description'].value,
        status: document.forms['cat-form']['cat-status'].value,
    }
    hideCatForm();

    if (isEditMode) {
        server.updateCat(payload, editCatId);
        isEditMode = false;
        editCatId = null;
      } else {
        server.addCat(payload);
      }
}


function handleFormValidity(event) {
    if (!event.target.value) {
        saveCatButton.setAttribute('disabled');
        saveCatButton.title = 'Cat name is required'; // Not working

        return;
    }

    saveCatButton.removeAttribute('title');
    saveCatButton.removeAttribute('disabled');
}



