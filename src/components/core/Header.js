import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ApiContext from 'components/core/ApiContext'
import AccountContext from 'components/core/AccountContext'
import SearchBox from 'components/core/SearchBox'
import Account from 'components/core/AccountSummary'

export default function Header ({ title }) {
  return (
    <Container>
      <div>
        <Link to='/'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={48}
            height={48}
            viewBox='0 0 24 24'
            fill='#fff'
          >
            <path d='M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z' />
          </svg>
        </Link>
        <h1>{title}</h1>
      </div>

      <ApiContext.Consumer>
        {({ api }) => (
          <Fragment>
            <SearchContainer>
              <SearchBox api={api} />
            </SearchContainer>
            <AccountContext.Consumer>
              {account =>
                (account.isLoggedIn
                  ? <Account api={api} account={account} />
                  : <a href='https://www.reddit.com/api/v1/authorize?client_id=GDObwCGoh5qWdg&response_type=code&state=_&redirect_uri=http://localhost:3000/oauth&duration=permanent&scope=identity edit history mysubreddits read save submit subscribe vote'>
                      Login
                    </a>)}
            </AccountContext.Consumer>
          </Fragment>
        )}
      </ApiContext.Consumer>

    </Container>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

const Container = styled.header`
  display: flex;
  flex-direction: column-reverse;
  background-image: linear-gradient(-8deg, #1a4ddb 10%, #123597 100%);
  box-shadow: 0 1px 12px rgba(18, 53, 151, .4);
  color: #fff;
  padding: 16px;
  padding-bottom: 48px;

  a {
    line-height: 0;
    margin-right: 16px;
  }

  h1 {
    font-family: var(--typography-title);
    font-size: 32px;
    text-shadow: 0 3px 1px #123597;
    display: inline;
  }

  > :first-child {
    flex: 1;
    display: flex;
    align-items: center;
  }

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
    padding-bottom: 96px;
  }
`

const SearchContainer = styled.div`
  align-self: flex-end;
  margin-bottom: 12px;

  @media (min-width: 600px) {
    align-self: flex-start;
    margin-bottom: 0;
  }

`
