import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import logo from '../logo.svg'

function ItemCard(props: any) {
  const { item } = props;

  return (
    <Col className='p-0 d-flex justify-content-around'>
      <Card style={{ width: '15rem' }}  border="light" className='shadow h-100'>
        <a href={ item.url }  target="_blank" rel="noreferrer" className='link-secondary'>
          <Row className='justify-content-between'>
            <Card.Img variant="top" src={item.urlToImage ? item.urlToImage : logo} alt={item.title} loading="lazy"/>
            <Card.Body>
              <Card.Title className='fw-bold'> { item.title }</Card.Title>
              <Card.Text>
              { item.content }
              </Card.Text>
            </Card.Body>
          </Row>
        </a>
      </Card>
    </Col>
  );
}


export default ItemCard;