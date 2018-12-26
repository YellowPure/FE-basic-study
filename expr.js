

var parse = (str) => {
    var splits = str.split(/\-/g);
    var var1 = splits[0].split(/\+/g);
    var var2 = splits[1].split(/\+/g);
    var a, b, str1, str2;
    a = var1.filter(v => /^[0-9]*$/g.test(v)).map(v => Number(v)).reduce((a, b) => a + b);
    b = var2.filter(v => /^[0-9]*$/g.test(v)).map(v => Number(v)).reduce((a, b) => 0+a + b);
    str1 = var1.filter(v => !/^[0-9]*$/g.test(v));
    str2 = var2.filter(v => !/^[0-9]*$/g.test(v));
    if(str1.length === str2.length) {

    }

    
    var res = [];
    for(var i=0;i<str1.length; i++) {
        for(let j = 0;j<str2.length;j++) {
            if(str1[i] !== str2[j]) {

                res.push(str1[i]);
                res.push(str2[j]);
            }
        }
    }

    console.log(res);
    return a - b;
}
console.log((/^[0-9]*$/g).test('1'));
var a = parse('10+x0_1+3-x1_1+4+16')
console.log(a);