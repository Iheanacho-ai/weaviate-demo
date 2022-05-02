const weaviate = require("weaviate-client");

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

client.data
    .creator()
    .withClassName('Article')
    .withProperties({
        "title": "This is the title of the first paragraph",
        "content": "This is the description",
    })
    .do()
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err)
    });
