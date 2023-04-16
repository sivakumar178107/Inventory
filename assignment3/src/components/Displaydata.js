import React, { useState, useEffect } from 'react';
import './Display.css';
function Thirdapidata() {
  const [data, setData] = useState([]);
  const [sport,setSport]=useState('cricket')
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=${sport}&Timezone=-7`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '1092a1038cmsh47d0c27efe6d5b0p15c5a9jsn5da6f180a7eb',
          'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
        }
      });
      const result = await response.json();
      console.log(result)
      setData(result.Stages);
    };
    fetchData();
  }, [sport]);

  return (
    <div style={{padding:"20px 0px"}}>
      <div style={{display:'flex',justifyContent:'center',alignItems:"center"
    }}>
        <ul id='ul'>
          <li id='li' onClick={()=>setSport('cricket')}>cricket</li>
          <li id='li' onClick={()=>setSport('football')}>football</li>
          <li id='li' onClick={()=>setSport('basketball')}>basketball</li>
          <li id='li' onClick={()=>setSport('soccer')}>soccer</li>
        </ul>
      </div>
      <h2>{sport} Data</h2>
      <table>
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Score</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((match) => (
            <tr key={match.id}>
              <td>{match.Events[0].T1[0].Nm}</td>
              <td>{match.Events[0].T2[0].Nm}</td>
              <td>{match.Events[0].ECo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Thirdapidata;
