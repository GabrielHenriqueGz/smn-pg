## Installation

    npm install devbox-pg

## Use Example

```javascript
require('devbox-pg')(config);
```

### Only works on Node v6 and above ####

Check the operation list below.

---------------------------------------

### INPUTS

* [INPUT](#input-parameter)
* [INPUTMANY](#inputmany-parameters)

### EXECUTES

* [EXECUTE](#execute-procedurename-callback)
* [EXECUTEONE](#executeone-procedurename-callback)

---------------------------------------

### Example Config
```javascript

let config = {
    user: 'user',
    database: 'database',
    password: 'pass',
    host: 'host',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};;

const pg = require('devbox-pg')(config);

```

## INPUTS

### INPUT (parameter)


*Params - Value* 
```javascript
pg.request()
    .input('param1')
    .input('param2')
    .input('param3')
    .execute('procedureName', (err, data) => {
        if (err)
            return console.log(err);

        console.log(data);
    });
``` 
*Params - Name,Value* 
```javascript
pg.request()
    .input('paramName1','value1')
    .input('paramName2','value2')
    .execute('procedureName', (err, data) => {
        if (err)
            return console.log(err);

        console.log(data);
    });
``` 
*Params - Object,Prefix* 
```javascript

let obj = {
    parameterName: 'parameterValue',
    parameterName1: 'parameterValue1',
    parameterName2: 'parameterValue2',
}

/* O Nome dos atributos do objeto deve ter o mesmo nome dos parâmetros */
/* O Objeto nunca deve possuir mais atributos do que parâmetros esperados pela procedure */
/* Caso houver um padrão de prefixo, ele pode ser passado no 2 parâmetro do metodo -object- */

pg.request()
    .input(obj, /*Optional prefix name*/)
    .input('paramName','value') /* Opicional junto com object */
    .execute('procedureName', (err, data) => {
        if (err)
            return console.log(err);

        console.log(data);
    });
``` 

### INPUTMANY (parameters)
```javascript
pg.request()
    .input('param1','param2','param3')
    .execute('procedureName', (err, data) => {
        if (err)
            return console.log(err);

        console.log(data);
    });
``` 
## EXECUTES

### EXECUTE (procedureName, callback)
*Return list results* 
```javascript
pg.request()
    .execute('procedureName', (err, data) => {
        if (err)
            return console.log(err);

        console.log(data);
    });
``` 

### EXECUTEONE (procedureName, callback)
*Return single result* 
```javascript
pg.request()
    .executeOne('procedureName', (err, data) => {
        if (err)
            return console.log(err);

        console.log(data);
    });
``` 
