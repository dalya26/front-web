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
import React, { useState, useEffect } from "react";
import { useTypewriter } from 'react-simple-typewriter';
import { Link, useNavigate, useParams } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  Row,
  Col,
  CardFooter,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";

function Dashboard({ postId }) {
  const endpoint = 'http://192.168.1.10:8000/api'
  const [posts, setPost] = useState([]);
  const [onepost, setOnepost] = useState([]);
  const [token, setToken] = useState([]);
  let navigate = useNavigate();

  function navigateTo(string) {
    navigate(string);
  }

  useEffect(() => {
    getAllPosts();
  }, []);


  const getAllPosts = async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const response = await axios.get(`${endpoint}/selectImage`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      setPost(response.data.posts);
    } else {
      console.error('Al parecer no has iniciado sesion');
    }
  };

  //delete
  const [modaldelete, setModaldelete] = useState(false);

  const toggledelete = () => setModaldelete(!modaldelete);

  const deletePost = (_id) => {
    axios.post(`${endpoint}/eliminar`,
      {
        id: _id
      }).then(function (response) {
        console.log(response.data);
        navigateTo('/weblog');
      });
  }

  //all coments

  const [comment, setComment] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  const [comments, setComments] = useState({
    id: 0,
    user_id: 0,
    post_id: '',
    comment: '',
  });

//comentario no se hace con el id ni se registra
  const saveComentario = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const formData = new FormData();
    formData.append('comment', comments.comment);
    try {
      const response = await axios.post(`${endpoint}/cComment`, comments, config);
      alert('Comentario registrado correctamente');
    } catch (error) {
      console.error("Error al registrar al comentario:", error);
    }
  }

  const inputChange = (event) => {
    setComments({
      ...comments,
      [event.target.name]: event.target.value
    })
  };

  const [texto] = useTypewriter({
    words: ['Duda', 'Error', 'Solución'],
    loop: {},
  });

  //like 
  const [like, setLike] = useState(0),
  [islike, setIsLike] = useState(false),

  onLikeClick =() =>{
      setLike(like + (islike ? -1 : 1));
      setIsLike(!islike);
  }

  return (
    <>
      <div className="content ">
        <Row>
          <Col className="text-left" sm="6">
            ¿Tienes algún (a)
            <span style={{ fontWeight: 'bold', color: '#40B4C0' }}> {texto} </span> ?
            <Link to={'/weblog/post'}> Preguntar</Link>
          </Col>

          <Col lg="12">
            {posts.map((post) => (
              <Card className="my-2" key={post.id}>
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle tag="h5">{post.title}
                      </CardTitle>
                    </Col>
                    <Col>
                      <UncontrolledDropdown className='btn-options-edup'>
                        <DropdownToggle
                          caret
                          className="btn-icon"
                          color="link"
                          type="button"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="tim-icons icon-alert-circle-exc" />

                        </DropdownToggle>
                        <DropdownMenu tag="ul" right>
                          <DropdownItem className="nav-item" >
                            <Link to={`/weblog/post/${post.id}`} > Editar</Link>
                          </DropdownItem>

                          <DropdownItem divider tag="li" />
                          <DropdownItem className="nav-item" >
                            <Link onClick={toggledelete} color='danger'>Eliminar
                            </Link>
                          </DropdownItem>


                          <Modal isOpen={modaldelete} toggle={toggledelete} >
                            <ModalHeader toggle={toggledelete}>Eliminar publicación</ModalHeader>
                            <ModalBody>
                              ¿Seguro que quieres eliminar esta publicación?
                            </ModalBody>
                            <ModalFooter>
                              <div className='btn-delete-post'>
                                <Button color="danger" size="sm" onClick={() => deletePost(post.id)}>
                                  Elimiar
                                </Button><Button color="info" size="sm" onClick={toggledelete}>
                                  Cancelar
                                </Button>
                              </div>
                            </ModalFooter>
                          </Modal>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Col>
                  </Row>
                  <CardText>
                    <small className="text-muted">{post.user.name}</small>
                  </CardText>
                  <CardText>{post.body}</CardText>
                </CardBody>
                {post.image && (

                  <CardImg className='card-img'
                    alt={posts.title}
                    bottom
                    style={{ height: 400, width: '98%', border: 'solid' }}
                    src={`./storage/${post.image}`} // Utiliza el atributo src para mostrar la imagen
                  />

                )}
                <CardFooter>
                <Button className={'tim-icons icon-heart-2' + (islike ? 'tim-icons icon-heart-2' : '')} onClick={onLikeClick} secondary size="sm" />        
                    <strong className='text-like'>{like} likes</strong>
                  <Button size="sm" className='tim-icons icon-chat-33' >
                    <Link to={`/weblog/postson/${post.id}`} className='text-color-comment'> Comentarios</Link> 
                  </Button>

                 



                  <InputGroup>

                    <Input placeholder='Publicación' name='post_id' onChange={inputChange} type='number' value={comments.post_id}/> <p/>
                    <Input placeholder='Escribe un comentrario...' name='comment' onChange={inputChange} type='text' value={comments.comment} />
                    <Button className='tim-icons icon-send btn-send-class' color="success"
                      size="sm" onClick={saveComentario} />
                  </InputGroup>
                </CardFooter>
              </Card>
            ))}
          </Col>
        </Row>
      </div >
    </>
  );
}

export default Dashboard;
