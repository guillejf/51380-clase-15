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
import { UserModel } from './DAO/models/users.model.js';
export async function connectMongo() {
  try {
    await connect(
      /* PONER TU STRING ENTERO ACA */
      ''
    );

    let student = await StudentsModel.find({});
    console.log(JSON.stringify(student, null, 2));
    /* let student = await StudentsModel.findOne({ _id: '6477bde9d7627dafa9ea28b2' }); .populate('courses.course');
    console.log(JSON.stringify(student, null, 2)); */

    /* let student = await StudentsModel.findOne({ _id: '6477be0ac11ecddd0d42aa51' });
    student.courses.push({ course: '6477c6d4c8f14bc83cca80f1' });
    let res = await StudentsModel.updateOne({ _id: '6477be0ac11ecddd0d42aa51' }, student);
    console.log(res); */

    /* const created = CoursesModel.create({
      topics: ['web', 'software', 'backend'],
      students: [],
      title: 'backend',
      description: 'wonderfull backend course',
      dificulty: 10,
      professor: 'guile',
    }); */

    /* const created = StudentsModel.create({
      first_name: 'monica',
      last_name: 'fernanda',
      email: 'g@g.com',
      gender: 'femenino',
      courses: [],
    }); */

    /* let res = await UserModel.find({ lastName: 'werwrwer' }).explain('executionStats');
    console.log(res); */

    /* (async () => {
      const users = [];
      for (let i = 0; i < 3000; i++) {
        users.push({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
        });
      }

      try {
        await UserModel.insertMany(users);
        console.log('Inserted', users.length, 'users');
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
import { MsgModel } from './DAO/models/msgs.model.js';
import { StudentsModel } from './DAO/models/students.model.js';
import { CoursesModel } from './DAO/models/courses.model.js';
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
