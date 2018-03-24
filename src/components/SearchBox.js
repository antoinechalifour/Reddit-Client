import React, { Component } from 'react'
import SearchIcon from 'react-icons/lib/md/search'
import styled, { keyframes } from 'styled-components'
import debounce from 'debounce'
import { Link } from 'react-router-dom'

export default class SearchBox extends Component {
  constructor (props) {
    super(props)

    this.state = {
      search: '',
      suggestions: undefined,
      showSuggestions: false
    }
    this.searchSuggestions = debounce(this.searchSuggestions.bind(this), 300)
  }

  onSearchChange = e => {
    this.setState({ search: e.target.value })
    this.searchSuggestions()
  }

  onSearchKeyUp = e => {
    if (e.keyCode) {
      this.setState({ showSuggestions: false })
    }
  }

  resetState = () => {
    this.setState({
      search: '',
      suggestions: undefined,
      showSuggestions: false
    })
  }

  async searchSuggestions () {
    const results = await this.props.api.r.search(this.state.search)

    this.setState({ suggestions: results.data, showSuggestions: true })
  }

  render () {
    return (
      <Container>
        <input
          type='text'
          placeholder='Explore reddit'
          value={this.state.search}
          onChange={this.onSearchChange}
          onKeyUp={this.onSearchKeyUp}
          style={{
            transform: this.state.search ? 'scaleX(1)' : null
          }}
        />
        <button type='submit'>
          <SearchIcon />
        </button>

        {this.state.showSuggestions
          ? <Suggestions>
            {this.state.suggestions.children.map(({ data }) => (
              <li>
                <Link to={data.url} onClick={this.resetState}>
                  {data.url}
                </Link>
              </li>
              ))}
          </Suggestions>
          : null}
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  position: relative;


  input{
    transform: scaleX(0);
    transform-origin: right;
    transition: transform .1s ease;
    border: none;
    background: none;
    border-bottom: 2px solid rgba(255, 255, 255, .75);
    font-size: inherit;
    outline: none;
    color: inherit;

    ::placeholder {
      color: rgba(255, 255, 255, .33);
    }
  }

  input:focus {
    transform: scaleX(1);
  }

  :hover input{
    transform: scaleX(1);
  }

  button {
    border: none;
    background: none;
    font-size: 24px;
    color: inherit;
    cursor: pointer;
    outline: none;
  }
`

const enterAnimation = keyframes`
  0% {
    transform: scaleY(0);
  }

  100% {
    transform: scaleY(100%);
  }
`

const Suggestions = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background: rgba(255, 255, 255, .95);
  padding: 12px;
  z-index: 1;
  max-height: 350px;
  overflow-y: auto;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .13);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  animation: ${enterAnimation} .3s ease;
  transform-origin: top right;

  li {
    padding: 4px 0;
  }

  a {
    text-decoration: none;
    color: #373d3f;
  }

  li + {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
`
