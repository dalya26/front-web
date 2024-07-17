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
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";
function Tables(props) {
  //crear post
  const endpoint = 'http://192.168.1.10:8000/api';
  const { _id } = useParams();
  let navigate = useNavigate();

  function navigateTo(string) {
    navigate(string);
  }

  const savePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${endpoint}/insertImage`, post, {
        headers:{ 'Content-Type': "multipart/form-data"}
      });
       navigateTo('/weblog'); // No se proporciona la implementación de navigateTo
    } catch (error) {
      console.error("Error al guardar el post:", error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje de error al usuario
    }
  };
  
  const [post, setPost] = useState({
    id: 0,
    user_id: 0,
    title: "",
    body: "",
    image: "", 
  });

  const getPosts = async () => {
    
    await axios
      .get(`${endpoint}/postess`, {
        params: { id: _id },
      })
      .then((response) => {
        setPost(response.data);
      });
  };

  const inputChange = (event) => {
    if (event.target.name === 'image') {
      const file = event.target.files[0]; // Obtener el archivo de la imagen
      setPost({
        ...post,
        image: file,
        imageName: file.name // Guardar el nombre del archivo en el estado
      });
    } else {
      setPost({ ...post, [event.target.name]: event.target.value });
    }
  };

  useEffect(() => {
    if(_id === undefined) {
      console.log("sin parametros");
    }else{
      getPosts();
    }
  },[])

  const maxNumber = 69;

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="my-2">
              <CardHeader>
                <Row >
                  <Col className="text-left" sm="6">
                    <h1 className="card-category">Pregunta, aprende y avanza.</h1>
                  </Col>
                </Row>
                Haz una pregunta
              </CardHeader>
              <CardBody>
                <Row xs={'2'}>
                  <Col md="10">
                    <FormGroup row>
                      <Col sm={5}>
                        <Input
                        id='title'
                          placeholder='Titulo'
                          name="title"
                          type="text"
                          value={post.title}
                          onChange={inputChange}
                        />
                      </Col>
                    </FormGroup>
                  </Col><p/>
                  <Col md="8">
                    <FormGroup row>
                      <Col sm={10}>
                        <Input
                        id='body'
                          placeholder='¿Que sucede?'
                          name="body"
                          type="textarea"
                          value={post.body}
                          onChange={inputChange}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Col sm={10}>
                        Selecionar una imagen: {post.imageName && <p> {post.imageName}</p>}
                        <Button className='tim-icons icon-cloud-upload-94' color='info'>
                          <Input
                          id='image'
                            name="image"
                            type="file"
                            maxNumber={maxNumber}
                            //value={post.image}
                            //onChange={inputChange}
                             onChange={inputChange} accept="image/*" 
                          />
                        </Button>
                      </Col>
                    </FormGroup>
                    
                  </Col>
                  <Col className="text-right" sm="1">
                    <div className='div-btn-post'>
                      <Button className="btn-post" type="submit" onClick={savePost}>
                        Publicar
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
}

export default Tables;
