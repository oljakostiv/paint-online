import axios from "axios";
import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import canvasState from '../store/canvasState';
import toolState from "../store/toolState";
import Brush from "../tools/brush";
import Rect from "../tools/rect";
import '../styles/canvas.scss';
import Circle from "../tools/circle";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const userNameRef = useRef();
  const [modal, setModal] = useState(true);
  const params = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);

    //отримання поточної картинки сесії:
    let context = canvasRef.current.getContext('2d');
    axios.get(`http://localhost:5000/image?id=${params.id}`)
      .then(response => {
        const img = new Image();
        img.src = response.data;

        img.onload = () => {
          context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      });
  }, []);

  useEffect(() => {
    if (canvasState.userName) {
      const socket = new WebSocket('ws://localhost:5000/');

      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasRef.current, params.id, socket));

      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.userName,
          method: 'connection'
        }));
      };

      socket.onmessage = (ev) => {
        let mess = JSON.parse(ev.data);
        switch (mess.method) {
          case 'connection':
            console.log(`${mess.username} connected`);
            break;

          case 'draw':
            drawHandler(mess);
            break;

          default:
            console.log('default');
        }
      };
    }
  }, [canvasState.userName]);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());  //screen;

    //для зберігання поточного значення по силці:
    axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
      .then(response => console.log(response.data));
  };

  const connectHandler = () => {
    canvasState.setUserName(userNameRef.current.value);
    setModal(false);
  };

  const drawHandler = (mess) => {
    const element = mess.element;
    const context = canvasRef.current.getContext('2d'); //щоб малювати;

    switch (element.type) {
      case 'brush':
        Brush.draw(context, element.x, element.y);
        break;

      case 'rect':
        Rect.staticDraw(context, element.x, element.y, element.w, element.h, element.color);
        break;

      case 'circle':
        Circle.staticDraw(context, element.x, element.y, element.radius, element.color);
        break;

      case 'newPath':
        context.beginPath() //новий елемент малюнка;
        break;

      default:
        console.log('default');
    }
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
                  onClick={() => {
                    connectHandler()
                  }}
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
