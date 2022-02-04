function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    var target = ev.target;
    while (!target.hasAttribute("ondrop")) {
        target = target.parentElement;
    }
    target.appendChild(document.getElementById(data));
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