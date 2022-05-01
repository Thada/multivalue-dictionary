const { question } = require('readline-sync');

async function run() {
  while(true) {
    const input = question('>');
    console.log(`You input ${input}`);
  }
}

run().then();