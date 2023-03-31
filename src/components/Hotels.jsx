import { useQuery, useMutation , useQueryClient} from "react-query";
import { deleteHotel, getHotels, updateHotel } from "../api/hotelApi";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hotels = () => {
  const { data: hotels, isLoading, isError, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: getHotels,
  });
  const [modalEditar, setModalEditar] = useState(false);
  
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [roomNumber, setRoomNumber] = useState(null);
  const [city, setCity] = useState(null); 
  const [nit, setNit] = useState(null); 
  const [direction, setDirection] = useState(null); 

  const navigate = useNavigate();

  const details = (id) => {
    navigate(`/${id}`);
  };

  const formEditHotel = (hotel) => {
    setId(hotel.id)
    setName(hotel.name)
    setRoomNumber(hotel.room_number)
    setCity(hotel.city) 
    setNit(hotel.nit) 
    setDirection(hotel.direction)
    setModalEditar(true)
  }

  const queryClient = useQueryClient()

  const deleteHotelMutation = useMutation({
    mutationFn: deleteHotel,
    onSuccess: () => {
        console.log('product deleted!')
        queryClient.invalidateQueries('hotels')
    },
    onError: (error) => {
        alert(error.response.data.message)
    }
  })

  const editHotelMutation = useMutation({
    mutationFn: updateHotel,
    onSuccess: () => {
        console.log('hotel edited!')
        queryClient.invalidateQueries('hotels')
    },
    onError: (error) => {
        alert(error.response.data.message)
    }
  })

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const hotelForm = Object.fromEntries(formData)
    editHotelMutation.mutate(hotelForm)
  };

  const ocultarModalEditar = () => {
    setModalEditar(false)
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  if (isError) {
    return <div>ha ocurrido un error...{error.message}</div>;
  }

  return (
    <>    
    <Container>
    <h2>Lista de Hoteles</h2>
    <Table striped   size="sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Ciudad</th>
          <th>NIT</th>
          <th>Direccion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {hotels.data.map((hotel) => (
          <tr key={hotel.id}>
            <td>{hotel.id}</td>
            <td>{hotel.name}</td>
            <td>{hotel.city}</td>
            <td>{hotel.nit}</td>
            <td>{hotel.direction}</td>
            <td>
              <Button color="warning" onClick={() => details(hotel.id)}>Detalles</Button>{" "}
              <Button color="primary" onClick={() => formEditHotel(hotel)}>Editar</Button>{" "}
              <Button color="danger" onClick={() => {deleteHotelMutation.mutate(hotel.id)}}>Eliminar</Button>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    <Modal isOpen={modalEditar}>
          <form onSubmit={handleSubmitEdit}>
            <ModalHeader>
              <div>
                <h3>Editar Hotel</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>Nombre</label>
                <input className="form-control" name="id" readOnly="readonly" hidden value={id} />
                <input className="form-control" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <label>Ciudad</label>
                <input className="form-control" name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <label>Numero de Habitaciones</label>
                <input className="form-control" name="room_number" type="integer" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <label>Nit</label>
                <input className="form-control" name="nit" type="text" value={nit} onChange={(e) => setNit(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <label>Direccion</label>
                <input className="form-control" name="direction" type="area" value={direction} onChange={(e) => setDirection(e.target.value)} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Editar</Button>
              <Button color="danger" onClick={ocultarModalEditar}>Cancelar</Button>
            </ModalFooter>
          </form>
        </Modal>
    </Container>
    </>
  );
};

export default Hotels;
