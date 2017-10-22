import styled from 'styled-components'

export const Branding = styled.h1`
  font-family: 'Sacramento';
  font-size: 36px;
  font-weight: 300;
  margin: 0;

`

export const BrandingLogo = styled.img`
  height: 40px;
  vertical-align: top;

`

export const Splash = styled.div`
  background-image: url('/images/splash-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: white;
`

export const InnerSplash = styled.div`
  background-color: rgba(26,188,156, 0.75);
  text-align: center;
  padding: 35vh 20px 20px 50px;
  min-height: 80vh;
  color: white;
`

export const PageContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
`

export const Button = styled.button`
  appearance: none;
  background-color: transparent;
  color: white;
  border: 3px solid white;
  line-height: 50px;
  padding: 0 40px;
  min-width: 200px;

  &:hover {
    background-color: white;
    color: rgb(26,188,156);
  }

  transition: all 0.3s;
`

export const InlineImg = styled.img`
  vertical-align: middle;
`