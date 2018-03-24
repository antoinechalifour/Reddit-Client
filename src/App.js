import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Home from './pages/Home'
import Comments from './pages/Comments'
import R from './pages/R'
import { getListingFromQuerystring } from './util/listings'
import ApiContext from './components/ApiContext'

export default function App ({ api }) {
  return (
    <StyleProvider>
      <ApiContext.Provider value={{ api }}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/'
              render={({ history }) => (
                <Home
                  api={api}
                  listingParams={getListingFromQuerystring(
                    history.location.search
                  )}
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
                  listingParams={getListingFromQuerystring(
                    history.location.search
                  )}
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
      </ApiContext.Provider>
    </StyleProvider>
  )
}

App.propTypes = {
  api: PropTypes.object.isRequired
}

const StyleProvider = styled.div`
  --typography-main: 'Oxygen', sans-serif;
  --typography-title: 'Raleway', sans-serif;

  color: #3737d3f;
  font-size: 18px;
  line-height: 1.5;
  font-family: var(--typography-main);

  * {
    box-sizing: border-box;
  }
`
