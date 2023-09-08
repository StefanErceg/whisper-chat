import { User } from '../context/UserContext';

export interface BaseMessage {
   content: string;
   sender: User;
   receiver: User;
   meta: BaseMessageMeta;
}

export interface Message extends BaseMessage {
   meta: MessageMeta;
}

export interface BaseMessageMeta {
   id: string;
   timestamp: number;
}

export interface MessageMeta extends BaseMessageMeta {
   partId: string;
   part: number;
   total: number;
   logo?: boolean;
}
