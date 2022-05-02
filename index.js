const weaviate = require("weaviate-client");

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

var classObj = {
    "class": "Paragraph",
    "description": "A blog post",
    "moduleConfig": {
        "text2vec-transformers": {
            "vectorizeClassName": false
        }
    },
    "properties": [
        {
        "name": "content",
        "dataType": [
            "text"
        ],
        "moduleConfig": {
            "text2vec-transformers": {
            "skip": false,
            "vectorizePropertyName": false
            }
        },
        "description": "text property for paragraph",
        },
        {
         "name": "inArticle",
         "dataType": [
            "Article"
         ],
        "moduleConfig": {
            "text2vec-transformers": {
            "skip": true,
            "vectorizePropertyName": false
            }
        },
        "description": "text property for document",
        },
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
