import * as crypto from "crypto";

export const hashPassword = (p: string): string => {
    const hmac = crypto.createHmac('sha512','AUFHAJNA *SAyD AN 9a8hf89Ash H F AS) Y(HY @8asjD ZS0AYSd0hAduASH&*DT&*SGFAHBJKFASZyfga8y09aqj 190-u182847124y12hafs');
    hmac.update(p);
    return hmac.digest("hex");
}