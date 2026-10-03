import test from 'node:test';
import assert from 'node:assert/strict';
import { investorSchema } from '../lib/investor';
const valid = { name: 'María Pérez', email: 'maria@example.com', company: 'Inversora particular', phone: '+54 9 376 400 0000', consent: true, website: '' };
test('accepts complete international lead and trims name', () => { const result = investorSchema.parse({ ...valid, name: ' María Pérez ' }); assert.equal(result.name, 'María Pérez'); });
test('rejects invalid email, short phone, missing consent and bot field', () => { for (const change of [{ email: 'invalid' }, { phone: '-------' }, { consent: false }, { website: 'https://spam.example' }, { company: '' }, { name: 'a'.repeat(101) }]) assert.equal(investorSchema.safeParse({ ...valid, ...change }).success, false); });
