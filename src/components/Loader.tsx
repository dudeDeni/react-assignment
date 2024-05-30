import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <div className="w-100 d-flex justify-content-center">
      <Spinner animation="grow" variant="primary"/>
      <Spinner animation="grow" variant="primary"/>
      <Spinner animation="grow" variant="primary"/>
    </div>
  );
}

export default Loader;