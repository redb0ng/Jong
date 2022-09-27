'use strict';

exports.pathToIndyClientHome = function () {
  return require('os').homedir() + "/.indy_client"
}