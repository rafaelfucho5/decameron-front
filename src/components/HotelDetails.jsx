import { useQuery, useMutation , useQueryClient} from "react-query";
import { showHotel } from "../api/hotelApi";
import {createRoom, deleteRoom, updateRoom} from "../api/roomApi"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const options = [
  { value: "ESTANDAR", label: "ESTANDAR" },
  { value: "JUNIOR", label: "JUNIOR" },
  { value: "SUITE", label: "SUITE" },
];

const accommodations = {
  ESTANDAR: ["SENCILLA", "DOBLE"],
  JUNIOR: ["TRIPLE", "CUADRUPLE"],
  SUITE: ["SENCILLA", "DOBLE", "TRIPLE"],
};

const Select = ({name, label, value, options, onChange }) => (
  <div>
    <label>{label}</label>
    <select name={name} className="form-control" value={value} onChange={onChange}>
      <option value="">-- Select an option --</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const [id, setId] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [type, setType] = useState("");
  const [accommodation, setAccommodation] = useState("");

  const navigate = useNavigate();

  const { data: hotel, isLoading, isError, error } = useQuery({
    queryKey: ["hotelDetail", hotelId],
    queryFn: () => showHotel(hotelId),
  });
  

  const handleTypeChange = (event) => {
    setType(event.target.value);
    setAccommodation("");
  };

  const handleAccommodationChange = (event) => {
    setAccommodation(event.target.value);
  };

  const filteredAccommodations = type ? accommodations[type] : [];
  
  const queryClient = useQueryClient()

  const addRoomMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
        console.log('room add!')
        alert('Habitacion agregada')
        queryClient.invalidateQueries('hotelDetail')
        setModalInsertar(false)
    },
    onError: (error) => {
        alert(error.response.data.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const roomForm = Object.fromEntries(formData)
    const updatedRoomForm = {
      ...roomForm,
      hotel_id: hotelId,
    };
    addRoomMutation.mutate(updatedRoomForm,hotelId)
  };

  const editRoomMutation = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
        console.log('Room edited!')
        queryClient.invalidateQueries('hotelDetail')
        setModalEditar(false)

    },
    onError: (error) => {
        alert(error.response.data.message)
    }
  })

  const deleteRoomMutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
        console.log('product deleted!')
        queryClient.invalidateQueries('hotelDetail')
    },
    onError: (error) => {
        alert(error.response.data.message)
    }
  })

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const formEditData = new FormData(e.target)
    const roomEditForm = Object.fromEntries(formEditData)
    const updatedRoomForm = {
      ...roomEditForm,
      hotel_id: hotelId,
    };
    editRoomMutation.mutate(updatedRoomForm)
  };

  const formEditRoom = (Room) => {
    setId(Room.id)
    setQuantity(Room.quantity)
    setType(Room.type)
    setAccommodation(Room.accommodation) 
    setModalEditar(true)
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  if (isError) {
    return <div>ha ocurrido un error...{error.message}</div>;
  }

  const mostrarModalInsertar = () => {
    setModalInsertar(true)
  }

  const ocultarModalInsertar = () => {
    setModalInsertar(false)
  }
  
  const ocultarModalEditar = () => {
    setModalEditar(false)
  }

  console.log(hotel.data.rooms)
  return (
    <>    
    <Container>
      <Button color="danger" onClick={() => {navigate(`/hotels`)}}> Ir atras</Button>
      <h2>Detalle del Hotel</h2>
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
            <tr >
              <td>{hotel.data.id}</td>
              <td>{hotel.data.name}</td>
              <td>{hotel.data.city}</td>
              <td>{hotel.data.nit}</td>
              <td>{hotel.data.direction}</td>
              <td>
                <Button color="info" onClick={mostrarModalInsertar}>Agregar Habitacion</Button>
              </td>
            </tr>
        </tbody>
      </Table><br/> <br/>

      <h2>Detalles del Habitaciones</h2>
      <Table striped   size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cantidad</th>
            <th>Tipo</th>
            <th>Acomodaion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {hotel.data.rooms.map((room) => (
            <tr key={room.id} >
              <td>{room.id}</td>
              <td>{room.quantity}</td>
              <td>{room.type}</td>
              <td>{room.accommodation}</td>
              <td>
                <Button color="primary" onClick={() => formEditRoom(room)}>Editar</Button>{" "}
                <Button color="danger" onClick={() => {deleteRoomMutation.mutate(room)}}>Eliminar</Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalInsertar}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <div>
              <h3>Inserat Habitacion</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Cantidad</label>
              <input className="form-control" name="quantity" type="integer"  />
            </FormGroup>
            <FormGroup>
              <Select
                name="type"
                label="Tipo"
                value={type}
                options={options}
                onChange={handleTypeChange}
              />
            </FormGroup>
            <FormGroup>
              <Select
                  name="accommodation"
                  label="Acomodacion"
                  value={accommodation}
                  options={filteredAccommodations.map((accommodation) => ({ value: accommodation, label: accommodation }))}
                  onChange={handleAccommodationChange}
                />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Insertar</Button>
            <Button color="danger" onClick={ocultarModalInsertar}>Cancelar</Button>
          </ModalFooter>
        </form>
      </Modal>

      <Modal isOpen={modalEditar}>
        <form onSubmit={handleSubmitEdit}>
          <ModalHeader>
            <div>
              <h3>Editar Hotel</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Cantidad</label>
              <input className="form-control" name="id" readOnly="readonly" hidden value={id} />
              <input className="form-control" name="hotel_id" readOnly="readonly" hidden value={hotelId} />
              <input className="form-control" name="quantity" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Select
                name="type"
                label="Tipo"
                value={type}
                options={options}
                onChange={handleTypeChange}
              />
            </FormGroup>
            <FormGroup>
              <Select
                  name="accommodation"
                  label="Acomodacion"
                  value={accommodation}
                  options={filteredAccommodations.map((accommodation) => ({ value: accommodation, label: accommodation }))}
                  onChange={handleAccommodationChange}
                />
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

export default HotelDetails;
