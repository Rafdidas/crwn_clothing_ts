import styled, { css } from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`

export const InfoStyles = css`
  width: 23%;
`

export const CheckoutName = styled.span`
  ${InfoStyles}
`
export const CheckoutQuantity = styled.span`
  ${InfoStyles}
  display: flex;
  .arrow {
    cursor: pointer;
  }

  .value {
    margin: 0 10px;
  }
`
export const CheckoutPrice = styled.span`
  ${InfoStyles}
`
export const RemoveButton = styled.span`
  padding-left: 12px;
  cursor: pointer;
`