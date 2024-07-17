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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col,
  Label,
  Form,
} from "reactstrap";
function Typography(props) {
  //crear post
  const endpoint = 'http://192.168.1.10:8000/api';
  const navigate = useNavigate();

  const { id } = useParams();

  const [message, setMessage] = useState('');

  const [inputs, setInputs] = useState([]);
  const [fileimage, setPhoto] = useState('');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const uploadProduct = async (e) => {
    e.preventDefault();
    
    // Obtener token de localStorage
    const token = localStorage.getItem('token');
    
    const config = {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' 
      }
    };
  
    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('body', inputs.body);
    formData.append('image', fileimage);
  
    try {
      const response = await axios.post(`${endpoint}/updateImage/${id}`, formData, config);
      
      setMessage(response.data.message);
      console.log(response);
      navigate('/weblog');
    } catch (error) {
      // Manejar errores
      console.error('Error al actualizar:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();

  }

  useEffect(() => {
    getproduct();
  }, []);

  function getproduct() {
    axios.get(`${endpoint}/seeOne/` + id).then(function (response) {
      console.log(response);
      setInputs(response.data.post);
    });
  }

  return (
    <>
      <div className="content">
        <Row>
          <Form>
            <Card >
              <CardHeader >Editar publicaión</CardHeader>
              <p className="text-success"><b>{message}</b></p>
              <CardBody>
                <Row xs={'2'}>
                  <Col md="11">
                    <FormGroup row>
                      <Col sm={5}>
                        <Label>Titulo</Label>
                        <Input
                          name="title"
                          type="text"
                          value={inputs.title}
                          onChange={handleChange}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md="10">
                    <FormGroup row>
                      <Col sm={10}>
                        <Label>Descripción</Label>
                        <Input
                          name="body"
                          type="textarea"
                          value={inputs.body}
                          onChange={handleChange}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md="16">
                    <FormGroup>
                      <Col >
                        Toca la imagen para editarla
                        <img src={`http://192.168.1.10:8000/storage/${inputs.image}`} alt="" style={{ height: 250 }}
                          width="100%" />
                        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button className="btn-post" type="submit" onClick={uploadProduct}>
                  Guardar
                </Button>{' '}
                <Button color="secondary" >
                  Cancelar
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </Row>

      </div>
    </>
  );
}

export default Typography;
