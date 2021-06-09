import React, { Component } from 'react';

interface presion{
    firtName:string;
    fulllName:string;
}
const clickthongtin=(fulllName:string)=>{
  alert(fulllName);
}
interface Props{
    text?: string;
    presion:presion;
}

class Button extends Component<Props> {
   constructor(props:Props){
     super(props)
   }
   render() {
        return (
            <div className="aaa">
              <p>
                  {} <br/>
                  {}
              </p>
            </div>
        );
    }
}

export default Button;