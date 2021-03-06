/**
 * Reusable HTTP response functions
 *
 * These functions can be passed to `.then` and `.catch`
 */

const handleError = (res, statusCode) => {
  statusCode = statusCode || 500;

  return (err) => {
    res.status(statusCode).send(err);
    return null;
  };
}

const responseWithResult = (res, statusCode) => {
  statusCode = statusCode || 200;
  return (entity) => {
    if (entity) {
      res.status(statusCode).json(entity);
    }

    return null;
  };
}

const handleEntityNotFound = res => (entity) => {
  if (!entity) {
    res.status(404).end();
    return null;
  }

  return entity;
}

const saveUpdates = updates => entity => entity
  .updateAttributes(updates)
  .then(updated => updated)

const removeEntity = res => function (entity) {
  if (entity) {
    return entity.destroy()
      .then(() => {
        res.status(204).end();
        return null;
      });
  }
}

const validationError = (res, statusCode) => {
  statusCode = statusCode || 422;
  return (err) => {
    res.status(statusCode).json(err);
    return null;
  }
}

module.exports = {
  handleError,
  responseWithResult,
  handleEntityNotFound,
  saveUpdates,
  removeEntity,
  validationError,
};
