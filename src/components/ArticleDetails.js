import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import format from 'date-fns/format'
import LinkIcon from 'react-icons/lib/md/link'
import decodeHtmlEntities from 'decode-html'
import HintText from './HintText'

export default function ArticleDetails ({ data }) {
  return (
    <Container>
      <Header>
        <Title>{data.title}</Title>
        <Information>
          <span>{data.author}</span>
          <span>{format(new Date(data.created_utc * 1000), 'DD/MM/YYYY')}</span>
        </Information>
      </Header>

      {data.post_hint === 'image'
        ? <ImagePost src={decodeHtmlEntities(data.url)} />
        : null}

      {data.post_hint === 'link'
        ? <Content>
          <LinksContainer>
            <Link href={data.url} target='_blank' rel='noopener'>
              <LinkIcon />
            </Link>
            <div>
              <HintText>Click to open link</HintText>
            </div>
          </LinksContainer>
        </Content>
        : null}
    </Container>
  )
}

ArticleDetails.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    created_utc: PropTypes.number.isRequired,
    post_hint: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
}

const Container = styled.div`
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, .2);
`

const Header = styled.div`
  padding: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`

const Content = styled.div`
  padding-left: 12px;
  padding-bottom: 12px;
  padding-right: 12px;
`

const Title = styled.h1`

`

const Information = styled.div`
  span {
    opacity: .5;
    font-size: 80%;
  }

  > span + span::before {
    content: '•';
    margin: 0 8px;
  }
`

const ImagePost = styled.img`
  width: 100%;
  display: block;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  margin-top: -12px;
`

const LinksContainer = styled.div`
  text-align: center;
`

const Link = styled.a`
  width: 64px;
  height: 64px;
  cursor: pointer;
  background: #123597;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transform: rotate(0deg);
  transition: transform .3s ease;
  font-size: 32px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, .3);
  margin-bottom: 12px;

  :hover {
    transform: rotate(6deg);
  }
`
