# Weather Challenge 

#### Objetivo
Se requiere implementar una API que provea en formato JSON el estado del tiempo basado en
diferentes endpoints. 

### Stack
NodeJS

### Tech
|  |  |
| ------ | ------ |
| aws - ec2 | https://aws.amazon.com/es/ |
| suse | https://www.suse.com/es-es/ |
| nginx | https://www.nginx.com/ |
| node.js | https://nodejs.org/es/ |
|PM2| https://www.npmjs.com/package/pm2 |
|bluebird|https://www.npmjs.com/package/bluebird|
| GitHub | https://github.com/ |

#### API Descripcion

Esta api corre en una instancia suse aws-ec2, usa nginx para redirigir el puerto 80 a puertos internos, también usa pm2 para proveer estabilidad del servidor.

Solo una instancia corre actualmente, pero se puede usar pm2 para escalar horizontalmente.

Public DNS:
http://ec2-18-228-24-76.sa-east-1.compute.amazonaws.com/
Redirige a esta página.

```
GET http://ec2-18-228-24-76.sa-east-1.compute.amazonaws.com/v1/location
Devuelve los datos de ubicación city según ip-api. 
```
```
GET http://ec2-18-228-24-76.sa-east-1.compute.amazonaws.com/v1/current[/city]
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
ip-api y el estado del tiempo actual.
```
```
GET http://ec2-18-228-24-76.sa-east-1.compute.amazonaws.com/v1/forecast[/city]
City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual según
ip-api y el estado del tiempo a 5 días
```
