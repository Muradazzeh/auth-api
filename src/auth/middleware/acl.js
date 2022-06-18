'use strict';

module.exports = (capability) => {

  return (req, res, next) => {

    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      }
      else {
        next(`Access Denied , your role is >>> ${req.user.role} <<< so you can't do this action`);
      }
    } catch (e) {
      next('Invalid Login');
    }

  }

}
