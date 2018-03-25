import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Header from 'components/core/Header'
import Loader from 'components/core/Loader'
import Layout from 'components/Subreddit/Layout'
import Description from 'components/Subreddit/Description'
import Filter from 'components/Subreddit/Filter'

export default class RPage extends Component {
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
    about: null
  }

  componentDidMount () {
    this.syncAbout()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.r !== this.props.r) {
      this.syncAbout()
    }
  }

  async syncAbout () {
    this.setState({
      about: await this.props.api.r.about(this.props.r)
    })
  }

  get isLoading () {
    return this.state.about === null
  }

  render () {
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
      <Layout
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
            {this.isLoading
              ? <Loader />
              : <Filter
                r={this.props.r}
                filter={this.props.filter}
                api={this.props.api}
                listingParams={this.props.listingParams}
                />}
          </Fragment>
        )}
        renderRightSidebar={() =>
          (this.isLoading ? null : <Description {...this.state.about} />)}
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
  background: rgba(0, 0, 0, .45);
  color: #fff;
  justify-content: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const Tab = styled.li`
  border-bottom: 4px solid ${({ active }) => (active ? 'rgba(255, 255, 255, .8)' : 'transparent')};
  padding: 6px 12px;
  text-transform: uppercase;

  & + li {
    margin-left: 8px;
  }

  a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
  }
`
