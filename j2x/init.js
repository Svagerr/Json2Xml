let input = document.getElementById('input');
let xml = document.getElementById('tablo');
let transform = document.getElementById('transform').addEventListener('click', () => {
    let result = transformation.json2xml(input.value);
    xml.value = result;
});
let clear = document.getElementById('clear').addEventListener('click', () => {
    input.value = '';
    xml.value = '';
});

function Transformation() {
    this.Xml = function (obj) {
        let xml = '';
        if (typeof obj === 'object') {
            for (let prop in obj) {
                if (obj[prop] instanceof Array) {
                    for (let indexElem in obj[prop]) {
                        xml += '<' + prop + '>';
                        xml += this.Xml(obj[prop][indexElem]);
                        xml += '</' + prop + '>\n';
                    }
                } else {
                    xml += '<' + prop + '>';
                    typeof obj[prop] == 'object' ? xml += '\n' + this.Xml(obj[prop]) : xml += obj[prop];
                    xml += '</' + prop + '>\n';
                }
            }
        } else {
            xml = obj;
        }
        return xml;
    };

    this.json2xml = function (json) {
        let object = JSON.parse(json);
        let xml = this.Xml(object);
        let version = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n';
        return version + '<root>\n' + xml + '</root>';
    }
};

const transformation  = new Transformation();
