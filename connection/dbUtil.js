function createTableQuery(queryData){
	let queryString = "";

	for(let i = 0;i < queryData.length;i++){
		let columnName = queryData[i].columnName;
		let dataType = queryData[i].dataType;
		let dataValue = queryData[i].dataValue ? '(' + queryData[i].dataValue  + ')': "";
		queryString += ' ' + columnName + ' ' + dataType + dataValue + ',';
	}

	return queryString;
}

module.exports = {createTableQuery};