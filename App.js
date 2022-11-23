import * as React from 'react';
import MainContainer from './navigation/homeStack';
import IpContext from './state/IpContext';



function App(){

  const [ ipAddress, setIpAddress ] = React.useState("");
  const value = { ipAddress, setIpAddress }
  
  return(
    <IpContext.Provider value={value}>
      <MainContainer />
    </IpContext.Provider>
  );
}

export default App;