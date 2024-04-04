import styled from "styled-components"

export const Gray = styled.span`
  color: #999;
  h1 > &,
  h2 > & {
    font-weight: 100;
  }
  h3 > &,
  h4 > &,
  h5 > &,
  h6 > & {
    font-weight: 300;
  }
`

export const BubbleBlock = styled.div`
  padding: 7px 10px;
  background: white;
  margin: 0 0 15px;
  border-radius: 11px;
  display: flex;
  flex-direction: column;
`

export const Center = styled.div`
  width: 80%;
  margin: auto;
`

export const Subtitle = styled.span`
  display: block;
  color: #888;
  font-size: 14px;
  font-style: normal;
`
