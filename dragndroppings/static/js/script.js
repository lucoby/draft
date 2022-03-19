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
    },
    "attrs": {
        "esol_students": {
            "default_value": 0
        }
    }
};

const attrTemplate = (item, attr) => `${attr}: ${item[attr]}`;

const itemTemplate = item => `<div id="${item[0]}" class="item">
<div class="item-text">
${item[0]}
<br>
${Object.keys(state.attrs).map(attr => attrTemplate(item[1], attr)).join(`<br>`)}
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
        item.classList.add("d-flex", "w-25", "p-2", "border", "justify-content-center", "align-items-center");
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

    if (source_id === target.id) {
        return;
    }

    target = target.id === "item-bank" ? state.bank : state.groups[target.id].items;
    target[item_name] = source[item_name];
    delete source[item_name];

    render();
}

// modals
document.getElementById('config-group').addEventListener('show.bs.modal', function (e) {
    document.getElementById('config-group-text').value = Object.keys(state.groups).join("\r\n");
})

function configGroups(e) {
    const new_groups = new Set(document.getElementById('config-group-text').value.split('\n').filter(e => e))
    new_groups.forEach(e => {
        if (!(e in state.groups)) {
            state.groups[e] = { 'items': {} };
        }
    });
    Object.keys(state.groups).forEach(e => {
        if (!(new_groups.has(e))) {
            Object.entries(state.groups[e].items).forEach(e => state.bank[e[0]] = e[1]);
            delete state.groups[e];
        }
    });
    render();
    bootstrap.Modal.getOrCreateInstance(document.getElementById('config-group')).hide()
}

function addRow(table, attr, default_value) {
    var row = table.insertRow();
    row.insertCell().innerHTML = `<input type="text" class="form-control" value=${attr}>`;
    row.insertCell().innerHTML = `<input type="text" class="form-control" value=${default_value}>`;
}

document.getElementById('config-attrs').addEventListener('show.bs.modal', function (e) {
    var table = document.getElementById('config-attrs-table');
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    Object.entries(state.attrs).forEach(a => {
        addRow(table, a[0], a[1].default_value);
    });
})

function addAttrTable(e) {
    var table = document.getElementById('config-attrs-table');
    addRow(table, "", 0);
}

function addAttrGroup(group, attr, default_value) {
    Object.entries(group).forEach(e => e[1][attr] = default_value);
}

function configAttrs(e) {
    var table = document.getElementById('config-attrs-table');
    for (var i = 1; i < table.rows.length; i++) {
        var attr = table.rows[i].cells[0].children[0].value;
        if (!!attr & !(attr in state.attrs)) {
            var default_value = parseInt(table.rows[i].cells[1].children[0].value);
            state.attrs[attr] = { "default_value": default_value };
            addAttrGroup(state.bank, attr, default_value);
            Object.entries(state.groups).forEach(e => addAttrGroup(e[1].items, attr, default_value))
        }
    }
    render();
    bootstrap.Modal.getOrCreateInstance(document.getElementById('config-attrs')).hide()
}