const Aerospike= require('aerospike');

const AerospikeClient = Aerospike.client({
    hosts: '127.0.0.1:3000', // aerospike server
    log: { level: Aerospike.log.DEBUG }, // show logs
    modlua: {userPath: './udf'} // local path to udf
});

try {
    await AerospikeClient.connect();
    await getKeys();
    await AerospikeClient.close();
} catch (e) {
    console.log('Error:', e);
}

async function getKeys(){
    return new Promise((resolve, reject) => {
        try{
            let query = AerospikeClient.query('namespace', 'set');
            // add filter with secondary index
            query.where(Aerospike.filter.equal('isActive', 1));
            // set udf to be used (it should be present in the udf folder adn registered in the aerospike)
            query.setUdf( 'test_udf', 'test_fn');
            let stream = query.foreach();
            let data = [];
            stream.on('data', (record) => {
                    data.push(record);
            });
            stream.on('error', (error) => {
              console.error('Stream error:', error);
            });
            stream.on('end', () => {
                console.log('Stream end - ', data.length);
              return resolve();
            });
        } catch (err) {
            console.log('getKeys err - ', err);
            return reject(err);
        }
    })
}
