import { tokenRule } from "./tokenRule";

export function getTokenRulesList(): tokenRule[] {
    let tokens: tokenRule[] = [
        { name: 'token', regex: '^[a-zA-Z_$][a-zA-Z_$0-9]*$' }
    ];
    return tokens;
}