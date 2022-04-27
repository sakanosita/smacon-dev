import {
    FacebookIcon,
    FacebookShareButton,
    // HatenaIcon,
    // HatenaShareButton,
    LineIcon,
    LineShareButton,
    TwitterIcon,
    TwitterShareButton
} from 'react-share'

import React from 'react'
import styled from '@emotion/styled'

const ShareButtonList = ({title, url}) => {
  return (
    <Wrapper>
      <ButtonWrapper>
        <FacebookShareButton url={url}>
          <FacebookIcon size={36} round />
        </FacebookShareButton>
      </ButtonWrapper>

      <ButtonWrapper>
        <TwitterShareButton title={title} url={url} >
          <TwitterIcon size={36} round />
        </TwitterShareButton>
      </ButtonWrapper>

      <ButtonWrapper>
        <LineShareButton url={url} >
          <LineIcon size={36} round />
        </LineShareButton>
      </ButtonWrapper>

      {/* <ButtonWrapper>
        <HatenaShareButton url={url} >
          <HatenaIcon size={40} round />
        </HatenaShareButton>
      </ButtonWrapper> */}
    </Wrapper>
  )
}

export default ShareButtonList

   
const Wrapper = styled.div`
  display: flex;
  margin-top: var(--size-600);
  margin-left: var(--size-400);
  padding-bottom: 24px;
`

const ButtonWrapper = styled.div`
  padding-right: 12px;
`
