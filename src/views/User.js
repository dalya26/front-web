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
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  CardGroup,
} from "reactstrap";

function User() {
  const endpoint = 'http://192.168.1.10:8000/api';
  const navigate = useNavigate();
  function navigateTo(string) {
    navigate(string);
  }

  const { id } = useParams();

  const [message, setMessage] = useState('');
  const [inputs, setInputs] = useState([]);
  const [users, setUsers] = useState([]);
  const [fileimage, setPhoto] = useState('');
  const [token, setToken] = useState([]);



  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const response = await axios.get(`${endpoint}/usa/`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      setUsers(response.data.users);
    } else {
      console.error('Al parecer no has iniciado sesion');
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }
  const uploadProduct = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', inputs.name);
    formData.append('email', inputs.email);
    formData.append('password', inputs.password);
    formData.append('password_confirmation', inputs.password_confirmation);
    formData.append('image', fileimage);

    formData.append('description', users.description);
    formData.append('intereses', users.intereses);

    const response = await axios.put(`${endpoint}/updateus/`, formData, config, {
      headers: { 'Content-Type': "multipart/form-data" },
    });
    setMessage(response.data.message); //"message": "Product successfully updated.."
    console.log(response)
    setTimeout(() => {
      navigate('/weblog');
    }, 2000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();

  }

  const maxNumber = 69;

  return (
    <>
      <div className="content">
        <Row>
          <Col sm="4" xs="6" >
            {users.map((data) => (
              <Card className="card-user" key={data.id}>
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      {data.image && (
                        <img
                          alt="..."
                          className="avatar"
                          src={`http://192.168.1.10:8000/storage/${data.image}`}
                        />
                      )}
                      <h5 className="title">{data.name}</h5>
                    </a>
                    <p className="description">Ceo/Co-Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                  </div>
                </CardBody>
              </Card>
            ))}
          </Col>

        </Row>
      </div>
    </>
  );
}

export default User;
