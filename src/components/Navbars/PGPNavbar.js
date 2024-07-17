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
import React, { useState, useRef } from 'react';
import Typewriter from "typewriter-effect";
import 'assets/demo/demo.css';
import { useNavigate } from 'react-router-dom';


// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardGroup,
  CardTitle,
  CardFooter,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Row,
} from "reactstrap";

const PGPNavbar = (props) => {
  const [modal, setModal] = useState(false);
  const [modalIni, setModalIni] = useState(false);

  const toggle = () => setModal(!modal);

  const toggle1 = () => setModalIni(!modalIni);

  const externalCloseBtn = (
    <button
      type="button"
      className="close"
      onClick={toggle}
    >
      &times;
    </button>
  );

  const closeBtn = (
    <button className="close" onClick={toggle1} type="button" >
      &times;
    </button>
  );

  //form sing in
  const endpoint = 'http://192.168.1.10:8000/api'
  let navigate = useNavigate();

  function navigateTo(string) {
    navigate(string);
  }

  const [image, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  //validacion 
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

  const saveUsers = async (e) => {
    e.preventDefault();
    if (!validateSing()) {
      return; // Detener el proceso de registro si hay errores de validación
    }

    const formData = new FormData();
    formData.append('name', users.name);
    formData.append('image', users.image);
    formData.append('email', users.email);
    formData.append('password', users.password);
    formData.append('password_confirmation', users.password_confirmation);
    try {
      const response = await axios.post(`${endpoint}/regus`, formData);
      toggle();
      toggle1();
    } catch (error) {
      console.error("Error al registrar al usuario:", error);
      alert('Este correo electronico ya esta registrado. Talvez deberias iniciar sesión.');
    }
  }

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
        [event.target.name]: event.target.value});
    }
  };

  //login
  //validacion login
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!datosLogin.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!emailRegex.test(datosLogin.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!datosLogin.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toast = useRef(null);

  const [datosLogin, setDatosLogin] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const inputChangelogin = (event) => {

    setDatosLogin({
      ...datosLogin,
      [event.target.name]: event.target.value
    })
  }

  const fn_login = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      navigateTo('/weblog/programming/')// No continuar si hay errores en la validación
    }

    try {
      const response = await axios.post(`${endpoint}/login`, datosLogin);

      localStorage.setItem('token', response.data.token);
      setError('');
      navigate('/weblog');
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert('Parece que aun no estas registrado');
      
    }
  }


  return (
    <>
      <div>
        <CardGroup>
          <Card className='general'>
            <CardBody>
              <CardTitle className='logo-img-w'>
                <img alt="..." src={require("assets/img/wlp.png")} />
              </CardTitle>
            </CardBody>
            <CardBody>
              <CardText tag='h1' className='type-letter'>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Bienvenido a WebLog! ")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Resuelve tus dudas")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Aprende de tus errores")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Y Avanza ;)")
                      .start();
                  }}
                />
              </CardText>
            </CardBody>
          </Card>
          <Card>
            <CardBody className='title-letter'>
              <CardTitle tag="h1" >
                Empecemos!
              </CardTitle>
              <CardText >
                <Button className='button-style-color' color="info" onClick={toggle}>
                  Registrarse
                </Button>
                <Modal isOpen={modal} toggle={toggle} >
                  <ModalHeader close={externalCloseBtn} className='tittle-modal'>REGISTRATE</ModalHeader>
                  <ModalBody>
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
                              className='text-dark'
                              defaultValue="michael23"
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
                        <Col >
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Correo electrónico
                            </label>
                            <Input placeholder="mike@email.com" className='text-dark' name='email' type="email" value={users.email}
                              onChange={inputChange} />
                            {errors.email && <span className='span-alert'>{errors.email}</span>}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row >
                        <Col >
                          <FormGroup>
                            <label>Contraseña</label>
                            <Input
                              className='text-dark'
                              type="password"
                              name='password'
                              value={users.password}
                              onChange={inputChange}
                            />
                            {errors.password && <span className='span-alert'>{errors.password}</span>}
                          </FormGroup>
                        </Col>
                        <Col >
                          <FormGroup>
                            <label>Confirmar contraseña</label>
                            <Input
                              className='text-dark'
                              type="password"
                              name='password_confirmation'
                              value={users.password_confirmation}
                              onChange={inputChange}
                            />
                            {errors.confirmPassword && <span className='span-alert'>{errors.confirmPassword}</span>}
                          </FormGroup>
                        </Col>
                      </Row>
                      <ModalFooter >
                        ¿Ya tienes una cuenta? | <Button color="link" onClick={toggle1} >Iniciar sesión</Button>
                        <Button className="btn-fill" color='info' type="submit" onClick={saveUsers}>
                          Registrarse
                        </Button>
                      </ModalFooter>
                  </ModalBody>
                </Modal>
                <Button className='button-style-color' color="info" onClick={toggle1}>
                  Iniciar sesion
                </Button>
                <Modal isOpen={modalIni} toggle={toggle1} >
                  <ModalHeader close={closeBtn} className='tittle-modal'>Iniciar Sesión</ModalHeader>
                  <ModalBody >
                      <Row>
                        <Col >
                          <FormGroup >
                            <label>Correo</label>
                            <Input
                              className='text-dark'
                              value={datosLogin.email}
                              onChange={(e) => inputChangelogin(e)}
                              name='email'
                            />
                            {errors.email && <span className='span-alert'>{errors.email}</span>}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row >
                        <Col >
                          <FormGroup>
                            <label>Contraseña</label>
                            <Input
                              className='text-dark'
                              type="password"
                              name='password'
                              value={datosLogin.password}
                              onChange={(e) => inputChangelogin(e)}
                            />
                            {errors.password && <span className='span-alert'>{errors.password}</span>}
                          </FormGroup>
                        </Col>
                      </Row>
                      <ModalFooter >
                        ¿Aun no tienes una cuenta? | <Button color="link" onClick={toggle} >Registrarse</Button>
                        <Button className="btn-fill" color="info" onClick={fn_login}>
                          Iniciar sesion
                        </Button>
                      </ModalFooter>
                  </ModalBody>
                </Modal>


              </CardText>
              <CardFooter className='footer-card'>
                <img className='logo-img-h' alt="..." src={require("assets/img/hermeslog.png")} /><p />
                <Button color='link'>Nosotros</Button>
                <Button color='link'>Aviso de privacidad</Button>
              </CardFooter>
            </CardBody>
          </Card>
        </CardGroup>
      </div>

    </>
  );
}

export default PGPNavbar;
