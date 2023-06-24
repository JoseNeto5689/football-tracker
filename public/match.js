window.addEventListener("load", () => {
    console.log(getParameters())
})

function getParameters() {
    let params = window.location.search.substring(1).split("&")
    let obj = {}
    let param
    let i

    for (i in params) {
        if (params[i] === "") continue;

        param = params[i].split("=");
        obj[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
    }

    return obj;
}