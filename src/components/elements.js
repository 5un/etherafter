import styled from 'styled-components'

export const H1 = styled.h1`
  margin: 0;
`

export const H2 = styled.h2`
  margin: 0;
`

export const H3 = styled.h3`
  margin: 0;
`

export const H4 = styled.h4`
  margin: 0;
`

export const H5 = styled.h5`
  margin: 0;
`

export const P = styled.p`
  margin: 0;
`

export const Row = styled.div`
  display: block;
`

export const Col = styled.div`
  display: inline-block;
  vertical-align: top;
`

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
  padding: 100px 40px 40px 40px;
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

export const GreenButton = styled.button`
  appearance: none;
  background-color: rgb(26,188,156);
  border: 0;
  color: white;
  line-height: 50px;
  padding: 0 40px;
  min-width: 200px;

  &:hover {
    background-color: rgb(36,198,166);
  }

  transition: all 0.3s;
`


export const PrimaryButton = styled(GreenButton)`

`

export const SecondaryButton = styled(Button)`
  color: #444444;
  border: 3px solid #444444;
`


export const InlineImg = styled.img`
  vertical-align: middle;
`

export const FormGroup = styled.div`
  margin-bottom: 10px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 2px;
`

export const InputText = styled.input`
  color: #444444;
  border-radius: 4px;
  border: 1px solid #cccccc;
  min-width: 240px;
  padding: 10px;
`

export const RadioOption = styled.div`
  padding: 10px;
`

export const Padding20Box = styled.div`
  padding: 20px;
`

export const BigNumber = styled.div`
  font-size: 48px;
  color: rgb(26,188,156);
`
