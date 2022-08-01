const CAT_STATUS = {
    UNDER_SUPERVISION: "under-supervision",
    ADOPTABLE: "adoptable",
    UNDER_TREATMENT: "under-treatment",
    DEAD: "in the heaven of cats",
};

const catStatusMap = new Map([
    [CAT_STATUS.ADOPTABLE, "cat-adoptable"],
    [CAT_STATUS.UNDER_SUPERVISION, "cat-under-supervision"],
    [CAT_STATUS.UNDER_TREATMENT, "cat-under-treatment"],
    [CAT_STATUS.DEAD, "in-the-heaven-of-cats"],
]);

const ui = {
    container: document.querySelector("#cat-container"),
    addCatElement(cat) {
        this.container.insertAdjacentHTML("beforeend", `
        <li
            class="list-group-item bg-light text-white fs-5 m-1 rounded"
        >
            <div class="${catStatusMap.get(cat.status)} d-flex justify-content-between">
                <div class="d-flex">
                    <div class="cat-name">${cat.name}</div>
                    <div>${cat.description}</div>
                </div>
                <div>
                    <button data-action="1" data-id="${cat.id}" type="button" class="btn btn-sm btn-outline-info">Edit</button>
                    <button data-action="0" data-id="${cat.id}" type="button" class="btn btn-sm btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
        `);
    },
    sortedContainer: document.querySelector("#adoptable"),
    addSortedCatElement(cat) {
        this.sortedContainer.insertAdjacentHTML("beforeend", `
        <li
            class="list-group-item bg-light text-white fs-5 m-1 rounded text-start"
        >
            <div class="${catStatusMap.get(cat.status)} d-flex ">
                <div class="cat-name">${cat.name}</div>
                <div>${cat.description}</div>
            </div>
        </li>
        `);
    },
    displayCats(cats) {
        cats.forEach((cat) => ui.addCatElement(cat));
    },

}



