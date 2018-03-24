import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import { getListingFromQuerystring } from './util/listings'

export default function App ({ api }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path='/'
          render={({ history }) => (
            <Home
              api={api}
              listingParams={getListingFromQuerystring(history.location.search)}
            />
          )}
        />
        <Route render={() => <div>Not found :'(</div>} />
      </Switch>
    </BrowserRouter>
  )
}

App.propTypes = {
  api: PropTypes.object.isRequired
}
