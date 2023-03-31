# rafaelfucho5.github.io

## React en Vite
Este es un proyecto base de React utilizando Vite como bundler. A continuación, se detallan los pasos para instalar y desplegar la aplicación.

### Instalación
- Clona este repositorio utilizando Git o descárgalo como un archivo ZIP y descomprímelo.
```
git clone https://github.com/rafaelfucho5/rafaelfucho5.github.io.git
```

- Abre la terminal y navega hasta la carpeta donde se encuentra el proyecto.
```
cd tu-repositorio
```

- Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```
npm install
```

- Una vez que se hayan instalado todas las dependencias, puedes ejecutar la aplicación en modo de desarrollo con el siguiente comando:
```
npm run dev
```
- Abre un navegador web y accede a la siguiente URL:
```
http://localhost:5173/
```
Si todo ha ido bien, deberías ver la página de inicio de la aplicación.

### Despliegue
Antes de desplegar la aplicación en un servidor de producción, debes construir una versión optimizada del proyecto. Para hacerlo, ejecuta el siguiente comando:
arduino
```
npm run build
```
Esto generará una carpeta "dist" con los archivos optimizados listos para ser desplegados.

Para desplegar la aplicación, puedes utilizar cualquier servidor web capaz de servir archivos estáticos. Por ejemplo, puedes subir la carpeta "dist" a un servidor de hosting o utilizar un servicio de CDN como Netlify.
