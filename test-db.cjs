const mysql = require('mysql2/promise');
async function test() {
    const ports = [3306, 3307, 3308, 3309];
    const passwords = ['123456', 'root', '', '12082005'];
    for (let p of ports) {
        for (let pw of passwords) {
            try {
                const conn = await mysql.createConnection({host:'127.0.0.1', port:p, user:'root', password:pw});
                console.log(`SUCCESS: port ${p}, pw ${pw}`);
                const [rows] = await conn.query('SHOW DATABASES LIKE "DADN252"');
                if (rows.length > 0) console.log(`FOUND DADN252 ON PORT ${p}!`);
                await conn.end();
            } catch(e) { }
        }
    }
}
test();
