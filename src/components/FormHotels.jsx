import {useMutation , useQueryClient} from "react-query";
import { createHotel, getHotels } from "../api/hotelApi";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { useState } from "react";

const FormHotels = () => {
  const [modalInsertar, setModalInsertar] = useState(false);

  const queryClient = useQueryClient()

  const addHotelMutation = useMutation({
    mutationFn: createHotel,
    onSuccess: () => {
        console.log('hotel add!')
        queryClient.invalidateQueries('hotels')
    },
    onError: (error) => {
        alert(error.response.data.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const hotelForm = Object.fromEntries(formData)
    addHotelMutation.mutate(hotelForm)
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true)
  }

  const ocultarModalInsertar = () => {
    setModalInsertar(false)
  }

  return (
    <>
      <Container>
        <Button color="success" onClick={mostrarModalInsertar}>Crear Hotel</Button>
        <br />
        <br />
        <Modal isOpen={modalInsertar}>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <div>
                <h3>Insertar Hotel</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>Nombre</label>
                <input className="form-control" name="name" type="text" />
              </FormGroup>
              <FormGroup>
                <label>Ciudad</label>
                <input className="form-control" name="city" type="text" />
              </FormGroup>
              <FormGroup>
                <label>Numero de Habitaciones</label>
                <input className="form-control" name="room_number" type="integer" />
              </FormGroup>
              <FormGroup>
                <label>Nit</label>
                <input className="form-control" name="nit" type="text" />
              </FormGroup>
              <FormGroup>
                <label>Direccion</label>
                <input className="form-control" name="direction" type="area" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Insertar</Button>
              <Button color="danger" onClick={ocultarModalInsertar}>Cancelar</Button>
            </ModalFooter>
          </form>
        </Modal>
      </Container>
    </>
  );
};

export default FormHotels;
