import _ from 'lodash';
import printMe from './print.js';
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}


function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'game'], ' ');

    btn.innerHTML = '点击这里，然后查看 console！';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());