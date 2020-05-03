//require packages used in project
const express = require('express')
const app = express()
const port = 3000

//require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json') //填寫路徑載入檔案

//setting template engine (.engine .set 'view engine' 'handlebars'均為固定使用語法格式)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

//routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

//route setting for show detail page
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(rst => {
    if (rst.name.toLowerCase().includes(keyword.toLowerCase())) {
      return rst.name
    } else if (rst.category.includes(keyword)) {
      return rst.category
    }
    //return rst.name.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { restaurant: restaurant, keyword: keyword })
})


//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})