import express from 'express'
import apiRouter from './routers/api.js'

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use('/api', apiRouter)
app.use('/apiv2', apiRouter)
app.get('/', (req, res) => {
    res.send(`
    <h1>My Travel Wishlist API </h1>
    `)
})
app.listen(port, () => console.log('Ready and connected'))
