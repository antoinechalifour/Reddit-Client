import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Home = () => <div>Hello world</div>

export default function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route render={() => <div>Not found :'(</div>} />
      </Switch>
    </BrowserRouter>
  )
}
