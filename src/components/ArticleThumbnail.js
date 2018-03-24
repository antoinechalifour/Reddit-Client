import React from 'react'
import styled from 'styled-components'
import LinkIcon from 'react-icons/lib/md/link'
import SelfIcon from 'react-icons/lib/md/textsms'
import decodeHtmlEntities from 'decode-html'

const Container = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 4px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`

const LinkContainer = Container.extend`
  background-image: linear-gradient( 135deg, #FD6E6A 10%, #FFC600 100%);
`

const SelfContainer = Container.extend`
  background-image: linear-gradient( 135deg, #97ABFF 10%, #123597 100%);
`

const ImageContainer = Container.extend`
  overflow: hidden;
  
  img {
    object-position: 50% 50%;
  }
`

export default function ArticleThumbnail ({ post_hint, ...rest }) {
  switch (post_hint) {
    case 'link':
      return (
        <LinkContainer>
          <LinkIcon />
        </LinkContainer>
      )

    case 'image':
    case 'rich:video':
    case 'hosted:video':
      return (
        <ImageContainer>
          <img
            src={decodeHtmlEntities(rest.preview.images[0].resolutions[0].url)}
          />
        </ImageContainer>
      )

    default:
      return (
        <SelfContainer>
          <SelfIcon />
        </SelfContainer>
      )
  }
}
