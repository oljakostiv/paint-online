import React, {useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss';
import {observer} from "mobx-react-lite";
import canvasState from '../store/canvasState';
import toolState from "../store/toolState";
import Brush from "../tools/brush";
import {Button, Form, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const userNameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  useEffect(() => {
    if (canvasState.userName) {
      const socket = new WebSocket('ws://localhost:5000/');

      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.userName,
          method: 'connection'
        }));
      };

      socket.onmessage = (ev) => {
        console.log(ev.data);
      }
    }
  }, [canvasState.userName]);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());  //screen;
  };

  const connectHandler = () => {
    canvasState.setUserName(userNameRef.current.value);
    setModal(false);
  };

  return (
    <div className='canvas'>
      <Modal
        show={modal}
        onHide={() => {
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enter a username:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              className='mt-3'
              ref={userNameRef}
              placeholder='Name..'
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"outline-success"}
                  onClick={() => {connectHandler()}}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <canvas
        onMouseDown={() => {
          mouseDownHandler()
        }}
        ref={canvasRef}
        height={500}
        width={800}
      />
    </div>
  );
});

export default Canvas;
