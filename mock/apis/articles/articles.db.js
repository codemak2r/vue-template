const faker = require('faker')
let articles = []

for(let i=0; i<10; i++) {
    var article = {
        id: i,
        author: faker.name.findName(), 
        created: faker.date.recent(), 
        comtent: faker.lorem.text()
    }
    articles.push(article)
}


module.exports = {
    articles
}