import _ from "lodash";
import  * as Prisma from "../generated/prisma/internal/prismaNamespace";

export const camelCaseKeys = (obj: Record<string, any>): Record<string, any> => {
  if (_.isArray(obj)) {
    return obj.map(camelCaseKeys);
  }
  if (obj instanceof Prisma.Decimal) {
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
}
