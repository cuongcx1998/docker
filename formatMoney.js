function numberWithCommas(x) {
    x = x.toString();
    x = numberWithoutCommas(x);

    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function numberWithoutCommas(x)
{
    if (typeof x == undefined || x == null) {
        x = '';
    }
    x = x.toString();
    return x.replace(/,/g, '');
}
