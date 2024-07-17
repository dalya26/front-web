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

function Map() {
  const endpoint = 'http://192.168.1.10:8000/api';

  const { _id } = useParams();
  let navigate = useNavigate();

  function navigateTo(string) {
    navigate(string);
  }

  const saveInfo = async (e) => {
    try {
      const response = await axios.post(`${endpoint}/descreate`, info);
      navigateTo('/weblog/userup'); // No se proporciona la implementación de navigateTo
    } catch (error) {
      console.error("Error al guardar informacion:", error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje de error al usuario
    }
  };

  const [info, setInfo] = useState({
    id: 0,
    user_id: 0,
    drescription: "",
    intereses: "",
  });

  const getInfo = async () => {

    await axios
      .get(`${endpoint}/infos`, {
        params: { id: _id },
      })
      .then((response) => {
        setInfo(response.data);
      });
  };

  const inputChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value
    })
  };

  useEffect(() => {
    if (_id === undefined) {
      console.log("sin parametros");
    } else {
      getInfo();
    }
  }, [])


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
                    <Col md="12">
                      <FormGroup>
                        <label>¿Qué es lo que más te interesa?</label>
                        <Input
                          id='intereses'
                          value={info.intereses}
                          onChange={inputChange}
                          cols="100"
                          name='intereses'
                          placeholder="Añade una descripción."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>¿Qué es lo que sabes hacer?</label>
                        <Input
                          id='drescription'
                          name='drescription'
                          value={info.drescription}
                          onChange={inputChange}
                          cols="100"
                          placeholder="Añade una descripción sobre ti."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit" onClick={saveInfo}>
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

export default Map;
