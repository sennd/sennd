import React, { Component } from 'react';
// import {FileDrop} from '../../components'
import QRCode from 'qrcode.react';
import { Card } from 'antd';


class Home extends Component {
  constructor() {
    super()
    this.state = {
      peerId: window.location.href.split('/')[3].split('-')[1] || null
    }
  }
  componentDidMount() {
    this.timer = setInterval(()=> this.getId(), 1000);
  }
  
  componentWillUnmount() {
    this.timer = null; // here...
  }

  getId() {
    if(!this.state.id) {
      this.setState({ id: document.getElementById('iam').innerHTML || null})
      console.log(this.state.id)
    }
    if(this.state.peerId && !this.state.connected) {
      let connect = document.getElementById('connectbutton_' + this.state.peerId);
      if (connect) {
        connect.click()
        this.setState({connected: true})
      }
    }

    let acceptButton = document.getElementById('accept_button')
    if(acceptButton) {
      acceptButton.click() 
    }
    if(this.state.peerId) {
      let chooseFile = document.getElementById('dragndrop_' + this.state.peerId)
      console.log('asd', chooseFile)
      chooseFile.style.visibility = "visible"
    }
    

  }

  render() {
    console.log(this.state.peerId)

    return (
      <div className="pa3 flex justify-center w-100">
        <Card
          title={(<div className='flex flex-column flex justify-center' ><div className='justify-center f3'><img className='mr2' height='30px' src='logo.png' alt=''/> Sennd.me</div> <span className='f6'>For your dank memes...</span></div>)}
          style={{width: '100%', maxWidth:'500px'}}
        >
          {/*<FileDrop />*/}
          <div className='w-100 flex justify-center'>
            <QRCode value={`http://${document.location.hostname}/room-${this.state.id || 'null'}`}/>
          </div>
          <div id="main">
          
          <hr />
          <div>I am <span id="iam">...</span></div><br />
          <div id="peerZone">
          </div>

          <hr />
      </div>
          </Card>
      </div>
    );
  }
}

export default Home;
