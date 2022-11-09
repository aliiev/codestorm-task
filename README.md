# CodeStorm Task
![Preview](https://github.com/aliiev/codestorm-task/raw/master/public/preview.png)

## Frontend
**Technologies**: React, Redux, TypeScript, Sass.

## Backend
**Technologies**: JSON Server, JSON Server Auth.

Backend rewrited for Heroku deployment. Link of deployment: https://codestorm-task-backend.herokuapp.com.

Code:

    const jsonServer = require('json-server')
    const auth = require('json-server-auth')
    const routes = require('./routes.json')
    const cors = require('cors')
    
    const app = jsonServer.create()
    const router = jsonServer.router('data.json')
    const rules = auth.rewriter(routes)
    
    app.db = router.db
    app.use(rules)
    
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', '*')
      res.header('Access-Control-Allow-Methods', '*')
      next()
    })
    
    app.use(auth)
    app.use(router)
    
    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => {
      console.log('JSON Server is running on port ' + PORT)
    })

