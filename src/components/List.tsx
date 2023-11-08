import { useEffect, useState } from "react";
import Details from "./Details";


interface Users {
  id: number,
  name: string
}


export default function List() {
  const [users, setUsers] = useState<Users[]>([])
  const [info, setInfo] = useState(Object);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json');
      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const clickHandler = (id: number, name: string) => {
    const data = {
      id: id,
      name: name
    };

    setInfo(data);
    setShown(true);
  };

  return (
    <div className="app">
      <div className="users">
        { 
          users.map(user => {
            return <div key={ user.id } className='user'>
              <button onClick={ () => clickHandler(user.id, user.name) } className="user-btn">{ user.name }</button>
            </div> 
          }) 
        }
      </div>
      {shown && <Details info={ info } />}
    </div>
  )
}
