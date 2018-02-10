import _getOr from "lodash/fp/getOr";

export const locationSelector = (state) => ({location: _getOr({}, ["router", "location"])(state)});
