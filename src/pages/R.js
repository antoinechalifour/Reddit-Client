import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Header from '../components/Header'
import SubredditLayout from '../components/SubredditLayout'
import SubredditDescription from '../components/SubredditDescription'
import SubredditFilter from '../components/SubredditFilter'

export default class R extends Component {
  static propTypes = {
    api: PropTypes.shape({
      r: PropTypes.shape({
        r: PropTypes.func.isRequired,
        about: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    r: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    listingParams: PropTypes.shape({
      before: PropTypes.string,
      after: PropTypes.string,
      count: PropTypes.number
    }).isRequired
  }

  state = {
    about: null,
    content: null
  }

  componentDidMount () {
    this.syncListing()
    this.syncAbout()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.listingParams !== this.props.listingParams) {
      this.syncListing(this.props.listingParams)
    }

    if (prevProps.r !== this.props.r) {
      this.syncAbout()
    }
  }

  async syncAbout () {
    this.setState({
      about: await this.props.api.r.about(this.props.r)
    })
  }

  async syncListing ({ before, after, count } = {}) {
    const { data } = await this.props.api.r.r(this.props.r, {
      before,
      after,
      count
    })

    this.setState({ content: data }, () => window.scrollTo(0, 0))
  }

  get isLoading () {
    return this.state.about === null || this.state.content === null
  }

  render () {
    if (this.isLoading) {
      return <div>Loading...</div>
    }

    const tabs = [
      {
        label: 'All posts',
        url: 'all'
      },
      {
        label: 'Hot',
        url: 'hot'
      },
      {
        label: 'New',
        url: 'new'
      },
      {
        label: 'Rising',
        url: 'rising'
      },
      {
        label: 'Controversial',
        url: 'controversial'
      },
      {
        label: 'Top',
        url: 'top'
      }
    ]

    return (
      <SubredditLayout
        renderHeader={() => <Header title={`/r/${this.props.r}`} />}
        renderContent={() => (
          <Fragment>
            <FilterTabs>
              {tabs.map(tab => (
                <Tab active={this.props.filter === tab.url}>
                  <NavLink to={`/r/${this.props.r}/${tab.url}`}>
                    {tab.label}
                  </NavLink>
                </Tab>
              ))}
            </FilterTabs>
            <SubredditFilter
              r={this.props.r}
              filter={this.props.filter}
              api={this.props.api}
              listingParams={this.props.listingParams}
            />
          </Fragment>
        )}
        renderRightSidebar={() => (
          <SubredditDescription {...this.state.about} />
        )}
      />
    )
  }
}

const FilterTabs = styled.ul`
  display: flex;
  position: absolute;
  bottom: 100%;
  left: 8px;
  right: 8px;
  background: #0e2974;
  color: #fff;
  justify-content: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const Tab = styled.li`
  border-bottom: 4px solid ${({ active }) => (active ? 'rgba(255, 255, 255, .8)' : 'transparent')};
  padding: 6px 12px;

  & + li {
    margin-left: 8px;
  }

  a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }
`
