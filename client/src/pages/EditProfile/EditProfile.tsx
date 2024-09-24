import React from "react";
import { Form, Button } from "react-bootstrap";

import { IFormData } from "./EditProfileContainer";
import "./editProfile.scss";

interface IEditProfileProps {
  onFormSubmit: (event: React.FormEvent) => void;
  formData: IFormData
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  countries: { _id: string, name: string }[],
  disabled: boolean,
}

export const EditProfile = (props: IEditProfileProps) => {
  const {
    onFormSubmit,
    formData,
    onInputChange,
    countries,
    disabled,
  } = props;

  return (
    <div className="edit-profile-form-container">
      <Form onSubmit={ onFormSubmit } className="edit-profile-form">
        <fieldset disabled={disabled}>
          <Form.Group controlId="formCountryId">
            <Form.Label>Country</Form.Label>
            <Form.Control
              as="select"
              name="countryId"
              value={ formData.countryId }
              onChange={ onInputChange }
            >
              <option value="">Select your country</option>
              { countries.map((country) => (
                <option key={ country._id } value={ country._id }>
                  { country.name }
                </option>
              )) }
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={ formData.firstName }
              onChange={ onInputChange }
              placeholder="Enter first name"
            />
          </Form.Group>

          <Form.Group controlId="formMiddleName">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              name="middleName"
              value={ formData.middleName }
              onChange={ onInputChange }
              placeholder="Enter middle name"
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={ formData.lastName }
              onChange={ onInputChange }
              placeholder="Enter last name"
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={ formData.address }
              onChange={ onInputChange }
              placeholder="Enter address"
            />
          </Form.Group>

          <Form.Group controlId="formExtraInfo">
            <Form.Label>Extra Information</Form.Label>
            <Form.Control
              as="textarea"
              name="extraInfo"
              value={ formData.extraInfo }
              onChange={ onInputChange }
              placeholder="Enter extra information"
              rows={ 3 }
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-3 update-profile-btn"
            disabled={disabled}
          >
            Update profile
          </Button>
        </fieldset>
      </Form>
    </div>
);
};
