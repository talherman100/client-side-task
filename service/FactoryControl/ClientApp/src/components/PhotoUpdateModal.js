import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FactoryService } from '../services/service';

export function PhotoUpdateModal({ show, onClose, title, data }) {
  const [formData, setFormData] = useState(data);

  return (
    <Modal show={show} onHide={() => { setFormData(data); onClose(); }}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>New Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type a message..."
              onChange={event => { setFormData({ ...formData, message: event.target.value }); }}
              value={formData.message}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { setFormData(data); onClose(); }}>
          Close
        </Button>
        <Button variant="primary" onClick={() => { FactoryService.Update({ ...formData }); }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

PhotoUpdateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
