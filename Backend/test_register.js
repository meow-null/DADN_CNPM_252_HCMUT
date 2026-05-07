// import fetch from 'node-fetch';


async function testRegister() {
    try {
        const res = await fetch('http://localhost:3069/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'hehe',
                email: 'huy.phanthanh295@hcmut.edu.vn',
                password: '123'
            })
        });
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Fetch error:', err.message);
    }
}

testRegister();
