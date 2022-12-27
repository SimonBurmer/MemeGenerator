import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge';

var sizeStart = 10;
var sizeEnd = 64;
var sizes = Array(sizeEnd).fill().map(() => sizeStart++);


function MemePreview() {
  return (
      <Card className="card-horizontal mb-3">
        <div class="card-horizontal">
          <div class="img-square-wrapper">
            <img class="" src="http://via.placeholder.com/640x480" alt="Card image cap" />
          </div>
          <div>
            <Card.Body>
              <Card.Title>Die 7 Leben einer Katze</Card.Title>
              <Card.Text>
                Katze fällt von Baum und ist traurig.
                Katze fällt von Baum und ist traurig.
                Katze fällt von Baum und ist traurig.
                Katze fällt von Baum und ist traurig.
              </Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
              <ListGroup.Item>Votes:
                <Badge bg="success" pill>
                  Up: 16
                </Badge>
                <Badge bg="danger" pill>
                  Down: 3
                </Badge>
              </ListGroup.Item>

              <ListGroup.Item>Comments:
                <Badge bg="info" pill>
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                Ersteller: 
                <Badge bg="info" pill>
                  Simis Bumser
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                Veröffentlicht: 
                <Badge bg="info" pill>
                  14.09.2022
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="col-md-12 text-center">
              <Button className="mt-4" variant="outline-primary">Bearbeiten</Button>{' '}
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </Card>
  );
}

export default MemePreview;