let state = {
    "groups": {
        "Yang": {
            "items": {}
        },
        "Song": {
            "items": {}
        },
        "Simon": {
            "items": {}
        },
        "Loach": {
            "items": {}
        },
    },
    "bank": {
        "Pak": {
            "esol_students": 5
        },
        "Evins": {
            "esol_students": 3
        },
        "Mueller": {
            "esol_students": 1
        },
    }
};

const itemTemplate = item => `<div id="${item[0]}" class="item">
<div class="item-text">
${item[0]}
<br>
esol_stents: ${item[1].esol_students}
</div>
</div>`;

const groupTemplate = group => `<div class="group">
<div class="group-title">
<div class="group-title-name">
${group[0]}
<br>
sum(esol_students): ${Object.entries(group[1].items).map(item => item[1].esol_students).reduce((a, b) => a + b, 0)}
</div>
</div>
<div id=${group[0]} class="group-items">${Object.entries(group[1].items).map(item => itemTemplate(item)).join('')}</div>
</div>`;

const bankTemplate = bank => `<div id="item-bank" class="item-bank">
${Object.entries(bank).map(item => itemTemplate(item)).join('')}
</div>`;

const stateTemplate = state => `${Object.entries(state.groups).map(group => groupTemplate(group)).join('')}
<br>
${bankTemplate(state.bank)}`;

function render() {
    document.querySelector(".all").innerHTML = stateTemplate(state);

    // add drag-and-drop attributes
    document.querySelectorAll(".group-items, .item-bank").forEach(function (list) {
        list.setAttribute("ondrop", "drop(event)");
        list.setAttribute("ondragover", "allowDrop(event)");
    });

    document.querySelectorAll(".item").forEach(function (item) {
        item.setAttribute("draggable", "true");
        item.setAttribute("ondragstart", "drag(event)");
    });

    // add styling classes
    document.querySelectorAll(".group").forEach(function (item) {
        item.classList.add("d-flex", "w-100", "flex-row");
    });

    document.querySelectorAll(".group-title").forEach(function (item) {
        item.classList.add("w-25", "p-2", "border", "justify-content-center", "align-items-center");
    });

    document.querySelectorAll(".group-title-name").forEach(function (item) {
        item.classList.add("text-center");
    });

    document.querySelectorAll(".group-items").forEach(function (item) {
        item.classList.add("d-flex", "w-100", "flex-row", "flex-wrap", "border");
    });

    document.querySelectorAll(".item-bank").forEach(function (item) {
        item.classList.add("d-flex", "w-100", "flex-row", "flex-wrap");
    });

    document.querySelectorAll(".item").forEach(function (item) {
        item.classList.add("d-flex", "p-2", "border", "justify-content-center", "align-items-center", "text-center");
    });
}

render();

// drag-and-drop functions
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("source", ev.target.parentElement.id);
    ev.dataTransfer.setData("item", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var source_id = ev.dataTransfer.getData("source");
    var source = source_id === "item-bank" ? state.bank : state.groups[source_id].items;

    var item_name = ev.dataTransfer.getData("item");


    var target = ev.target;
    while (!target.hasAttribute("ondrop")) {
        target = target.parentElement;
    }

    target = target.id === "item-bank" ? state.bank : state.groups[target.id].items;
    target[item_name] = source[item_name];
    delete source[item_name];

    render();
}

// add drag-and-drop attributes
document.querySelectorAll(".group-items, .item-bank").forEach(function (list) {
    list.setAttribute("ondrop", "drop(event)");
    list.setAttribute("ondragover", "allowDrop(event)");
})

document.querySelectorAll(".item").forEach(function (item) {
    item.setAttribute("draggable", "true");
    item.setAttribute("ondragstart", "drag(event)");
})

// add styling classes
document.querySelectorAll(".group").forEach(function (item) {
    item.classList.add("d-flex", "w-100", "flex-row");
})

document.querySelectorAll(".group-title").forEach(function (item) {
    item.classList.add("d-flex", "w-25", "p-2", "border", "justify-content-center", "align-items-center");
})

document.querySelectorAll(".group-items").forEach(function (item) {
    item.classList.add("d-flex", "w-100", "flex-row", "flex-wrap", "border");
})

document.querySelectorAll(".item-bank").forEach(function (item) {
    item.classList.add("d-flex", "w-100", "flex-row", "flex-wrap");
})

document.querySelectorAll(".item").forEach(function (item) {
    item.classList.add("d-flex", "p-2", "border", "justify-content-center", "align-items-center");
})