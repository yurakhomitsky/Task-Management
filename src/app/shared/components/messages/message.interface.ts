import { MessagesTypes } from './messages.types.enum';
export interface Message {
    type: MessagesTypes,
    messages: string[]
}