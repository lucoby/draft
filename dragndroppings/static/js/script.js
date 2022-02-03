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

document.querySelectorAll(".list, .bank").forEach(function (listItem) {
    listItem.setAttribute("ondrop", "drop(event)");
    listItem.setAttribute("ondragover", "allowDrop(event)");
})