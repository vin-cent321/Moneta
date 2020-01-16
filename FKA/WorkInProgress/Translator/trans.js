var cheerio = require("cheerio");
var axios = require("axios");
var query = process.argv[2];
var linebrk = '===========================================================';
var responses;
if (process.argv[3]) {responses = process.argv[3];}else{responses = 1}
console.log(linebrk,
  '\n'+
  '=   Search example: node server cat                 =','\n'+
  '=   [will return el gato]       =','\n'+
  linebrk+
  '\n'+
  '=   Searching for', query, 'Expect', maxCheck(), 'returns.               =',
  '\n'+
  linebrk)
axios.get("https://www.spanishdict.com/translate/"+query).then(function(response) {
  var $ = cheerio.load(response.data);
  var results = [];
  //console.log(response.data)
  $("#quickdef1-en").each(function(i, element) {
    var tx = $(element).find("a").text();
      results.push({
        text: tx,
      });
    
  });
  console.log(results);
});
function maxCheck() {
  if (responses>20) {
    console.log(linebrk,'\n'+
    '= Max allowable searches=20, adjusting entered parameter. =')
    responses = 20;
  }
  return responses;
}