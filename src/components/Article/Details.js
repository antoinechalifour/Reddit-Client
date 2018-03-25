import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LinkIcon from 'react-icons/lib/md/link'
import decodeHtmlEntities from 'decode-html'
import UserContent from 'components/core/UserContent'
import UserName from 'components/core/UserName'
import CaptionGroup from 'components/core/CaptionGroup'
import FormattedDate from 'components/core/FormattedDate'
import HintText from 'components/core/HintText'

function PostContent ({
  is_self,
  is_reddit_media_domain,
  media,
  selftext,
  preview,
  thumbnail,
  post_hint,
  url
}) {
  if (is_self) {
    return <SelfContent>{selftext}</SelfContent>
  } else if (is_reddit_media_domain && media) {
    return (
      <MediaPost>
        <MediaBackground src={decodeHtmlEntities(thumbnail)} />
        <video controls autoPlay src={media.reddit_video.fallback_url} />
      </MediaPost>
    )
  } else if (is_reddit_media_domain || post_hint === 'image') {
    return (
      <MediaPost>
        <MediaBackground src={decodeHtmlEntities(thumbnail)} />
        <img src={decodeHtmlEntities(url)} />
      </MediaPost>
    )
  } else if (preview && preview.reddit_video_preview) {
    return (
      <MediaPost>
        <MediaBackground src={decodeHtmlEntities(thumbnail)} />
        <video
          controls
          autoPlay
          src={preview.reddit_video_preview.fallback_url}
        />
      </MediaPost>
    )
  } else if (media) {
    return (
      <IframeContent>
        <div
          dangerouslySetInnerHTML={{
            __html: decodeHtmlEntities(media.oembed.html)
          }}
        />
      </IframeContent>
    )
  } else {
    return (
      <LinksContainer>
        <Link href={url} target='_blank' rel='noopener'>
          <LinkIcon />
        </Link>
        <div>
          <HintText>Click to open link</HintText>
        </div>
      </LinksContainer>
    )
  }
}

export default function Details ({ data }) {
  return (
    <Container>
      <Header>
        <Title>{data.title}</Title>
        <CaptionGroup>
          <UserName>{data.author}</UserName>
          <FormattedDate>{new Date(data.created_utc * 1000)}</FormattedDate>
        </CaptionGroup>
      </Header>

      <PostContent {...data} />
    </Container>
  )
}

Details.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    created_utc: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    post_hint: PropTypes.string
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

const SelfContent = styled(UserContent)`
  padding-left: 12px;
  padding-bottom: 12px;
  padding-right: 12px;
`

const Title = styled.h1`

`

const MediaPost = styled.div`
  width: 100%;
  display: block;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  margin-top: -12px;
  position: relative;
  min-height: 500px;
  overflow: hidden;

  img, video {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    max-height: 95%;
    max-width: 95%;
    margin: auto;
  }
`

const MediaBackground = styled.img`
  && {
    max-height: none;
    max-width: none;
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scale(1.5);
    filter: blur(10px);
  }
`

const IframeContent = styled.div`
  iframe {
    width: 100%;
    display: block;
    margin-top: -12px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }
`

const LinksContainer = styled.div`
  text-align: center;
  padding: 12px;
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
