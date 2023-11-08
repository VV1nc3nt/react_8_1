import { useEffect, useState } from "react"
import { InfinitySpin } from "react-loader-spinner"

interface Props { 
  info: {
    id: number,
    name: string
  }
}

interface Details {
  id: number,
  name: string,
  avatar: string,
  details: {
    city: string,
    company: string,
    position: string
  }
}

export default function Details(props: Props) {
  const [details, setDetails] = useState<Details>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      try {
        const response = await fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${props.info.id}.json`);
        const data = await response.json();

        setDetails(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    };

    fetchDetails()
  }, [props.info.id]);

  const renderDetails = () => {
    return <div key={ details?.id } className="details">
            { details?.avatar ? <img src={ details?.avatar } alt="" /> : 'Loading...' }
            <p>{ details?.name }</p>
            <p>City: { details?.details.city }</p>
            <p>Company: { details?.details.company }</p>
            <p>Position: { details?.details.position }</p>
          </div>
  };

  return (
    loading ? <InfinitySpin width='300' color="#4fa94d" /> : renderDetails()
  )
}
