import { useNavigate } from 'react-router';
import { useChatPerson } from '../../context/ChatPersonContext';
import { User } from '../../context/UserContext';
import { useMessages } from '../../context/MessagesContext';

export const Person = ({ id, name }: User) => {
   const { setChatPerson } = useChatPerson();
   const { clearMessages } = useMessages();
   const navigate = useNavigate();

   const handleClick = () => {
      setChatPerson({ id, name });
      clearMessages();
      navigate('/chat');
   };

   return (
      <div className="flex items-center w-60 h-10 mb-5 p-2 border border-primary rounded-xl cursor-pointer" onClick={handleClick}>
         <div className="flex justify-center h-8 w-8 items-center rounded-full bg-primary text-white mx-2 p-2">
            {name[0]?.toUpperCase()}
         </div>
         {name}
      </div>
   );
};
