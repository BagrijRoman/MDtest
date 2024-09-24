import React from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";

import useUserById from "../../hook/useUserById";

const User = () => {
  const { id } = useParams();
  const user = useUserById(id);

  return (
    <div>
      {user && (
        <>
          <h2>{user.user.firstName} {user.user.lastName}</h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>User details</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Key</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>First Name</td>
                      <td>{user.user.firstName}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Last Name</td>
                      <td>{user.user.lastName}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Email</td>
                      <td>{user.user.email}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Date of registration</td>
                      <td>{(new Date(user.user.createdAt)).toDateString()}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Country details</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Key</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Name</td>
                      <td>{user.country.name}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>ISO Code</td>
                      <td>{user.country.ISOCode}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default User;
