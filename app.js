const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 6933;
const { Sequelize, DataTypes ,Op}  = require('sequelize');


const sequelize = new Sequelize('asqtesti_DBtest', 'asqtesti_db_user', 'mdLW@vkV&S(u', {
    host: 'localhost',
    dialect: 'mysql'
});
let User;
// use get json on body
app.use(express.json())
app.get('/checkConnection', async function (req, res) {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    res.send(JSON.stringify({
        status: 102,
        description: "نشست شما به پایان رسیده است."
    }));


});
app.get('/findByPk/:id', async function (req, res) {
    const findByPk = await User.findByPk(req.params.id);
    if (findByPk === null) {
        console.log('Not found!');
    } else {
        console.log(findByPk); // true
        // Its primary key is 123
    }
    res.send(JSON.stringify({
        status: 102,
        description: "نشست شما به پایان رسیده است."
    }));


});
app.get('/findOne/:name', async function (req, res) {
    const findOne = await User.findOne({ where: { firstName: req.params.name } });
    if (findOne === null) {
        console.log('Not found!');
    } else {
        console.log(findOne); // true
        // Its primary key is 123
    }
    res.send(JSON.stringify({
        status: 102,
        description: "نشست شما به پایان رسیده است."
    }));


});
app.get('/findAndCountAll', async function (req, res) {
    const { count, rows } = await User.findAndCountAll({
        where: {
            firstName: {
                [Op.like]: 'a%'
            }
        },
        offset: 0,
        limit: 20
    });
    console.log(count);
    console.log(rows);
    res.send(JSON.stringify({
        status: 102,
        description: "نشست شما به پایان رسیده است."
    }));

});

app.get('/defined', async function (req, res) {
     User = await sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true

        },
        lastName: {
            type: DataTypes.STRING,
            defaultValue:'ali',
            primaryKey: true,
            unique: true

        },
        gender:{
            type: DataTypes.ENUM,
            values: ['man', 'woman', 'other']
        }
    }, {
        freezeTableName: true
    });
    console.log(User === sequelize.models.User);
    await User.sync({ force: true });
    console.log("The table for the User model was just (re)created!");
    res.send(JSON.stringify({
        status: 102,
        description: "نشست شما به پایان رسیده است."
    }));


});
app.get('/defined2', async function (req, res) {
     User = await sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false

        },
        lastName: {
            type: DataTypes.STRING,
            defaultValue:'ali',
            unique: true

        },
        gender:{
            type: DataTypes.ENUM,
            values: ['man', 'woman', 'other']
        }
    }, {
        freezeTableName: true
    });
    console.log(User === sequelize.models.User);
    await User.sync({ force: true });
    console.log("The table for the User model was just (re)created!");
    res.send(JSON.stringify({
        status: 102,
        description: "نشست شما به پایان رسیده است."
    }));


});
app.get('/drop', async function (req, res) {

    console.log(await User.drop());
    res.send(JSON.stringify({
        status: 102,
        description: "نشست شما به پایان رسیده است."
    }));


});
app.get('/findAll', async function (req, res) {

    const users = await User.findAll();
    console.log(users);
    const usersC = await User.findAll({
        attributes: [
            'firstName',
            ['lastName', 'lastname']

        ],
        where: {
            [Op.and]:[
                {firstName: 'ali'}, {[Op.or]: [{lastName: 'haghighat'},{lastName: 'haqiqat'}]}

        ]

        }
    });
    console.log(usersC);
    res.send(JSON.stringify({
        status: 102,
        description: "نشست شما به پایان رسیده است."
    }));


});
app.get('/update', async function (req, res) {
    const usersC = await User.update(
    { lastName: "Doe" },{
        where: {
            [Op.and]:[
                {firstName: 'ali'}, {[Op.or]: [{lastName: 'haghighat'},{lastName: 'haqiqat'}]}

        ]

        }
    });
    console.log(usersC);
    res.send(JSON.stringify({
        status: 102,
        description: "نشست شما به پایان رسیده است."
    }));


});
app.get('/remove', async function (req, res) {
    const usersC = await User.destroy({
        where: {
            firstName: "ali"
        }
    });

    console.log(usersC);
    res.send(JSON.stringify({
        status: 102,
        description: "نشست شما به پایان رسیده است."
    }));


});


app.get('/insert/:name/:last/:gender', async function (req, res) {
    const jane = await User.create({ firstName: req.params.name, lastName: req.params.last,gender:req.params.gender });
    console.log("Jane's auto-generated ID:", jane.name);
    res.send(JSON.stringify({
        status: 102,
        description: "نشست شما به پایان رسیده است."
    }));


});


//end user
server.listen(port, () => {

    console.log(`Example app listening on port ${port}`)
});