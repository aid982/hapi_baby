const mongojs = require('hapi-mongojs');
const bcrypt = require('bcryptjs');


module.exports.fill_data = () => {
    const accountsCollection = mongojs.db().collection('accounts');
    accountsCollection.count((err,result)=>{
        if ((!result)||(result==0)) {
            var hashedPassword = bcrypt.hashSync('Fqlty1982');
            accountsCollection.insert({name:'admin',password:hashedPassword,email:'osetskiy@dragon-capital.com',roles:['ADMIN']}, (err, result) => {
                    if(err) {
                        throw err;
                    }

                }
            );

        }


    });


};

