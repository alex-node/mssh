var express = require('express.io');
var bone = require('bone.io');
var app = express().http().io();
var Color = require('./lib/rpi-lpd8806').Color, 
    ColorHSV = require('./lib/rpi-lpd8806').colorHSV,
    LEDStrip = require('./lib/rpi-lpd8806').LEDStrip,
    range = require('./lib/utils').range;
var active = true;
var num = 32; //change this to match number of LEDs on your strip
var spi_bus = "/dev/spidev1.0";
var led = new LEDStrip(num,spi_bus);
    
    led.all_off();
    
    bone.set('io.options', {server: app.io});
    
    app.use(bone.static())
        .use(express.cookieParser())
        .use(express.session({ secret: '9973' }))
        .use(express.static(__dirname))
        .listen(8080);
    app.get('/', function (req, res) {
        req.session.loginDate = new Date().toString();
        res.sendfile(__dirname + '/GYROclient.html');
    });

var GYRO_CLIENT = bone.io('gyro', {
    outbound: {
		routes: ['data'],
	},
	inbound: {
		data: function (o, context) {
            // o.x, o.y, o.z for accelerometer
            // o.alpha, o.beta, o.gamma for gyro
            if(active){
            var roll = (o.gamma/360);//0 <-> +360
            var pitch = (o.beta/360);//-180 <-> +180
            
            var c = led.wheel_color(Math.abs(parseInt(384*roll)));
            var led_Index = ((parseInt(32*pitch))*2)+16;
            
            led.all_off();
            led.set(led_Index -1, new Color(c.R, c.G, c.B, .50));
			led.set(led_Index, c);
            led.set(led_Index +1, new Color(c.R, c.G, c.B, .50));
            led.update();
            }else{
                led.all_off();
            }
		},
        activate: function(data, context){
            active = data;
        }
	}
});
