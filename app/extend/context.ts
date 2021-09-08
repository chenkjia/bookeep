
import schema from 'async-validator';
const resFormat = {
  success: (data: any = {}) => ({
    code: 0,
    data,
    message: 'success',
  }),
  notFound: () => ({
    code: 1,
    message: 'record not found',
  }),
  duplicate: () => ({
    code: 11000,
    message: 'duplicate key',
  }),
  common(error) {
    return error.code === 11000 ? resFormat.duplicate() : {
      code: error.code || -1,
      message: error.message || error.name || 'unknown',
    };
  },
};
export default {
  async validate(data, descriptor:any = {}) {
    const validator = new schema(descriptor);
    return validator.validate(data, errors => {
      if (errors) {
        throw {
          code: 2,
          message: errors.map(({ message }) => message).join(';'),
        };
      }
    });
  },
  resFormat,
};
