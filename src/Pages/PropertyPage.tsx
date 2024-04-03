import styled from "styled-components"
import { Center } from "../Components/Center"
import { DataProperty } from "../Store/property/service"
import { PageLayout } from "../Components/PageLayout"
import { Image } from "antd"
import { getAllPropertiesURL } from "../lib/nav"
import { Link } from "react-router-dom"
import { NotFoundPage } from "./NotFoundPage"
import { useOneProperty } from "../hooks/useProperty"

export const PropertyPage = ({ id }: { id: string }) => {
  const property = useOneProperty(id)
  if (property === undefined) {
    return <NotFoundPage>Property with id {id} is not found</NotFoundPage>
  }
  return <PropertyPageUI property={property} />
}

const IMG_HEIGHT = 100
export const PropertyPageUI = ({ property }: { property: DataProperty }) => (
  <PageLayout>
    <Center>
      <BackLink to={getAllPropertiesURL()}>&larr; Back to properties</BackLink>
      <h3>{property.name}</h3>

      <h4>Images: {property.images.length}</h4>
      <ImgWrap>
        {property.images.map((img) => (
          <Image
            key={img.id}
            src={img.url}
            alt={`id ${img.id}`}
            height={IMG_HEIGHT}
            width={img.width * (IMG_HEIGHT / img.height)}
          />
        ))}
      </ImgWrap>

      <Col>
        <BubbleBlock>
          <Row label="ID">{property.id}</Row>
          <Row label="Name">{property.name}</Row>
          <Row label="Star Rating">{property.starRating}</Row>
        </BubbleBlock>

        <BubbleBlock>
          <Title>Adress</Title>
          <Row label="City">{property.city}</Row>
          <Row label="Country">{property.country}</Row>
          <Row label="Street">{property.addressLine1}</Row>
        </BubbleBlock>
      </Col>
    </Center>
  </PageLayout>
)

const Row = (props: { label: string; children: React.ReactNode }) => (
  <RowEven>
    <span>{props.label}</span>
    <span>{props.children}</span>
  </RowEven>
)

const BackLink = styled(Link)`
  float: right;
  margin-left: 1em;
`

const ImgWrap = styled.span`
  display: flex;
  & > * {
    margin-right: 5px;
  }
`

const Title = styled.strong`
  margin: 11px 0;
`

const Col = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const RowEven = styled.div`
  display: flex;
  justify-content: space-around;
  justify-content: space-between;
  margin: 13px 0;
`

const BubbleBlock = styled.div`
  padding: 7px 10px;
  background: white;
  margin: 11px 0px;
  border-radius: 11px;
  display: flex;
  flex-direction: column;
`
