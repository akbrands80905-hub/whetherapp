import { useEffect, useState } from "react";


function DateTime(){

  const [time, setTime] = useState(new Date());


  useEffect(()=>{

    const timer = setInterval(()=>{

      setTime(new Date());

    },1000);


    return ()=> clearInterval(timer);

  },[]);



  const day = time.toLocaleDateString("en-US",{
    weekday:"long"
  });


  const date = time.toLocaleDateString("en-US",{
    day:"numeric",
    month:"long",
    year:"numeric"
  });


  const currentTime = time.toLocaleTimeString("en-US",{

    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit"

  });



  return(

    <div className="date-time">


      <h2>
        Your local time {currentTime}
      </h2>


      <h3>
        {day}, {date}
      </h3>


    </div>

  );

}


export default DateTime;