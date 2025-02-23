import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 1 },  
        { duration: '10s', target: 1 },  
        { duration: '10s', target: 0 },   
       
    ],
};

export default function () {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
    let res = http.get(url);
    
    check(res, {
        'is status 200': (r) => {
            if (r.status !== 200) {
                console.error(`Request failed: ${r.status} - ${r.body}`);
            }
            return r.status === 200;
        },
        'response time < 200ms': (r) => r.timings.duration < 500,
    });

    sleep(3); // Wait for 1 second between requests
}
