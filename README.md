# Nazi-CORS

Nazi CORS is a NodeJS project that I made as a solution to CORS errors students at IES El Rincon where having while making XLST transformations directly in the client
Its called NAZI CORS as a critique to all the "OPEN DATA" websites that have rate limiting and CORS headers that prohibit several tipes of requests
## Installation

Install the dependencies using NPM to install the Express server.

```bash
npm install
```

## Usage

```nodejs
            url:  'http://www.bne.es/media/datosgob/dibi/bibliotecas.xml',
```
This line needs to be changed, it indicates what file gets downloaded

```nodejs
  fs.rename('biblio.xml', 'C:\\Users\\Rudiger\\WebstormProjects\\Nazi-CORS\\public\\biblio.xml',
```
This line indicates where the file is saved, and where to save the renamed file. we make this as a security feature in case the server banned us or timed us out, we handle the error in such a way that there is always a .xml with data avaiable to make a fresh transformation

After that you need to execute the script with
```
node bin/www
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)
