function Query(connection) {
    this.connection = connection;
    this.input = input;
    this.inputMany = inputMany;
    this.execute = execute;
    this.executeOne = executeOne;
    this.createQuery = createQuery;
    this.createQueryName = createQueryName;
    this.params = [];
    this.paramsName = [];

    function input(...parameters) {
        if (!parameters)
            throw new Exception('Parameter exception', 'Nenhum parâmetro informado.');

        if (parameters.length == 1 && typeof parameters[0] != 'object') {
            inputIndex(this, parameters[0]);
        } else if (parameters.length == 2 && typeof parameters[0] != 'object') {
            inputName(this, parameters[0], parameters[1]);
        } else if (typeof parameters[0] == 'object') {
            object(this, parameters[0], parameters[1]);
        }

        return this;
    }

    function inputMany(...value) {
        if (this.paramsName.length)
            throw new Exception('Parameter exception', 'Não utilize input e (inputName ou object) na mesma consulta');

        this.params = this.params.concat(value);
        return this;
    }

    //-----------FUNCS AUX------------------


    function inputIndex(query, value) {
        if (query.paramsName.length)
            throw new Exception('Parameter exception', 'Não utilize input e (inputName ou object) na mesma consulta');

        query.params.push(value);
    }

    function inputName(query, name, value) {
        if (query.params.length)
            throw new Exception('Parameter exception', 'Não utilize input e inputName ou object na mesma consulta');

        query.paramsName.push({
            name,
            value
        });
    }

    function object(query, obj, prefix) {
        prefix = prefix || '';
        for (let i in obj) {
            inputName(query, prefix + i, obj[i]);
        }
    }

    //-----------------------------

    function execute(procedureName, callback) {
        this.connection.query(this[this.params.length ? 'createQuery' : 'createQueryName'](procedureName), this.params, callback);
    }

    function executeOne(procedureName, callback) {
        this.connection.queryOne(this[this.params.length ? 'createQuery' : 'createQueryName'](procedureName), this.params, callback);
    }

    function createQuery(procedureName) {
        let paramsIndice = '';
        for (let i in this.params)
            paramsIndice += `$${(+i + 1)}, `;
        paramsIndice = paramsIndice.slice(0, -2);

        return `SELECT * FROM ${procedureName}(${paramsIndice})`;
    }

    function createQueryName(procedureName) {
        let paramsIndice = '';
        this.paramsName.map(x => {
            paramsIndice += `${x.name} := '${x.value}', `;
        });
        paramsIndice = paramsIndice.slice(0, -2);

        return `SELECT * FROM ${procedureName}(${paramsIndice})`;
    }

    function Exception(name, message) {
        this.message = message;
        this.name = name;
    }
}

module.exports = (conn) => {
    return new Query(conn);
};