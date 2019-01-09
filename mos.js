var PORT1 = process.env.PORT || 9080;
var PORT2 = process.env.PORT || 6000;

var mosca = require('mosca');
var MqttServer = new mosca.Server({
    port: PORT2,
    http: {
        port: PORT1,
        bundle: true,
        static: './mqtt.html'
        }
});
 
MqttServer.on('ready', function(){
    console.log('mqtt is running...@port:');
    //MqttServer.authenticate = authenticate;
});
 
MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id  + "\t"+ PORT1);
}); 
 
MqttServer.on('clientDisconnected', function (client) {
    console.log('Client Disconnected     := ', client.id + "\t"+ PORT1);
});
 
 
MqttServer.on('subscribed', function (topic, client) {
    console.log("Subscribed :=", topic, client.id + "\t"+ PORT1);
});
 
MqttServer.on('unsubscribed', function (topic, client) {
    console.log('unsubscribed := ', topic, client.id);
});
 
 
 
MqttServer.on('published', function(packet, client) {
    
    if (typeof (client) == "undefined")
	return;
 
    else
	console.log('client ', client.id, ' publish :', 'topic ='+packet.topic+ ',message = '+ packet.payload.toString());
 
}); 
 
 
MqttServer.on("error", function (err) {
    console.log(err);
});