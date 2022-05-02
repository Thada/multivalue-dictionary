const { question } = require('readline-sync');

// Stores the multivalue dictionary
let dict = new Map();

// Main function; prompts user for input
async function run() {
  while(true) {
    const input = question('> ');
    //console.log(`You input ${input}`);
    check(input.split(" "));
  }
}

// Checks user input and performs command based on first input argument
function check(input) {
  let key = input[1];
  let member = input[2];

  switch (input[0].toLowerCase()) {
    case '' :
      break;

    case 'keys' :
      keys();
      break;

    case 'members' : 
      members(key);
      break;

    case 'add' :
      add(key, member);
      break;

    case 'remove' :
      remove(key, member);
      break;

    case 'removeall' : 
      removeall(key);
      break;

    case 'clear' :
      clear();
      break;

    case 'keyexists' :
      keyexists(key);
      break;

    case 'memberexists' :
      memberexists(key, member);
      break;

    case 'allmembers' :
      allmembers();
      break;

    case 'items' :
      items();
      break;
    
    case 'exit' :
      process.exit(1);

    default :
      console.log(`${input[0]} not a known command`);
      break;
  }
}

// Returns all keys in the dictionary. Order is not guaranteed.
function keys() {
  try {
    const keyList = new Set();
    const iterator = dict.keys();
    if (dict.size == 0) {
      console.log(`(empty set)`);
      return;
    } else {
      for(let i = 1; i <= dict.size; i++) {
        let key = iterator.next().value;
        console.log(`${i}) ${key}`);
        keyList.add(key);
      }
    }
    return keyList;
  } catch (error) {
    console.error(error.message);
  }
}

// Returns the collection of strings for the given key. Return order is not guaranteed. Returns an error if the key does not exist.
function members(key) {
  try {
    const memberList = new Set();
    if (dict.has(key)) {
      let i = 1;
      dict.get(key).forEach((member) => {
        console.log(`${i}) ${member}`);
        memberList.add(member);
        i++;
      });
    } else {
      throw new Error(') ERROR, key does not exist');
    }
    return memberList;
  } catch (error) {
    console.error(error.message);
  }
}

// Adds a member to a collection for a given key. Displays an error if the member already exists for the key.
function add(key, member) {
  try {
    if (dict.has(key)) {
        if (dict.get(key).has(member)) {
          throw new Error(`) ERROR, member already exists for key`);
        } else {
          dict.set(key, dict.get(key).add(member));
        }
    } else {
      dict.set(key, new Set().add(member));
    }
    console.log(`) Added`);
    return;
  } catch(error) {
    console.error(error.message)
  }
}

// Removes a member from a key. If the last member is removed from the key, the key is removed from the dictionary. If the key or member does not exist, displays an error.
function remove(key, member) {
  try {
    if (dict.has(key)) {
      if (dict.get(key).has(member)) {
        dict.get(key).delete(member);
        console.log(`) Removed`);
        if (dict.get(key).size == 0) {
          dict.delete(key);
        }
      } else {
        throw new Error(') ERROR, member does not exist');
      }
    } else {
      throw new Error(') ERROR, key does not exist');
    }
    return;
  } catch (error) {
    console.error(error.message);
  }
}

// Removes all members for a key and removes the key from the dictionary. Returns an error if the key does not exist.
function removeall(key) {
  try {
    if (dict.has(key)) {
      dict.delete(key);
      console.log(`) Removed`);
    } else {
      throw new Error(') ERROR, key does not exist');
    }
    return;
  } catch (error) {
    console.error(error.message);
  }
}

// Removes all keys and all members from the dictionary.
function clear() {
  try {
    dict.clear();
    console.log(`) Cleared`);
    return;
  } catch (error) {
    console.error(error.message);
  }
}

// Returns whether a key exists or not.
function keyexists(key) {
  try {
    if (dict.has(key)) {
      console.log(`) true`);
      return true;
    } else {
      console.log(`) false`);
      return false;
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Returns whether a member exists within a key. Returns false if the key does not exist.
function memberexists(key, member) {
  try {
    if (dict.has(key)) {
      if (dict.get(key).has(member)) {
        console.log(`) true`);
        return true;
      } else {
        console.log(`) false`);
        return false;
      }
    } else {
      throw new Error(') ERROR, key does not exist');
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Returns all the members in the dictionary. Returns nothing if there are none. Order is not guaranteed.
function allmembers() {
  try {
    const memberList = new Set();
    if (dict.size == 0) {
      console.log(`(empty set)`);
      return;
    } else {
      let counter = 1;
      const keyIterator = dict.keys();
      for(let i = 1; i <= dict.size; i++) {
        const key = keyIterator.next().value;
        const eleIterator = dict.get(key).values();
        for(let j = 1; j <= dict.get(key).size; j++) {
          let element = eleIterator.next().value;
          console.log(`${counter}) ${element}`);
          counter++;
          memberList.add(element);
        }
      }
    }
    return memberList;
  } catch (error) {
    console.error(error.message);
  }
}

// Returns all keys in the dictionary and all of their members. Returns nothing if there are none. Order is not guaranteed.
function items() {
  try {
    if (dict.size == 0) {
      console.log(`(empty set)`);
      return;
    } else {
      let counter = 1;
      const keyIterator = dict.keys();
      for(let i = 1; i <= dict.size; i++) {
        const key = keyIterator.next().value;
        const eleIterator = dict.get(key).values();
        for(let j = 1; j <= dict.get(key).size; j++) {
          console.log(`${counter}) ${key}: ${eleIterator.next().value}`);
          counter++;
        }
      }
    }
    return dict;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = check;

run().then();