import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default props => (
    <div>
        <Modal isOpen={props.isOpen} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Confirm Delete</ModalHeader>
            <ModalBody>
                Do you really want to delete the product {props.product.name}?
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={props.toggle}>Cancel</Button>{' '}
                <Button outline color="danger" onClick={props.delete}>Delete</Button>
            </ModalFooter>
        </Modal>
    </div>
);