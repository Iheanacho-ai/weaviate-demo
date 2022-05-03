const weaviate = require("weaviate-client");

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

var classObj = {
  "classes": [
    {
        "class": "Articles",
        "description": "A wikipedia article with a title and crefs",
        "vectorizer": "none",
        "vectorIndexConfig": {
            "skip": true
        },
        "properties": [
            {
                "dataType": [
                    "string"
                ],
                "description": "Title of the article",
                "name": "title",
                "indexInverted": true
            },
            {
                "dataType": [
                    "Paragraph"
                ],
                "description": "List of paragraphs this article has",
                "name": "hasParagraphs",
                "indexInverted": true
            },
            {
                "dataType": [
                    "Article"
                ],
                "description": "Articles this page links to",
                "name": "linksToArticles",
                "indexInverted": true
            }
        ]
    },
    {
        "class": "Paragraphs",
        "description": "A wiki paragraph",
        "vectorIndexConfig": {
            "vectorCacheMaxObjects": 150000000000,
            "ef": 2500
        },
        "properties": [
            {
                "dataType": [
                    "string"
                ],
                "description": "Title of the paragraph",
                "name": "title",
                "indexInverted": false,
                "moduleConfig": {
                    "text2vec-transformers": {
                        "skip": true,
                        "vectorizePropertyName": false,
                    }
                }
            },
            {
                "dataType": [
                    "text"
                ],
                "description": "The content of the paragraph",
                "name": "content",
                "indexInverted": false,
                "moduleConfig": {
                    "text2vec-transformers": {
                        "skip": false,
                        "vectorizePropertyName": false,
                    }
                }
            },
            {
                "dataType": [
                    "int"
                ],
                "description": "Order of the paragraph",
                "name": "order",
                "indexInverted": true,
                "moduleConfig": {
                    "text2vec-transformers": {
                        "skip": true,
                        "vectorizePropertyName": false,
                    }
                }
            },
            {
                "dataType": [
                    "Articles"
                ],
                "description": "Article this paragraph is in",
                "name": "inArticle",
                "moduleConfig": {
                    "text2vec-transformers": {
                        "skip": true,
                        "vectorizePropertyName": false,
                    }
                }
            }
        ]
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
