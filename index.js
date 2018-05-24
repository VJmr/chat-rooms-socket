const app= require('express')();
const server = require('http').Server(app);
const io= require('socket.io')(server);
const port=1899

server.listen(port,()=>{
    console.log('Server is running on', port);
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});

app.get('/javascript',(req,res)=>{
    res.sendFile(__dirname+'/public/javascript.html');
});

app.get('/css',(req,res)=>{
    res.sendFile(__dirname+'/public/css.html');
});

//I know this is wierd !!!!!!
app.get('/html',(req,res)=>{
    res.sendFile(__dirname+'/public/html.html');
});


io.on('connection',(socket)=>{
    socket.on('join',(data)=>{
        socket.join(data.room);
        io.in(data.room).emit('message',`New user joined ${data.room} room!`);
    });
    socket.on('message',(data)=>{
        io.in(data.room).emit('message',data.msg);
    });
    socket.on('disconnect',()=>{
        io.emit('message','user disconnected');
    });
})
