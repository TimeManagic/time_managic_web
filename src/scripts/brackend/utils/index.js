;(async function(){
   idbKeyval.set('foo', 'bar');
   v = await idbKeyval.get('foo');
   console.log(v);
   
}())