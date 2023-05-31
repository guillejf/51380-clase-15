//@ts-check
//----------------MULTER------------------------------
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

//----------------__DIRNAME------------------------------
import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//----------------MONGO------------------------------
import { connect, Schema, model } from 'mongoose';
import faker from 'faker';
import { MsgModel } from './DAO/models/msgs.model.js';
export async function connectMongo() {
  try {
    await connect(
      /* PONER TU STRING ENTERO ACA */
      'mongodb+srv://guillermofergnani:PONERBIENELPASS@51380.yhqtnxt.mongodb.net/ecommerce?retryWrites=true&w=majority'
    );

    /* (async () => {
      const messages = [];
      for (let i = 0; i < 5000; i++) {
        const message = faker.lorem.sentence();
        const user = faker.internet.email();

        messages.push({ message, user });
      }

      try {
        await MsgModel.insertMany(messages);
        console.log('Inserted', messages.length, 'messages');
      } catch (error) {
        console.error('Error en insert many:', error);
      }
    })(); */
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

//----------------SOCKET------------------------------
import { Server } from 'socket.io';

export function connectSocket(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socket) => {
    socket.on('msg_front_to_back', async (msg) => {
      const msgCreated = await MsgModel.create(msg);
      const msgs = await MsgModel.find({});
      socketServer.emit('msg_back_to_front', msgs);
    });
  });
}
