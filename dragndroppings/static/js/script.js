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

document.querySelectorAll(".group-items, .item-bank").forEach(function (list) {
    list.setAttribute("ondrop", "drop(event)");
    list.setAttribute("ondragover", "allowDrop(event)");
})

document.querySelectorAll(".item").forEach(function (item) {
    item.setAttribute("draggable", "true");
    item.setAttribute("ondragstart", "drag(event)");
})