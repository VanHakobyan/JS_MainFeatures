document.addEventListener("load", init, false)
function init() {
    form1.Login = loginOnChange;
    form1.Password = passwordOnChange;
    form1.Submit = onSubmit;
}

function validate(element, pattern) {
    var result = element.value.search(pattern);
    if (result == -1) element.className = "invalid";
    else element.className = "valid";
}
function loginOnChange() {
    var pattern = /\S/;
    validate(this, pattern);
}

function passwordOnChange() {
    var pattern = /d+/;
    validate(this, pattern);
}

function onSubmit() {
    var invalid = false;
    for (var i = 0; i < form1.elements.length; i++) {
        var e = form1.elements[i];
        if (e.type == "text" && e.onChange)
            e.onChange();
        if (e.className = "invalid") invalid = true;

    }
    if (invalid) {
        alert("invalid inputs")
        return false;
    }
}
