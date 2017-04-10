## Installation

    npm install smn-pg

## Use Example

```javascript
require('smn-pg')(config);
```

### 
    Only works on Node v6 and above.
    Async methods, only works on Node v7 and above.
####

Check the operation list below.

---------------------------------------

### INPUTS

* [INPUT](#input-parameter)
* [INPUTMANY](#inputmany-parameters)

### EXECUTES

* [EXECUTE](#execute-procedurename-callback)
* [EXECUTEONE](#executeone-procedurename-callback)
* [ASYNC_EXECUTE](#async-execute-procedurename)
* [ASYNC_EXECUTEONE](#async-executeone-procedurename)

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

require('smn-pg')(config);
// SINGLE INSTANCE

```

## INPUTS

### INPUT (parameter)


*Params - Value* 
```javascript
/* Inform the params in the same sequency of prcedure */

pg.request()
    .input('value')
    .input('value')
    .input('value')
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

/* The name of the attributes of the object must have the same name of the params. */
/* The object must never have more attributes than params expected by the procedure */
/* In the case have a prfix default, he can be past in the second params of the method */

pg.request()
    .input(obj, /*Optional prefix name*/)
    .input('paramName','value') /* Optional together with object */
    .execute('procedureName', (err, data) => {
        if (err)
            return console.log(err);

        console.log(data);
    });
``` 

### INPUTMANY (parameters)
```javascript
pg.request()
    .inputMany('param1','param2','param3')
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

### ASYNC_EXECUTE (procedureName)
*Return list results* 
```javascript

return pg.request()
    .asyncExecute('procedureName');

``` 

### ASYNC_EXECUTEONE (procedureName)
*Return single result* 
```javascript

return pg.request()
    .asyncExecuteOne('procedureName');

``` 