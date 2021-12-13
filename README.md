
# Video Chat App

It is a video chat app 



## Features
- One to one user
- Mute / Unmute video
- Mute / Unmute audio
- Call user
- Answer user
- Cut Call


## Built with
- HTML5
- CSS3
- Javascript
- React js
- Node js
- Socket.io
- Peer
- Webrtc

## Deployment

To strat the react server

```bash
  cd chat-frontend
  npm start
```
To start the peer server
```bash
   cd chat-backend
   npm run dev
```

You have to change your browser setting .
- Open google chrome or any browser
- type __chrome://flags__ or __your_browser_name://flags__ in the search __your_browser_name
- search for __Insecure origins treated as secure__ flags
- type url in the flag textbox
- select enabled and click restart in the pop up box

You have to do it brcause webrtc do not allow streaming in those website who haven't https.
So you have to change the browser setting to run this project properly. After running the project , got to the __chrome://flags__ or __your_browser_name://flags__  and click o the reset button.


## Screenshots

![AppScreenshort](https://github.com/Argha-Nilanjon-Nondi/video-chat-app/blob/master/screenshort/home.jpg?raw=true)
![AppScreenshort](https://github.com/Argha-Nilanjon-Nondi/video-chat-app/blob/master/screenshort/when_call.jpg?raw=true)
![AppScreenshort](https://github.com/Argha-Nilanjon-Nondi/video-chat-app/blob/master/screenshort/calling.jpg?raw=true)
## License
- You can't use it for commercial usage
- You can use it just for eductional usage