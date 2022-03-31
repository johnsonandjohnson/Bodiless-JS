/**
 * Copyright © 2022 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable @typescript-eslint/no-unused-expressions */

type Constraint = {
  Foo: number,
  Bar: number,
  Baz: string,
};

// This version provides type safety but no autocomplete
const factory = <T extends object>() => <K extends keyof T>(
  o: Pick<T, K>
): typeof o => o;

const factory2 = <T extends object>() => <
  K0 extends keyof T,
  K1 extends keyof T = never,
>(
    o0: Pick<T, K0>,
    o1?: Pick<T, K1>,
  ): typeof o0 & typeof o1 => ({ ...o0, ...o1 });

// This version allows invalid domains if there is at least
// one valid domain (incorrect).
const factory$ = <T extends object>() => <K extends keyof T>(
  o: Record<K, T[K]>
): typeof o => o;

// This version does not provide checking for existence
// of domains on produced token
const factory$$ = <T extends object>() => (
  o: Partial<T>,
): typeof o => o;

const factory$$$ = <T extends object>() => <S extends Partial<T>>(
  o: S
): typeof o => o;

const f = factory$$$<Constraint>();
const f2 = factory2<Constraint>();

// This generates an error bc Bing is not an allowed property
f({
  // @ts-expect-error
  Bing: '',
});

// But this does not (except with the one working solution). Why?
f({
  Foo: 2,
  // @ts-expect-error
  Bing: '',
});

// This generates an error bc Baz is not a number
f({
  // @ts-expect-error
  Baz: 3,
});

// This should generate the same error, but does not.
f({
  Foo: 3,
  // @ts-expect-error
  Baz: 3,
});

// Goal is to ensure that the keys of an object created in this way are known
// This works as expected.
const t = f({
  Foo: 3,
});
t.Foo;
// @ts-expect-error
t.Baz;
// @ts-expect-error
t.Bar;
// @ts-expect-error
t.Bing;

// Also to ensure that the types of these propeties are correct
let n:number = 0;
let s:string = '';

const t1 = f({
  Foo: 3,
  Baz: '',
});

n = t1.Foo;
// @ts-expect-error
n = t1.Baz;
s = t1.Baz;
// @ts-expect-error
s = t1.Foo;

const t2 = f2({
  Foo: 3
}, {
  Baz: '',
});

n = t2.Foo;
// Testing returned properties on merged objects.
s = t2.Baz;
// @ts-expect-error
t2.Bar;
// @ts-expect-error
s = t2.Foo;
// @ts-expect-error
n = t2.Baz;
