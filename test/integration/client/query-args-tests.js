var helper = require(__dirname + '/test-helper');
var pg = helper.pg;
var config = helper.config;

test('check that passed values types have not been changed during the query phase', function() {

	pg.connect(config, assert.success(function(client, done) {
		var originalValues = [1,2];
		var values = originalValues.slice();

		client.query('SELECT 1 WHERE 0 <> $1 AND 0 <> $2',values, function(result) {
			console.log('result:',result);
			assert.equal(result.rowCount, 1);
			assert.equal(values.length,originalValues.length,'expecting same length as given array!');
			assert.strictEqual(isNaN(values[0]),false,'expecting a number!');
			assert.strictEqual(isNaN(values[1]),false,'expecting a number!');
			done();
		});

	}));
});