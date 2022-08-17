"use strict";

// exports.authenticate = (username, password) => {
//     return Promise.resolve({ uid: 1, name: username, admin: false });
// };

exports.authenticate = (username, password) => {  
  return new Promise((resolve, reject) => {
    if ((username === 'sarah') && (password === 'connor')) {
      resolve({uid: 1, name: username, admin: false});
    } else {
      reject();
    }
  });
};
