function findEmail(s){
    s = " " + s + " ";
    const m = "Not found!";
    const isEmail = /\s[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+\s/;
    let myArray = s.match(isEmail);
    if(myArray==null) {
        return m;
    }
    else {
        if(myArray[0].substr(-1,1)=='-'|| myArray[0].substr(myArray[0].indexOf("@")-1,1)=='-') {
            return m;
        }
        return myArray[0].replace(/\s/g, '');
    }
}