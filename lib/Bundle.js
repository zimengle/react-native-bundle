import utils from './Utils';

/**
 * input __d(32,function(t,l,n,o){"use strict";var u=l(33),c=u({prop:null,context:null,childContext:null});n.exports=c});
 * output {arr:[33],symbol:l}
 * @param line
 * @returns Object
 */
const getFindRequire = (line) => {

  let result = /__d\(\d+\,function\((.*)\)/.exec(line);

  if (!result) {
    return null;
  }

  const symbol = result[1].split(',')[1];

  const reg = new RegExp(symbol + "\\((\\d+)\\)", "g");

  console.info(line.match(reg))

  const arr = line.match(reg).map((group)=>new RegExp(symbol + "\\((\\d+)\\)", "g").exec(group)[1]);

  return {
    arr: arr,
    symbol: symbol
  };


};

const initDir = ()=> {
  
}

const init = ()=> {

}


// console.info(getFindRequire('__d(77,function(t,e,r,i){"use strict";var o=e(78),a=e(47),l=e(90),n=e(51),s=o.roundToNearestPixel(.4);0===s&&(s=1/o.get());var u={position:"absolute",left:0,right:0,top:0,bottom:0},b=a.register(u);r.exports={hairlineWidth:s,absoluteFill:b,absoluteFillObject:u,flatten:n,create:function(t){var e={};for(var r in t)l.validateStyle(r,t),e[r]=a.register(t[r]);return e}}});'));
