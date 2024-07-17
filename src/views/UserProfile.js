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
import Caroseluno from 'assets/img/caroselone.png';
import Caroseldos from 'assets/img/caroseldos.png';
import Caroseltres from 'assets/img/programadores weblog.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  Row,
  Col,
  UncontrolledCarousel,
} from "reactstrap";

function UserProfile() {
  const endpoint = 'http://192.168.1.10:8000/api';
  const [token, setToken] = useState([]);
  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState([]);

  const { id } = useParams();

  /**useEffect(() => {
    getInfos();
    //getComments();
  }, []);

  function getInfos() {
    axios
      .get(`${endpoint}/infos`, {
        params: { id: id },
      })
      .then((response) => {
        setInfo(response.data);
      });
  };*/


  //obtener usuario iniciado
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const response = await axios.get(`${endpoint}/user`, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      setUsers(response.data.users);
    } else {
      console.error('Al parecer no has iniciado sesion');
    }
  };


  /**useEffect(() => {
    getInfo();
}, [id]);

const getInfo = async () => {
  const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.get(`${endpoint}/info/${id}`, config);
        console.log(response.data.info)
        setInfo(response.data.info);
    } catch (error) {
        console.error('Error de informacion:', error);
    }
};*/

  /**useEffect(() => {
    const fetchAdditionalInfo = async () => {
      try {
        const response = await axios.get(`${endpoint}/info/${id}`);
        setInfo(response.data.descrips);
      } catch (error) {
        console.error('Error fetching additional info:', error);
      }
    };

    fetchAdditionalInfo();
  }, [id]);*/


  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            {users && (
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one color-block" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      {users.image && (
                        <img
                          alt="..."
                          className="avatar"
                          src={`http://192.168.1.10:8000/storage/${users.image}`}
                        />
                      )}
                      <h5 className="title">{users.name}</h5>
                  {/*<Link to={`/weblog/userinfoup/${users.id}`}>Editar</Link><p />*/}
                    </a>
                    <p className="description">Ceo/Co-Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </Col>
          <Col md="4">
            <UncontrolledCarousel
              items={[
                {

                  key: 1,
                  src: Caroseldos
                },
                {

                  key: 2,
                  src: Caroseltres
                },
                {
                  key: 3,
                  src: Caroseluno
                }
              ]}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
