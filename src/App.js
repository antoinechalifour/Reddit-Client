import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { getListingFromQuerystring } from 'util/listings'
import AccountProvider from 'components/core/AccountProvider'
import ApiContext from 'components/core/ApiContext'
import AccountContext from 'components/core/AccountContext'
import LoadPage from 'pages/LoadPage'

export default function App ({ api }) {
  return (
    <AccountProvider>
      <StyleProvider>
        <ApiContext.Provider value={{ api }}>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path='/'
                render={({ history }) => (
                  <LoadPage loader={() => import('pages/Home')}>
                    {component =>
                      (component
                        ? <component.default
                          api={api}
                          listingParams={getListingFromQuerystring(
                              history.location.search
                            )}
                          />
                        : null)}
                  </LoadPage>
                )}
              />
              <Route
                exact
                path='/r/:r/:filter'
                render={({ history, match }) => (
                  <LoadPage loader={() => import('pages/R')}>
                    {component =>
                      (component
                        ? <component.default
                          r={match.params.r}
                          filter={match.params.filter}
                          api={api}
                          listingParams={getListingFromQuerystring(
                              history.location.search
                            )}
                          />
                        : null)}
                  </LoadPage>
                )}
              />
              <Route
                exact
                path='/r/:r'
                render={props => (
                  <Redirect to={`/r/${props.match.params.r}/all`} />
                )}
              />
              <Route
                exact
                path='/comments/:id'
                render={({ match }) => (
                  <LoadPage loader={() => import('pages/Comments')}>
                    {component =>
                      (component
                        ? <component.default
                          api={api}
                          articleId={match.params.id}
                          />
                        : null)}
                  </LoadPage>
                )}
              />
              <Route
                exact
                path='/oauth'
                render={({ location }) => {
                  const params = new URLSearchParams(location.search)

                  return (
                    <LoadPage loader={() => import('pages/Oauth')}>
                      {component =>
                        (component
                          ? <AccountContext.Consumer>
                            {account => (
                              <component.default
                                api={api}
                                code={params.get('code')}
                                account={account}
                                />
                              )}
                          </AccountContext.Consumer>
                          : null)}
                    </LoadPage>
                  )
                }}
              />
              <Route render={() => <div>Not found :'(</div>} />
            </Switch>
          </BrowserRouter>
        </ApiContext.Provider>
      </StyleProvider>
    </AccountProvider>
  )
}

App.propTypes = {
  api: PropTypes.object.isRequired
}

const StyleProvider = styled.div`
  --typography-main: 'Oxygen', sans-serif;
  --typography-title: 'Raleway', sans-serif;

  color: #3737d3f;
  font-size: 15px;
  line-height: 1.5;
  font-family: var(--typography-main);

  * {
    box-sizing: border-box;
  }

  @media (min-width: 1000px) {
    font-size: 18px;
  }
`
