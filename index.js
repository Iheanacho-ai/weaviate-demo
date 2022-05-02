const weaviate = require("weaviate-client");

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

var classObj = {
    "class": "Article",
    "description": "A written text, for example a news article or blog post",
    "vectorizeClassName": true,
    "properties": [
        {
        "dataType": [
            "string"
        ],
        "description": "Title of the article",
        "name": "title",
        "vectorizePropertyName": true,
        "index": true
        },
        {
        "dataType": [
            "text"
        ],
        "description": "The content of the article",
        "name": "content"
        }
    ]
}

client
  .schema
  .classCreator()
  .withClass(classObj)
  .do()
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  });
