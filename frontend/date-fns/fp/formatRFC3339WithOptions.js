// This file is generated automatically by `scripts/build/fp.ts`. Please, don't change it.

import { formatRFC3339 as fn } from "../formatRFC3339.js";
import { convertToFP } from "./_lib/convertToFP.js";

export const formatRFC3339WithOptions = convertToFP(fn, 2);

// Fallback for modularized imports:
export default formatRFC3339WithOptions;
