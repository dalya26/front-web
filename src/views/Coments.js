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
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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

function Coments() {
    const endpoint = 'http://192.168.1.10:8000/api';
    const [oneposts, setOnepost] = useState([]);
    const [comments, setComments] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getPosts();
        //getComments();
    }, []);

    function getPosts() {

        axios
            .get(`${endpoint}/postess`, {
                params: { id: id },
            })
            .then((response) => {
                setOnepost(response.data);
            });
    };

    useEffect(() => {
        getComments();
    }, [id]);

    const getComments = async () => {
        try {
            const response = await axios.get(`${endpoint}/mComment/${id}`);
            console.log(response.data.comments)
            setComments(response.data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const [comment, setComment] = useState({
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
        formData.append('comment', comment.comment);
        try {
            const response = await axios.post(`${endpoint}/cComment`, comment, config);
            window.location.reload();
        } catch (error) {
            console.error("Error al registrar al comentario:", error);
        }
    }

    const inputChange = (event) => {
        setComment({
            ...comment,
            [event.target.name]: event.target.value
        })
    };

    //date comments
    const formatDateTimes = datetime => {
        const dateObj = new Date(datetime);
        const formattedDate = dateObj.toLocaleString('es-Es', {
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        return formattedDate;
    };

    const formatDateTime = datetime => {
        return formatDateTimes(datetime);
    };


    //delete 
    let navigate = useNavigate();

    function navigateTo(string) {
        navigate(string);
    }
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

    //like 
    const [like, setLike] = useState(0),
    [islike, setIsLike] = useState(false),

    onLikeClick =() =>{
        setLike(like + (islike ? -1 : 1));
        setIsLike(!islike);
    }

    const onLikeClickl = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.post(`${endpoint}/likes`, config, { is_like: !islike });
            setLike(response.data.likeCount); // Actualizamos el estado del like con la respuesta del servidor
            setIsLike(!islike); // Cambiamos el estado de islike
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="content">

                {oneposts && (

                    <Card className="my-2" key={oneposts.id}>
                        <CardBody >
                            <Row>
                                <Col>
                                    <CardTitle tag="h5">{oneposts.title}</CardTitle>
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
                                                <Link to={`/weblog/post/${oneposts.id}`} > Editar</Link>
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
                                                        <Button color="danger" size="sm" onClick={() => deletePost(oneposts.id)}>
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
                            <CardText >
                                {oneposts.body}
                            </CardText>
                            <CardText>
                                <small className="text-muted" >
                                    {oneposts.user_id}
                                </small>
                            </CardText>

                        </CardBody>

                        {oneposts.image && (
                            <CardImg
                                alt={oneposts.title}
                                bottom
                                src={`http://192.168.1.10:8000/storage/${oneposts.image}`}
                                style={{ border: 'solid' }}
                            />


                        )}

                        <InputGroup className='text-comment-card'>

                            <Button className={'tim-icons icon-heart-2' + (islike ? 'tim-icons icon-heart-2' : '')} onClick={onLikeClick} secondary size="sm" />
                            <br></br>
                            <strong className='text-like'>{like} likes</strong>
                            <p></p>
                            <Input className='input-iduser' md={2} placeholder='Publicación' name='post_id' onChange={inputChange} type='number' value={comments.post_id} /> <p />
                            <Input placeholder='Escribe un comentrario...' name='comment' onChange={inputChange} type='text' value={comments.comment} />
                            <Button className='tim-icons icon-send btn-send-class' color="success"
                                size="sm" onClick={saveComentario} />
                        </InputGroup>


                        {comments.map((coment) => (
                            <CardFooter key={coment.id}>

                                <CardText className='coment-card-style'>

                                    <div className='text-comments'>
                                        <strong>{coment.user.name}</strong> : <span disabled>{formatDateTime(coment.created_at)}</span><p></p>
                                        {coment.comment}
                                    </div>
                                </CardText>

                            </CardFooter>
                        ))}

                    </Card>

                )}
            </div >
        </>
    );
}

export default Coments;
