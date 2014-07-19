lpd8806-GYRO
============

A gyro controlled [LED strip](https://www.adafruit.com/products/306) via the [SPI protocol](http://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus), [lpd8806](https://solarbotics.com/download.php?file=1889) array and [gyro.js](http://tomg.co/gyrojs).
Tested on the [BeagleBone Black](http://beagleboard.org/Products/BeagleBone%20Black) using [rpi-lpd8806.js](https://github.com/jaguarnac/RPi-LPD8806-node).

Requirements:

* [node.js](http://nodejs.org/) -- v0.8.7 or newer
* [socket.io] (http://socket.io/)
* [bone.io](http://bone.io/)
* [express.io](http://express-io.org/)

Install:
```bash
npm install express.io
npm install socket.io
npm install bone.io
```
Run:
```bash
node GYROserver.js
```
Connect:
```bash
http://localhost:8080
```


