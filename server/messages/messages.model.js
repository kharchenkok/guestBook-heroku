import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import { getPaths } from "../helpers/utils.js";

const {__dirname}=getPaths(import.meta.url)
const messagePath = path.join(__dirname, "../db/messages.json");

const createMessageSchema = Joi.object({
  name: Joi.string().required(),
  message: Joi.string().required(),
  date: Joi.string().required(),
});


async function messagesList(req, res) {
  try {
    const messagesData = await fs.readFile(messagePath,"utf-8");
    const parseMessagesData = JSON.parse(messagesData)
    return res.status(200).send(parseMessagesData)
  } catch (error) {
    console.error("there was an error:", error.message);

  }
}

  async function addMessage(req,res) {
  try {
    const messagesData = await fs.readFile(messagePath, "utf-8");
    const id = uuidv4();
     const parseMessagesData = JSON.parse(messagesData)
    const newMessage = { id, ...req.body};
    const newMessagesData = [...parseMessagesData, newMessage];
    await fs.writeFile(messagePath, JSON.stringify(newMessagesData,null,2),"utf-8");
    return res.status(201).send(newMessagesData);
  } catch (error) {
    console.error("there was an error:", error.message);
  }
}
//   async function addContact(req,res) {
//   try {
//     const contactsData = await fs.readFile(messagePath, "utf-8");
//     const id = uuidv4();
//     const parsedContactsData = JSON.parse(contactsData)
//     const newContact = { id, ...req.body};
//     const newContactsData = [...parsedContactsData, newContact];
//     await fs.writeFile(messagePath, JSON.stringify(newContactsData,null,2),"utf-8");
//     return res.status(201).send(newContactsData);
//   } catch (error) {
//     console.error("there was an error:", error.message);
//   }
// }



export { messagesList,addMessage,createMessageSchema}
// export { messagesList, addContact,createMessageSchema}
