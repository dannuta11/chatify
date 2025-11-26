import { Decimal } from "../generated/prisma/internal/prismaNamespace";
import _ from "lodash";

export const camelCaseKeys = (
  obj: Record<string, any>,
): Record<string, any> => {
  if (_.isArray(obj)) {
    return obj.map(camelCaseKeys);
  }

  if (obj instanceof Decimal) {
    return obj;
  }

  if (_.isObjectLike(obj) && !_.isDate(obj)) {
    return _.fromPairs(
      _.map(obj, (value, key) => {
        const camelCasedKey = _.camelCase(key);
        const val = camelCaseKeys(value);
        return [camelCasedKey, val];
      }),
    );
  }
  return obj;
};
