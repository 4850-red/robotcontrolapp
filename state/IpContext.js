import * as React from 'react';

export default IpContext =  React.createContext({
    ipAddress: "",
    setIpAddress: () => {}
})