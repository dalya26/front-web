/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function UserUpdate() {
  const endpoint = 'http://192.168.1.10:8000/api';

  const { _id } = useParams();
  let navigate = useNavigate();

  function navigateTo(string) {
    navigate(string);
  }

  //validacion login
  const [errors, setErrors] = useState({});
  const validateSing = () => {
    const newErrors = {};

    // Validar correo electrónico usando expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!users.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!emailRegex.test(users.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    const nameRegex = /^[^\d\s]+$/;
    if (!users.name) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (!nameRegex.test(users.name)) {
      newErrors.name = 'El nombre no debe contener números ni espacios';
    }

    if (!users.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    // Validar que la contraseña coincida con la confirmación de la contraseña
    if (users.password !== users.password_confirmation) {
      newErrors.password_confirmation = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (!validateSing()) {
      return; // Detener el proceso de registro si hay errores de validación
    }
    try {
      const response = await axios.post(`${endpoint}/userupdate`, users, {
        headers: { 'Content-Type': "multipart/form-data" }
      });
      navigateTo('/weblog'); // No se proporciona la implementación de navigateTo
    } catch (error) {
      console.error("Error al guardar el post:", error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje de error al usuario
    }
  };

  const [users, setUsers] = useState(
    {
      id: 0,
      name: '',
      image: null,
      email: '',
      password: '',
      password_confirmation: '',
    }
  );

  const getUser = async () => {

    await axios
      .get(`${endpoint}/usuario`, {
        params: { id: _id },
      })
      .then((response) => {
        setUsers(response.data);
      });
  };

  const inputChange = (event) => {

    if (event.target.name === 'image') {
      const file = event.target.files[0]; // Obtener el archivo de la imagen
      setUsers({
        ...users,
        image: file,
        imageName: file.name // Guardar el nombre del archivo en el estado
      });
    } else {
      setUsers({
        ...users,
        [event.target.name]: event.target.value
      });
    }
  };

  useEffect(() => {
    if (_id === undefined) {
      console.log("sin parametros");
    } else {
      getUser();
    }
  }, [])

  const maxNumber = 69;

  //error al mostrar la informacion del usuario
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Información de usuario</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        Selecionar una imagen: {users.imageName && <p> {users.imageName}</p>}
                        <Button className='tim-icons icon-cloud-upload-94' color='info'>
                          <Input
                            name="image"
                            type="file"
                            maxNumber={maxNumber}
                            //value={post.image}
                            //onChange={inputChange}
                            onChange={inputChange} accept="image/*"
                          />
                        </Button>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Nombre</label>
                        <Input
                        id='name'
                          placeholder="Username"
                          type="text"
                          value={users.name}
                          onChange={inputChange}
                          name='name'
                        />
                        {errors.name && <span className='span-alert'>{errors.name}</span>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Correo electrónico
                        </label>
                        <Input id='email' placeholder="mike@email.com" name='email' type="email" value={users.email}
                          onChange={inputChange} />
                        {errors.email && <span className='span-alert'>{errors.email}</span>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Contraseña</label>
                        <Input
                        id='password'
                          type="password"
                          name='password'
                          value={users.password}
                          onChange={inputChange}
                        />
                        {errors.password && <span className='span-alert'>{errors.password}</span>}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Confirmar contraseña</label>
                        <Input
                        id='password_confirmation'
                          type="password"
                          name='password_confirmation'
                          value={users.password_confirmation}
                          onChange={inputChange}
                        />
                        {errors.confirmPassword && <span className='span-alert'>{errors.confirmPassword}</span>}
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit" onClick={saveUser}>
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserUpdate;
