import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Comments from './pages/Comments'
import R from './pages/R'
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
        <Route
          exact
          path='/r/:r'
          render={({ history, match }) => (
            <R
              r={match.params.r}
              api={api}
              listingParams={getListingFromQuerystring(history.location.search)}
            />
          )}
        />
        <Route
          exact
          path='/comments/:id'
          render={({ match }) => (
            <Comments api={api} articleId={match.params.id} />
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
