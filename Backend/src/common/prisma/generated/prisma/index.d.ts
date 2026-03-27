
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model bearings
 * 
 */
export type bearings = $Result.DefaultSelection<Prisma.$bearingsPayload>
/**
 * Model chains
 * 
 */
export type chains = $Result.DefaultSelection<Prisma.$chainsPayload>
/**
 * Model motors
 * 
 */
export type motors = $Result.DefaultSelection<Prisma.$motorsPayload>
/**
 * Model projects
 * 
 */
export type projects = $Result.DefaultSelection<Prisma.$projectsPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const users_role: {
  user: 'user',
  admin: 'admin'
};

export type users_role = (typeof users_role)[keyof typeof users_role]


export const projects_step: {
  created: 'created',
  inputs: 'inputs',
  kinematics: 'kinematics',
  motor_selected: 'motor_selected',
  design_partial: 'design_partial',
  design_done: 'design_done'
};

export type projects_step = (typeof projects_step)[keyof typeof projects_step]

}

export type users_role = $Enums.users_role

export const users_role: typeof $Enums.users_role

export type projects_step = $Enums.projects_step

export const projects_step: typeof $Enums.projects_step

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Bearings
 * const bearings = await prisma.bearings.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Bearings
   * const bearings = await prisma.bearings.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.bearings`: Exposes CRUD operations for the **bearings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bearings
    * const bearings = await prisma.bearings.findMany()
    * ```
    */
  get bearings(): Prisma.bearingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chains`: Exposes CRUD operations for the **chains** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chains
    * const chains = await prisma.chains.findMany()
    * ```
    */
  get chains(): Prisma.chainsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.motors`: Exposes CRUD operations for the **motors** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Motors
    * const motors = await prisma.motors.findMany()
    * ```
    */
  get motors(): Prisma.motorsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projects`: Exposes CRUD operations for the **projects** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.projects.findMany()
    * ```
    */
  get projects(): Prisma.projectsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    bearings: 'bearings',
    chains: 'chains',
    motors: 'motors',
    projects: 'projects',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "bearings" | "chains" | "motors" | "projects" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      bearings: {
        payload: Prisma.$bearingsPayload<ExtArgs>
        fields: Prisma.bearingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bearingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bearingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bearingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bearingsPayload>
          }
          findFirst: {
            args: Prisma.bearingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bearingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bearingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bearingsPayload>
          }
          findMany: {
            args: Prisma.bearingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bearingsPayload>[]
          }
          create: {
            args: Prisma.bearingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bearingsPayload>
          }
          createMany: {
            args: Prisma.bearingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.bearingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bearingsPayload>
          }
          update: {
            args: Prisma.bearingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bearingsPayload>
          }
          deleteMany: {
            args: Prisma.bearingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bearingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.bearingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bearingsPayload>
          }
          aggregate: {
            args: Prisma.BearingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBearings>
          }
          groupBy: {
            args: Prisma.bearingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BearingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.bearingsCountArgs<ExtArgs>
            result: $Utils.Optional<BearingsCountAggregateOutputType> | number
          }
        }
      }
      chains: {
        payload: Prisma.$chainsPayload<ExtArgs>
        fields: Prisma.chainsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.chainsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chainsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.chainsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chainsPayload>
          }
          findFirst: {
            args: Prisma.chainsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chainsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.chainsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chainsPayload>
          }
          findMany: {
            args: Prisma.chainsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chainsPayload>[]
          }
          create: {
            args: Prisma.chainsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chainsPayload>
          }
          createMany: {
            args: Prisma.chainsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.chainsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chainsPayload>
          }
          update: {
            args: Prisma.chainsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chainsPayload>
          }
          deleteMany: {
            args: Prisma.chainsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.chainsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.chainsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chainsPayload>
          }
          aggregate: {
            args: Prisma.ChainsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChains>
          }
          groupBy: {
            args: Prisma.chainsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChainsGroupByOutputType>[]
          }
          count: {
            args: Prisma.chainsCountArgs<ExtArgs>
            result: $Utils.Optional<ChainsCountAggregateOutputType> | number
          }
        }
      }
      motors: {
        payload: Prisma.$motorsPayload<ExtArgs>
        fields: Prisma.motorsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.motorsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$motorsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.motorsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$motorsPayload>
          }
          findFirst: {
            args: Prisma.motorsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$motorsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.motorsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$motorsPayload>
          }
          findMany: {
            args: Prisma.motorsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$motorsPayload>[]
          }
          create: {
            args: Prisma.motorsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$motorsPayload>
          }
          createMany: {
            args: Prisma.motorsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.motorsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$motorsPayload>
          }
          update: {
            args: Prisma.motorsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$motorsPayload>
          }
          deleteMany: {
            args: Prisma.motorsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.motorsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.motorsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$motorsPayload>
          }
          aggregate: {
            args: Prisma.MotorsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMotors>
          }
          groupBy: {
            args: Prisma.motorsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MotorsGroupByOutputType>[]
          }
          count: {
            args: Prisma.motorsCountArgs<ExtArgs>
            result: $Utils.Optional<MotorsCountAggregateOutputType> | number
          }
        }
      }
      projects: {
        payload: Prisma.$projectsPayload<ExtArgs>
        fields: Prisma.projectsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.projectsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.projectsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findFirst: {
            args: Prisma.projectsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.projectsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          findMany: {
            args: Prisma.projectsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>[]
          }
          create: {
            args: Prisma.projectsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          createMany: {
            args: Prisma.projectsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.projectsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          update: {
            args: Prisma.projectsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          deleteMany: {
            args: Prisma.projectsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.projectsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.projectsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectsPayload>
          }
          aggregate: {
            args: Prisma.ProjectsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjects>
          }
          groupBy: {
            args: Prisma.projectsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectsGroupByOutputType>[]
          }
          count: {
            args: Prisma.projectsCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectsCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    bearings?: bearingsOmit
    chains?: chainsOmit
    motors?: motorsOmit
    projects?: projectsOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MotorsCountOutputType
   */

  export type MotorsCountOutputType = {
    projects: number
  }

  export type MotorsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | MotorsCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * MotorsCountOutputType without action
   */
  export type MotorsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MotorsCountOutputType
     */
    select?: MotorsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MotorsCountOutputType without action
   */
  export type MotorsCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: projectsWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    projects: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | UsersCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: projectsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model bearings
   */

  export type AggregateBearings = {
    _count: BearingsCountAggregateOutputType | null
    _avg: BearingsAvgAggregateOutputType | null
    _sum: BearingsSumAggregateOutputType | null
    _min: BearingsMinAggregateOutputType | null
    _max: BearingsMaxAggregateOutputType | null
  }

  export type BearingsAvgAggregateOutputType = {
    id: number | null
    inner_d: Decimal | null
    outer_D: Decimal | null
    width_B: Decimal | null
    C: Decimal | null
    C0: Decimal | null
    deletedBy: number | null
  }

  export type BearingsSumAggregateOutputType = {
    id: number | null
    inner_d: Decimal | null
    outer_D: Decimal | null
    width_B: Decimal | null
    C: Decimal | null
    C0: Decimal | null
    deletedBy: number | null
  }

  export type BearingsMinAggregateOutputType = {
    id: number | null
    code: string | null
    type: string | null
    inner_d: Decimal | null
    outer_D: Decimal | null
    width_B: Decimal | null
    C: Decimal | null
    C0: Decimal | null
    is_active: boolean | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BearingsMaxAggregateOutputType = {
    id: number | null
    code: string | null
    type: string | null
    inner_d: Decimal | null
    outer_D: Decimal | null
    width_B: Decimal | null
    C: Decimal | null
    C0: Decimal | null
    is_active: boolean | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BearingsCountAggregateOutputType = {
    id: number
    code: number
    type: number
    inner_d: number
    outer_D: number
    width_B: number
    C: number
    C0: number
    is_active: number
    deletedBy: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BearingsAvgAggregateInputType = {
    id?: true
    inner_d?: true
    outer_D?: true
    width_B?: true
    C?: true
    C0?: true
    deletedBy?: true
  }

  export type BearingsSumAggregateInputType = {
    id?: true
    inner_d?: true
    outer_D?: true
    width_B?: true
    C?: true
    C0?: true
    deletedBy?: true
  }

  export type BearingsMinAggregateInputType = {
    id?: true
    code?: true
    type?: true
    inner_d?: true
    outer_D?: true
    width_B?: true
    C?: true
    C0?: true
    is_active?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BearingsMaxAggregateInputType = {
    id?: true
    code?: true
    type?: true
    inner_d?: true
    outer_D?: true
    width_B?: true
    C?: true
    C0?: true
    is_active?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BearingsCountAggregateInputType = {
    id?: true
    code?: true
    type?: true
    inner_d?: true
    outer_D?: true
    width_B?: true
    C?: true
    C0?: true
    is_active?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BearingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bearings to aggregate.
     */
    where?: bearingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bearings to fetch.
     */
    orderBy?: bearingsOrderByWithRelationInput | bearingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bearingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bearings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bearings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bearings
    **/
    _count?: true | BearingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BearingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BearingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BearingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BearingsMaxAggregateInputType
  }

  export type GetBearingsAggregateType<T extends BearingsAggregateArgs> = {
        [P in keyof T & keyof AggregateBearings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBearings[P]>
      : GetScalarType<T[P], AggregateBearings[P]>
  }




  export type bearingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bearingsWhereInput
    orderBy?: bearingsOrderByWithAggregationInput | bearingsOrderByWithAggregationInput[]
    by: BearingsScalarFieldEnum[] | BearingsScalarFieldEnum
    having?: bearingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BearingsCountAggregateInputType | true
    _avg?: BearingsAvgAggregateInputType
    _sum?: BearingsSumAggregateInputType
    _min?: BearingsMinAggregateInputType
    _max?: BearingsMaxAggregateInputType
  }

  export type BearingsGroupByOutputType = {
    id: number
    code: string
    type: string | null
    inner_d: Decimal
    outer_D: Decimal
    width_B: Decimal
    C: Decimal | null
    C0: Decimal | null
    is_active: boolean | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: BearingsCountAggregateOutputType | null
    _avg: BearingsAvgAggregateOutputType | null
    _sum: BearingsSumAggregateOutputType | null
    _min: BearingsMinAggregateOutputType | null
    _max: BearingsMaxAggregateOutputType | null
  }

  type GetBearingsGroupByPayload<T extends bearingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BearingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BearingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BearingsGroupByOutputType[P]>
            : GetScalarType<T[P], BearingsGroupByOutputType[P]>
        }
      >
    >


  export type bearingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    type?: boolean
    inner_d?: boolean
    outer_D?: boolean
    width_B?: boolean
    C?: boolean
    C0?: boolean
    is_active?: boolean
    deletedBy?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["bearings"]>



  export type bearingsSelectScalar = {
    id?: boolean
    code?: boolean
    type?: boolean
    inner_d?: boolean
    outer_D?: boolean
    width_B?: boolean
    C?: boolean
    C0?: boolean
    is_active?: boolean
    deletedBy?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type bearingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "type" | "inner_d" | "outer_D" | "width_B" | "C" | "C0" | "is_active" | "deletedBy" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["bearings"]>

  export type $bearingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bearings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      type: string | null
      inner_d: Prisma.Decimal
      outer_D: Prisma.Decimal
      width_B: Prisma.Decimal
      C: Prisma.Decimal | null
      C0: Prisma.Decimal | null
      is_active: boolean | null
      deletedBy: number | null
      isDeleted: boolean | null
      deletedAt: Date | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["bearings"]>
    composites: {}
  }

  type bearingsGetPayload<S extends boolean | null | undefined | bearingsDefaultArgs> = $Result.GetResult<Prisma.$bearingsPayload, S>

  type bearingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<bearingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BearingsCountAggregateInputType | true
    }

  export interface bearingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bearings'], meta: { name: 'bearings' } }
    /**
     * Find zero or one Bearings that matches the filter.
     * @param {bearingsFindUniqueArgs} args - Arguments to find a Bearings
     * @example
     * // Get one Bearings
     * const bearings = await prisma.bearings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bearingsFindUniqueArgs>(args: SelectSubset<T, bearingsFindUniqueArgs<ExtArgs>>): Prisma__bearingsClient<$Result.GetResult<Prisma.$bearingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bearings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bearingsFindUniqueOrThrowArgs} args - Arguments to find a Bearings
     * @example
     * // Get one Bearings
     * const bearings = await prisma.bearings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bearingsFindUniqueOrThrowArgs>(args: SelectSubset<T, bearingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bearingsClient<$Result.GetResult<Prisma.$bearingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bearings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bearingsFindFirstArgs} args - Arguments to find a Bearings
     * @example
     * // Get one Bearings
     * const bearings = await prisma.bearings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bearingsFindFirstArgs>(args?: SelectSubset<T, bearingsFindFirstArgs<ExtArgs>>): Prisma__bearingsClient<$Result.GetResult<Prisma.$bearingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bearings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bearingsFindFirstOrThrowArgs} args - Arguments to find a Bearings
     * @example
     * // Get one Bearings
     * const bearings = await prisma.bearings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bearingsFindFirstOrThrowArgs>(args?: SelectSubset<T, bearingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__bearingsClient<$Result.GetResult<Prisma.$bearingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bearings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bearingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bearings
     * const bearings = await prisma.bearings.findMany()
     * 
     * // Get first 10 Bearings
     * const bearings = await prisma.bearings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bearingsWithIdOnly = await prisma.bearings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends bearingsFindManyArgs>(args?: SelectSubset<T, bearingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bearingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bearings.
     * @param {bearingsCreateArgs} args - Arguments to create a Bearings.
     * @example
     * // Create one Bearings
     * const Bearings = await prisma.bearings.create({
     *   data: {
     *     // ... data to create a Bearings
     *   }
     * })
     * 
     */
    create<T extends bearingsCreateArgs>(args: SelectSubset<T, bearingsCreateArgs<ExtArgs>>): Prisma__bearingsClient<$Result.GetResult<Prisma.$bearingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bearings.
     * @param {bearingsCreateManyArgs} args - Arguments to create many Bearings.
     * @example
     * // Create many Bearings
     * const bearings = await prisma.bearings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bearingsCreateManyArgs>(args?: SelectSubset<T, bearingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Bearings.
     * @param {bearingsDeleteArgs} args - Arguments to delete one Bearings.
     * @example
     * // Delete one Bearings
     * const Bearings = await prisma.bearings.delete({
     *   where: {
     *     // ... filter to delete one Bearings
     *   }
     * })
     * 
     */
    delete<T extends bearingsDeleteArgs>(args: SelectSubset<T, bearingsDeleteArgs<ExtArgs>>): Prisma__bearingsClient<$Result.GetResult<Prisma.$bearingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bearings.
     * @param {bearingsUpdateArgs} args - Arguments to update one Bearings.
     * @example
     * // Update one Bearings
     * const bearings = await prisma.bearings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bearingsUpdateArgs>(args: SelectSubset<T, bearingsUpdateArgs<ExtArgs>>): Prisma__bearingsClient<$Result.GetResult<Prisma.$bearingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bearings.
     * @param {bearingsDeleteManyArgs} args - Arguments to filter Bearings to delete.
     * @example
     * // Delete a few Bearings
     * const { count } = await prisma.bearings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bearingsDeleteManyArgs>(args?: SelectSubset<T, bearingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bearings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bearingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bearings
     * const bearings = await prisma.bearings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bearingsUpdateManyArgs>(args: SelectSubset<T, bearingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bearings.
     * @param {bearingsUpsertArgs} args - Arguments to update or create a Bearings.
     * @example
     * // Update or create a Bearings
     * const bearings = await prisma.bearings.upsert({
     *   create: {
     *     // ... data to create a Bearings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bearings we want to update
     *   }
     * })
     */
    upsert<T extends bearingsUpsertArgs>(args: SelectSubset<T, bearingsUpsertArgs<ExtArgs>>): Prisma__bearingsClient<$Result.GetResult<Prisma.$bearingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bearings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bearingsCountArgs} args - Arguments to filter Bearings to count.
     * @example
     * // Count the number of Bearings
     * const count = await prisma.bearings.count({
     *   where: {
     *     // ... the filter for the Bearings we want to count
     *   }
     * })
    **/
    count<T extends bearingsCountArgs>(
      args?: Subset<T, bearingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BearingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bearings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BearingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BearingsAggregateArgs>(args: Subset<T, BearingsAggregateArgs>): Prisma.PrismaPromise<GetBearingsAggregateType<T>>

    /**
     * Group by Bearings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bearingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends bearingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bearingsGroupByArgs['orderBy'] }
        : { orderBy?: bearingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bearingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBearingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bearings model
   */
  readonly fields: bearingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bearings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bearingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bearings model
   */
  interface bearingsFieldRefs {
    readonly id: FieldRef<"bearings", 'Int'>
    readonly code: FieldRef<"bearings", 'String'>
    readonly type: FieldRef<"bearings", 'String'>
    readonly inner_d: FieldRef<"bearings", 'Decimal'>
    readonly outer_D: FieldRef<"bearings", 'Decimal'>
    readonly width_B: FieldRef<"bearings", 'Decimal'>
    readonly C: FieldRef<"bearings", 'Decimal'>
    readonly C0: FieldRef<"bearings", 'Decimal'>
    readonly is_active: FieldRef<"bearings", 'Boolean'>
    readonly deletedBy: FieldRef<"bearings", 'Int'>
    readonly isDeleted: FieldRef<"bearings", 'Boolean'>
    readonly deletedAt: FieldRef<"bearings", 'DateTime'>
    readonly createdAt: FieldRef<"bearings", 'DateTime'>
    readonly updatedAt: FieldRef<"bearings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * bearings findUnique
   */
  export type bearingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bearings
     */
    select?: bearingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bearings
     */
    omit?: bearingsOmit<ExtArgs> | null
    /**
     * Filter, which bearings to fetch.
     */
    where: bearingsWhereUniqueInput
  }

  /**
   * bearings findUniqueOrThrow
   */
  export type bearingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bearings
     */
    select?: bearingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bearings
     */
    omit?: bearingsOmit<ExtArgs> | null
    /**
     * Filter, which bearings to fetch.
     */
    where: bearingsWhereUniqueInput
  }

  /**
   * bearings findFirst
   */
  export type bearingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bearings
     */
    select?: bearingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bearings
     */
    omit?: bearingsOmit<ExtArgs> | null
    /**
     * Filter, which bearings to fetch.
     */
    where?: bearingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bearings to fetch.
     */
    orderBy?: bearingsOrderByWithRelationInput | bearingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bearings.
     */
    cursor?: bearingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bearings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bearings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bearings.
     */
    distinct?: BearingsScalarFieldEnum | BearingsScalarFieldEnum[]
  }

  /**
   * bearings findFirstOrThrow
   */
  export type bearingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bearings
     */
    select?: bearingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bearings
     */
    omit?: bearingsOmit<ExtArgs> | null
    /**
     * Filter, which bearings to fetch.
     */
    where?: bearingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bearings to fetch.
     */
    orderBy?: bearingsOrderByWithRelationInput | bearingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bearings.
     */
    cursor?: bearingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bearings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bearings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bearings.
     */
    distinct?: BearingsScalarFieldEnum | BearingsScalarFieldEnum[]
  }

  /**
   * bearings findMany
   */
  export type bearingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bearings
     */
    select?: bearingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bearings
     */
    omit?: bearingsOmit<ExtArgs> | null
    /**
     * Filter, which bearings to fetch.
     */
    where?: bearingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bearings to fetch.
     */
    orderBy?: bearingsOrderByWithRelationInput | bearingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bearings.
     */
    cursor?: bearingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bearings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bearings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bearings.
     */
    distinct?: BearingsScalarFieldEnum | BearingsScalarFieldEnum[]
  }

  /**
   * bearings create
   */
  export type bearingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bearings
     */
    select?: bearingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bearings
     */
    omit?: bearingsOmit<ExtArgs> | null
    /**
     * The data needed to create a bearings.
     */
    data: XOR<bearingsCreateInput, bearingsUncheckedCreateInput>
  }

  /**
   * bearings createMany
   */
  export type bearingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bearings.
     */
    data: bearingsCreateManyInput | bearingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bearings update
   */
  export type bearingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bearings
     */
    select?: bearingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bearings
     */
    omit?: bearingsOmit<ExtArgs> | null
    /**
     * The data needed to update a bearings.
     */
    data: XOR<bearingsUpdateInput, bearingsUncheckedUpdateInput>
    /**
     * Choose, which bearings to update.
     */
    where: bearingsWhereUniqueInput
  }

  /**
   * bearings updateMany
   */
  export type bearingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bearings.
     */
    data: XOR<bearingsUpdateManyMutationInput, bearingsUncheckedUpdateManyInput>
    /**
     * Filter which bearings to update
     */
    where?: bearingsWhereInput
    /**
     * Limit how many bearings to update.
     */
    limit?: number
  }

  /**
   * bearings upsert
   */
  export type bearingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bearings
     */
    select?: bearingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bearings
     */
    omit?: bearingsOmit<ExtArgs> | null
    /**
     * The filter to search for the bearings to update in case it exists.
     */
    where: bearingsWhereUniqueInput
    /**
     * In case the bearings found by the `where` argument doesn't exist, create a new bearings with this data.
     */
    create: XOR<bearingsCreateInput, bearingsUncheckedCreateInput>
    /**
     * In case the bearings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bearingsUpdateInput, bearingsUncheckedUpdateInput>
  }

  /**
   * bearings delete
   */
  export type bearingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bearings
     */
    select?: bearingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bearings
     */
    omit?: bearingsOmit<ExtArgs> | null
    /**
     * Filter which bearings to delete.
     */
    where: bearingsWhereUniqueInput
  }

  /**
   * bearings deleteMany
   */
  export type bearingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bearings to delete
     */
    where?: bearingsWhereInput
    /**
     * Limit how many bearings to delete.
     */
    limit?: number
  }

  /**
   * bearings without action
   */
  export type bearingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bearings
     */
    select?: bearingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bearings
     */
    omit?: bearingsOmit<ExtArgs> | null
  }


  /**
   * Model chains
   */

  export type AggregateChains = {
    _count: ChainsCountAggregateOutputType | null
    _avg: ChainsAvgAggregateOutputType | null
    _sum: ChainsSumAggregateOutputType | null
    _min: ChainsMinAggregateOutputType | null
    _max: ChainsMaxAggregateOutputType | null
  }

  export type ChainsAvgAggregateOutputType = {
    id: number | null
    pitch: Decimal | null
    breaking_load: Decimal | null
    mass_per_m: Decimal | null
    deletedBy: number | null
  }

  export type ChainsSumAggregateOutputType = {
    id: number | null
    pitch: Decimal | null
    breaking_load: Decimal | null
    mass_per_m: Decimal | null
    deletedBy: number | null
  }

  export type ChainsMinAggregateOutputType = {
    id: number | null
    pitch: Decimal | null
    breaking_load: Decimal | null
    mass_per_m: Decimal | null
    is_active: boolean | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChainsMaxAggregateOutputType = {
    id: number | null
    pitch: Decimal | null
    breaking_load: Decimal | null
    mass_per_m: Decimal | null
    is_active: boolean | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChainsCountAggregateOutputType = {
    id: number
    pitch: number
    breaking_load: number
    mass_per_m: number
    is_active: number
    deletedBy: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChainsAvgAggregateInputType = {
    id?: true
    pitch?: true
    breaking_load?: true
    mass_per_m?: true
    deletedBy?: true
  }

  export type ChainsSumAggregateInputType = {
    id?: true
    pitch?: true
    breaking_load?: true
    mass_per_m?: true
    deletedBy?: true
  }

  export type ChainsMinAggregateInputType = {
    id?: true
    pitch?: true
    breaking_load?: true
    mass_per_m?: true
    is_active?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChainsMaxAggregateInputType = {
    id?: true
    pitch?: true
    breaking_load?: true
    mass_per_m?: true
    is_active?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChainsCountAggregateInputType = {
    id?: true
    pitch?: true
    breaking_load?: true
    mass_per_m?: true
    is_active?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChainsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chains to aggregate.
     */
    where?: chainsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chains to fetch.
     */
    orderBy?: chainsOrderByWithRelationInput | chainsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: chainsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned chains
    **/
    _count?: true | ChainsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChainsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChainsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChainsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChainsMaxAggregateInputType
  }

  export type GetChainsAggregateType<T extends ChainsAggregateArgs> = {
        [P in keyof T & keyof AggregateChains]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChains[P]>
      : GetScalarType<T[P], AggregateChains[P]>
  }




  export type chainsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chainsWhereInput
    orderBy?: chainsOrderByWithAggregationInput | chainsOrderByWithAggregationInput[]
    by: ChainsScalarFieldEnum[] | ChainsScalarFieldEnum
    having?: chainsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChainsCountAggregateInputType | true
    _avg?: ChainsAvgAggregateInputType
    _sum?: ChainsSumAggregateInputType
    _min?: ChainsMinAggregateInputType
    _max?: ChainsMaxAggregateInputType
  }

  export type ChainsGroupByOutputType = {
    id: number
    pitch: Decimal
    breaking_load: Decimal | null
    mass_per_m: Decimal | null
    is_active: boolean | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: ChainsCountAggregateOutputType | null
    _avg: ChainsAvgAggregateOutputType | null
    _sum: ChainsSumAggregateOutputType | null
    _min: ChainsMinAggregateOutputType | null
    _max: ChainsMaxAggregateOutputType | null
  }

  type GetChainsGroupByPayload<T extends chainsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChainsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChainsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChainsGroupByOutputType[P]>
            : GetScalarType<T[P], ChainsGroupByOutputType[P]>
        }
      >
    >


  export type chainsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pitch?: boolean
    breaking_load?: boolean
    mass_per_m?: boolean
    is_active?: boolean
    deletedBy?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chains"]>



  export type chainsSelectScalar = {
    id?: boolean
    pitch?: boolean
    breaking_load?: boolean
    mass_per_m?: boolean
    is_active?: boolean
    deletedBy?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type chainsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pitch" | "breaking_load" | "mass_per_m" | "is_active" | "deletedBy" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["chains"]>

  export type $chainsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "chains"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pitch: Prisma.Decimal
      breaking_load: Prisma.Decimal | null
      mass_per_m: Prisma.Decimal | null
      is_active: boolean | null
      deletedBy: number | null
      isDeleted: boolean | null
      deletedAt: Date | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["chains"]>
    composites: {}
  }

  type chainsGetPayload<S extends boolean | null | undefined | chainsDefaultArgs> = $Result.GetResult<Prisma.$chainsPayload, S>

  type chainsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<chainsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChainsCountAggregateInputType | true
    }

  export interface chainsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['chains'], meta: { name: 'chains' } }
    /**
     * Find zero or one Chains that matches the filter.
     * @param {chainsFindUniqueArgs} args - Arguments to find a Chains
     * @example
     * // Get one Chains
     * const chains = await prisma.chains.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends chainsFindUniqueArgs>(args: SelectSubset<T, chainsFindUniqueArgs<ExtArgs>>): Prisma__chainsClient<$Result.GetResult<Prisma.$chainsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chains that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {chainsFindUniqueOrThrowArgs} args - Arguments to find a Chains
     * @example
     * // Get one Chains
     * const chains = await prisma.chains.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends chainsFindUniqueOrThrowArgs>(args: SelectSubset<T, chainsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__chainsClient<$Result.GetResult<Prisma.$chainsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chainsFindFirstArgs} args - Arguments to find a Chains
     * @example
     * // Get one Chains
     * const chains = await prisma.chains.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends chainsFindFirstArgs>(args?: SelectSubset<T, chainsFindFirstArgs<ExtArgs>>): Prisma__chainsClient<$Result.GetResult<Prisma.$chainsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chains that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chainsFindFirstOrThrowArgs} args - Arguments to find a Chains
     * @example
     * // Get one Chains
     * const chains = await prisma.chains.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends chainsFindFirstOrThrowArgs>(args?: SelectSubset<T, chainsFindFirstOrThrowArgs<ExtArgs>>): Prisma__chainsClient<$Result.GetResult<Prisma.$chainsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chainsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chains
     * const chains = await prisma.chains.findMany()
     * 
     * // Get first 10 Chains
     * const chains = await prisma.chains.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chainsWithIdOnly = await prisma.chains.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends chainsFindManyArgs>(args?: SelectSubset<T, chainsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chainsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chains.
     * @param {chainsCreateArgs} args - Arguments to create a Chains.
     * @example
     * // Create one Chains
     * const Chains = await prisma.chains.create({
     *   data: {
     *     // ... data to create a Chains
     *   }
     * })
     * 
     */
    create<T extends chainsCreateArgs>(args: SelectSubset<T, chainsCreateArgs<ExtArgs>>): Prisma__chainsClient<$Result.GetResult<Prisma.$chainsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chains.
     * @param {chainsCreateManyArgs} args - Arguments to create many Chains.
     * @example
     * // Create many Chains
     * const chains = await prisma.chains.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends chainsCreateManyArgs>(args?: SelectSubset<T, chainsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Chains.
     * @param {chainsDeleteArgs} args - Arguments to delete one Chains.
     * @example
     * // Delete one Chains
     * const Chains = await prisma.chains.delete({
     *   where: {
     *     // ... filter to delete one Chains
     *   }
     * })
     * 
     */
    delete<T extends chainsDeleteArgs>(args: SelectSubset<T, chainsDeleteArgs<ExtArgs>>): Prisma__chainsClient<$Result.GetResult<Prisma.$chainsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chains.
     * @param {chainsUpdateArgs} args - Arguments to update one Chains.
     * @example
     * // Update one Chains
     * const chains = await prisma.chains.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends chainsUpdateArgs>(args: SelectSubset<T, chainsUpdateArgs<ExtArgs>>): Prisma__chainsClient<$Result.GetResult<Prisma.$chainsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chains.
     * @param {chainsDeleteManyArgs} args - Arguments to filter Chains to delete.
     * @example
     * // Delete a few Chains
     * const { count } = await prisma.chains.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends chainsDeleteManyArgs>(args?: SelectSubset<T, chainsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chainsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chains
     * const chains = await prisma.chains.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends chainsUpdateManyArgs>(args: SelectSubset<T, chainsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Chains.
     * @param {chainsUpsertArgs} args - Arguments to update or create a Chains.
     * @example
     * // Update or create a Chains
     * const chains = await prisma.chains.upsert({
     *   create: {
     *     // ... data to create a Chains
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chains we want to update
     *   }
     * })
     */
    upsert<T extends chainsUpsertArgs>(args: SelectSubset<T, chainsUpsertArgs<ExtArgs>>): Prisma__chainsClient<$Result.GetResult<Prisma.$chainsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chainsCountArgs} args - Arguments to filter Chains to count.
     * @example
     * // Count the number of Chains
     * const count = await prisma.chains.count({
     *   where: {
     *     // ... the filter for the Chains we want to count
     *   }
     * })
    **/
    count<T extends chainsCountArgs>(
      args?: Subset<T, chainsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChainsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChainsAggregateArgs>(args: Subset<T, ChainsAggregateArgs>): Prisma.PrismaPromise<GetChainsAggregateType<T>>

    /**
     * Group by Chains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chainsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends chainsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: chainsGroupByArgs['orderBy'] }
        : { orderBy?: chainsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, chainsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChainsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the chains model
   */
  readonly fields: chainsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for chains.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__chainsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the chains model
   */
  interface chainsFieldRefs {
    readonly id: FieldRef<"chains", 'Int'>
    readonly pitch: FieldRef<"chains", 'Decimal'>
    readonly breaking_load: FieldRef<"chains", 'Decimal'>
    readonly mass_per_m: FieldRef<"chains", 'Decimal'>
    readonly is_active: FieldRef<"chains", 'Boolean'>
    readonly deletedBy: FieldRef<"chains", 'Int'>
    readonly isDeleted: FieldRef<"chains", 'Boolean'>
    readonly deletedAt: FieldRef<"chains", 'DateTime'>
    readonly createdAt: FieldRef<"chains", 'DateTime'>
    readonly updatedAt: FieldRef<"chains", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * chains findUnique
   */
  export type chainsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chains
     */
    select?: chainsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chains
     */
    omit?: chainsOmit<ExtArgs> | null
    /**
     * Filter, which chains to fetch.
     */
    where: chainsWhereUniqueInput
  }

  /**
   * chains findUniqueOrThrow
   */
  export type chainsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chains
     */
    select?: chainsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chains
     */
    omit?: chainsOmit<ExtArgs> | null
    /**
     * Filter, which chains to fetch.
     */
    where: chainsWhereUniqueInput
  }

  /**
   * chains findFirst
   */
  export type chainsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chains
     */
    select?: chainsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chains
     */
    omit?: chainsOmit<ExtArgs> | null
    /**
     * Filter, which chains to fetch.
     */
    where?: chainsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chains to fetch.
     */
    orderBy?: chainsOrderByWithRelationInput | chainsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chains.
     */
    cursor?: chainsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chains.
     */
    distinct?: ChainsScalarFieldEnum | ChainsScalarFieldEnum[]
  }

  /**
   * chains findFirstOrThrow
   */
  export type chainsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chains
     */
    select?: chainsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chains
     */
    omit?: chainsOmit<ExtArgs> | null
    /**
     * Filter, which chains to fetch.
     */
    where?: chainsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chains to fetch.
     */
    orderBy?: chainsOrderByWithRelationInput | chainsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chains.
     */
    cursor?: chainsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chains.
     */
    distinct?: ChainsScalarFieldEnum | ChainsScalarFieldEnum[]
  }

  /**
   * chains findMany
   */
  export type chainsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chains
     */
    select?: chainsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chains
     */
    omit?: chainsOmit<ExtArgs> | null
    /**
     * Filter, which chains to fetch.
     */
    where?: chainsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chains to fetch.
     */
    orderBy?: chainsOrderByWithRelationInput | chainsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing chains.
     */
    cursor?: chainsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chains.
     */
    distinct?: ChainsScalarFieldEnum | ChainsScalarFieldEnum[]
  }

  /**
   * chains create
   */
  export type chainsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chains
     */
    select?: chainsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chains
     */
    omit?: chainsOmit<ExtArgs> | null
    /**
     * The data needed to create a chains.
     */
    data: XOR<chainsCreateInput, chainsUncheckedCreateInput>
  }

  /**
   * chains createMany
   */
  export type chainsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many chains.
     */
    data: chainsCreateManyInput | chainsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * chains update
   */
  export type chainsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chains
     */
    select?: chainsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chains
     */
    omit?: chainsOmit<ExtArgs> | null
    /**
     * The data needed to update a chains.
     */
    data: XOR<chainsUpdateInput, chainsUncheckedUpdateInput>
    /**
     * Choose, which chains to update.
     */
    where: chainsWhereUniqueInput
  }

  /**
   * chains updateMany
   */
  export type chainsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update chains.
     */
    data: XOR<chainsUpdateManyMutationInput, chainsUncheckedUpdateManyInput>
    /**
     * Filter which chains to update
     */
    where?: chainsWhereInput
    /**
     * Limit how many chains to update.
     */
    limit?: number
  }

  /**
   * chains upsert
   */
  export type chainsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chains
     */
    select?: chainsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chains
     */
    omit?: chainsOmit<ExtArgs> | null
    /**
     * The filter to search for the chains to update in case it exists.
     */
    where: chainsWhereUniqueInput
    /**
     * In case the chains found by the `where` argument doesn't exist, create a new chains with this data.
     */
    create: XOR<chainsCreateInput, chainsUncheckedCreateInput>
    /**
     * In case the chains was found with the provided `where` argument, update it with this data.
     */
    update: XOR<chainsUpdateInput, chainsUncheckedUpdateInput>
  }

  /**
   * chains delete
   */
  export type chainsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chains
     */
    select?: chainsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chains
     */
    omit?: chainsOmit<ExtArgs> | null
    /**
     * Filter which chains to delete.
     */
    where: chainsWhereUniqueInput
  }

  /**
   * chains deleteMany
   */
  export type chainsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chains to delete
     */
    where?: chainsWhereInput
    /**
     * Limit how many chains to delete.
     */
    limit?: number
  }

  /**
   * chains without action
   */
  export type chainsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chains
     */
    select?: chainsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chains
     */
    omit?: chainsOmit<ExtArgs> | null
  }


  /**
   * Model motors
   */

  export type AggregateMotors = {
    _count: MotorsCountAggregateOutputType | null
    _avg: MotorsAvgAggregateOutputType | null
    _sum: MotorsSumAggregateOutputType | null
    _min: MotorsMinAggregateOutputType | null
    _max: MotorsMaxAggregateOutputType | null
  }

  export type MotorsAvgAggregateOutputType = {
    id: number | null
    P_dm: Decimal | null
    n_dm: number | null
    cos_phi: Decimal | null
    eta_motor: Decimal | null
    mass_kg: Decimal | null
    price: Decimal | null
    deletedBy: number | null
  }

  export type MotorsSumAggregateOutputType = {
    id: number | null
    P_dm: Decimal | null
    n_dm: number | null
    cos_phi: Decimal | null
    eta_motor: Decimal | null
    mass_kg: Decimal | null
    price: Decimal | null
    deletedBy: number | null
  }

  export type MotorsMinAggregateOutputType = {
    id: number | null
    code: string | null
    P_dm: Decimal | null
    n_dm: number | null
    cos_phi: Decimal | null
    eta_motor: Decimal | null
    mass_kg: Decimal | null
    price: Decimal | null
    is_active: boolean | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MotorsMaxAggregateOutputType = {
    id: number | null
    code: string | null
    P_dm: Decimal | null
    n_dm: number | null
    cos_phi: Decimal | null
    eta_motor: Decimal | null
    mass_kg: Decimal | null
    price: Decimal | null
    is_active: boolean | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MotorsCountAggregateOutputType = {
    id: number
    code: number
    P_dm: number
    n_dm: number
    cos_phi: number
    eta_motor: number
    mass_kg: number
    price: number
    is_active: number
    deletedBy: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MotorsAvgAggregateInputType = {
    id?: true
    P_dm?: true
    n_dm?: true
    cos_phi?: true
    eta_motor?: true
    mass_kg?: true
    price?: true
    deletedBy?: true
  }

  export type MotorsSumAggregateInputType = {
    id?: true
    P_dm?: true
    n_dm?: true
    cos_phi?: true
    eta_motor?: true
    mass_kg?: true
    price?: true
    deletedBy?: true
  }

  export type MotorsMinAggregateInputType = {
    id?: true
    code?: true
    P_dm?: true
    n_dm?: true
    cos_phi?: true
    eta_motor?: true
    mass_kg?: true
    price?: true
    is_active?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MotorsMaxAggregateInputType = {
    id?: true
    code?: true
    P_dm?: true
    n_dm?: true
    cos_phi?: true
    eta_motor?: true
    mass_kg?: true
    price?: true
    is_active?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MotorsCountAggregateInputType = {
    id?: true
    code?: true
    P_dm?: true
    n_dm?: true
    cos_phi?: true
    eta_motor?: true
    mass_kg?: true
    price?: true
    is_active?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MotorsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which motors to aggregate.
     */
    where?: motorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of motors to fetch.
     */
    orderBy?: motorsOrderByWithRelationInput | motorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: motorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` motors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` motors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned motors
    **/
    _count?: true | MotorsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MotorsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MotorsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MotorsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MotorsMaxAggregateInputType
  }

  export type GetMotorsAggregateType<T extends MotorsAggregateArgs> = {
        [P in keyof T & keyof AggregateMotors]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMotors[P]>
      : GetScalarType<T[P], AggregateMotors[P]>
  }




  export type motorsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: motorsWhereInput
    orderBy?: motorsOrderByWithAggregationInput | motorsOrderByWithAggregationInput[]
    by: MotorsScalarFieldEnum[] | MotorsScalarFieldEnum
    having?: motorsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MotorsCountAggregateInputType | true
    _avg?: MotorsAvgAggregateInputType
    _sum?: MotorsSumAggregateInputType
    _min?: MotorsMinAggregateInputType
    _max?: MotorsMaxAggregateInputType
  }

  export type MotorsGroupByOutputType = {
    id: number
    code: string
    P_dm: Decimal
    n_dm: number
    cos_phi: Decimal | null
    eta_motor: Decimal | null
    mass_kg: Decimal | null
    price: Decimal | null
    is_active: boolean | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: MotorsCountAggregateOutputType | null
    _avg: MotorsAvgAggregateOutputType | null
    _sum: MotorsSumAggregateOutputType | null
    _min: MotorsMinAggregateOutputType | null
    _max: MotorsMaxAggregateOutputType | null
  }

  type GetMotorsGroupByPayload<T extends motorsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MotorsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MotorsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MotorsGroupByOutputType[P]>
            : GetScalarType<T[P], MotorsGroupByOutputType[P]>
        }
      >
    >


  export type motorsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    P_dm?: boolean
    n_dm?: boolean
    cos_phi?: boolean
    eta_motor?: boolean
    mass_kg?: boolean
    price?: boolean
    is_active?: boolean
    deletedBy?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projects?: boolean | motors$projectsArgs<ExtArgs>
    _count?: boolean | MotorsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["motors"]>



  export type motorsSelectScalar = {
    id?: boolean
    code?: boolean
    P_dm?: boolean
    n_dm?: boolean
    cos_phi?: boolean
    eta_motor?: boolean
    mass_kg?: boolean
    price?: boolean
    is_active?: boolean
    deletedBy?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type motorsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "P_dm" | "n_dm" | "cos_phi" | "eta_motor" | "mass_kg" | "price" | "is_active" | "deletedBy" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["motors"]>
  export type motorsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | motors$projectsArgs<ExtArgs>
    _count?: boolean | MotorsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $motorsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "motors"
    objects: {
      projects: Prisma.$projectsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      P_dm: Prisma.Decimal
      n_dm: number
      cos_phi: Prisma.Decimal | null
      eta_motor: Prisma.Decimal | null
      mass_kg: Prisma.Decimal | null
      price: Prisma.Decimal | null
      is_active: boolean | null
      deletedBy: number | null
      isDeleted: boolean | null
      deletedAt: Date | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["motors"]>
    composites: {}
  }

  type motorsGetPayload<S extends boolean | null | undefined | motorsDefaultArgs> = $Result.GetResult<Prisma.$motorsPayload, S>

  type motorsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<motorsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MotorsCountAggregateInputType | true
    }

  export interface motorsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['motors'], meta: { name: 'motors' } }
    /**
     * Find zero or one Motors that matches the filter.
     * @param {motorsFindUniqueArgs} args - Arguments to find a Motors
     * @example
     * // Get one Motors
     * const motors = await prisma.motors.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends motorsFindUniqueArgs>(args: SelectSubset<T, motorsFindUniqueArgs<ExtArgs>>): Prisma__motorsClient<$Result.GetResult<Prisma.$motorsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Motors that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {motorsFindUniqueOrThrowArgs} args - Arguments to find a Motors
     * @example
     * // Get one Motors
     * const motors = await prisma.motors.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends motorsFindUniqueOrThrowArgs>(args: SelectSubset<T, motorsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__motorsClient<$Result.GetResult<Prisma.$motorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Motors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {motorsFindFirstArgs} args - Arguments to find a Motors
     * @example
     * // Get one Motors
     * const motors = await prisma.motors.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends motorsFindFirstArgs>(args?: SelectSubset<T, motorsFindFirstArgs<ExtArgs>>): Prisma__motorsClient<$Result.GetResult<Prisma.$motorsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Motors that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {motorsFindFirstOrThrowArgs} args - Arguments to find a Motors
     * @example
     * // Get one Motors
     * const motors = await prisma.motors.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends motorsFindFirstOrThrowArgs>(args?: SelectSubset<T, motorsFindFirstOrThrowArgs<ExtArgs>>): Prisma__motorsClient<$Result.GetResult<Prisma.$motorsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Motors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {motorsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Motors
     * const motors = await prisma.motors.findMany()
     * 
     * // Get first 10 Motors
     * const motors = await prisma.motors.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const motorsWithIdOnly = await prisma.motors.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends motorsFindManyArgs>(args?: SelectSubset<T, motorsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$motorsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Motors.
     * @param {motorsCreateArgs} args - Arguments to create a Motors.
     * @example
     * // Create one Motors
     * const Motors = await prisma.motors.create({
     *   data: {
     *     // ... data to create a Motors
     *   }
     * })
     * 
     */
    create<T extends motorsCreateArgs>(args: SelectSubset<T, motorsCreateArgs<ExtArgs>>): Prisma__motorsClient<$Result.GetResult<Prisma.$motorsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Motors.
     * @param {motorsCreateManyArgs} args - Arguments to create many Motors.
     * @example
     * // Create many Motors
     * const motors = await prisma.motors.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends motorsCreateManyArgs>(args?: SelectSubset<T, motorsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Motors.
     * @param {motorsDeleteArgs} args - Arguments to delete one Motors.
     * @example
     * // Delete one Motors
     * const Motors = await prisma.motors.delete({
     *   where: {
     *     // ... filter to delete one Motors
     *   }
     * })
     * 
     */
    delete<T extends motorsDeleteArgs>(args: SelectSubset<T, motorsDeleteArgs<ExtArgs>>): Prisma__motorsClient<$Result.GetResult<Prisma.$motorsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Motors.
     * @param {motorsUpdateArgs} args - Arguments to update one Motors.
     * @example
     * // Update one Motors
     * const motors = await prisma.motors.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends motorsUpdateArgs>(args: SelectSubset<T, motorsUpdateArgs<ExtArgs>>): Prisma__motorsClient<$Result.GetResult<Prisma.$motorsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Motors.
     * @param {motorsDeleteManyArgs} args - Arguments to filter Motors to delete.
     * @example
     * // Delete a few Motors
     * const { count } = await prisma.motors.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends motorsDeleteManyArgs>(args?: SelectSubset<T, motorsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Motors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {motorsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Motors
     * const motors = await prisma.motors.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends motorsUpdateManyArgs>(args: SelectSubset<T, motorsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Motors.
     * @param {motorsUpsertArgs} args - Arguments to update or create a Motors.
     * @example
     * // Update or create a Motors
     * const motors = await prisma.motors.upsert({
     *   create: {
     *     // ... data to create a Motors
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Motors we want to update
     *   }
     * })
     */
    upsert<T extends motorsUpsertArgs>(args: SelectSubset<T, motorsUpsertArgs<ExtArgs>>): Prisma__motorsClient<$Result.GetResult<Prisma.$motorsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Motors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {motorsCountArgs} args - Arguments to filter Motors to count.
     * @example
     * // Count the number of Motors
     * const count = await prisma.motors.count({
     *   where: {
     *     // ... the filter for the Motors we want to count
     *   }
     * })
    **/
    count<T extends motorsCountArgs>(
      args?: Subset<T, motorsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MotorsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Motors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MotorsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MotorsAggregateArgs>(args: Subset<T, MotorsAggregateArgs>): Prisma.PrismaPromise<GetMotorsAggregateType<T>>

    /**
     * Group by Motors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {motorsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends motorsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: motorsGroupByArgs['orderBy'] }
        : { orderBy?: motorsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, motorsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMotorsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the motors model
   */
  readonly fields: motorsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for motors.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__motorsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends motors$projectsArgs<ExtArgs> = {}>(args?: Subset<T, motors$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the motors model
   */
  interface motorsFieldRefs {
    readonly id: FieldRef<"motors", 'Int'>
    readonly code: FieldRef<"motors", 'String'>
    readonly P_dm: FieldRef<"motors", 'Decimal'>
    readonly n_dm: FieldRef<"motors", 'Int'>
    readonly cos_phi: FieldRef<"motors", 'Decimal'>
    readonly eta_motor: FieldRef<"motors", 'Decimal'>
    readonly mass_kg: FieldRef<"motors", 'Decimal'>
    readonly price: FieldRef<"motors", 'Decimal'>
    readonly is_active: FieldRef<"motors", 'Boolean'>
    readonly deletedBy: FieldRef<"motors", 'Int'>
    readonly isDeleted: FieldRef<"motors", 'Boolean'>
    readonly deletedAt: FieldRef<"motors", 'DateTime'>
    readonly createdAt: FieldRef<"motors", 'DateTime'>
    readonly updatedAt: FieldRef<"motors", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * motors findUnique
   */
  export type motorsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the motors
     */
    select?: motorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the motors
     */
    omit?: motorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: motorsInclude<ExtArgs> | null
    /**
     * Filter, which motors to fetch.
     */
    where: motorsWhereUniqueInput
  }

  /**
   * motors findUniqueOrThrow
   */
  export type motorsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the motors
     */
    select?: motorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the motors
     */
    omit?: motorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: motorsInclude<ExtArgs> | null
    /**
     * Filter, which motors to fetch.
     */
    where: motorsWhereUniqueInput
  }

  /**
   * motors findFirst
   */
  export type motorsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the motors
     */
    select?: motorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the motors
     */
    omit?: motorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: motorsInclude<ExtArgs> | null
    /**
     * Filter, which motors to fetch.
     */
    where?: motorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of motors to fetch.
     */
    orderBy?: motorsOrderByWithRelationInput | motorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for motors.
     */
    cursor?: motorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` motors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` motors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of motors.
     */
    distinct?: MotorsScalarFieldEnum | MotorsScalarFieldEnum[]
  }

  /**
   * motors findFirstOrThrow
   */
  export type motorsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the motors
     */
    select?: motorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the motors
     */
    omit?: motorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: motorsInclude<ExtArgs> | null
    /**
     * Filter, which motors to fetch.
     */
    where?: motorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of motors to fetch.
     */
    orderBy?: motorsOrderByWithRelationInput | motorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for motors.
     */
    cursor?: motorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` motors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` motors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of motors.
     */
    distinct?: MotorsScalarFieldEnum | MotorsScalarFieldEnum[]
  }

  /**
   * motors findMany
   */
  export type motorsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the motors
     */
    select?: motorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the motors
     */
    omit?: motorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: motorsInclude<ExtArgs> | null
    /**
     * Filter, which motors to fetch.
     */
    where?: motorsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of motors to fetch.
     */
    orderBy?: motorsOrderByWithRelationInput | motorsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing motors.
     */
    cursor?: motorsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` motors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` motors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of motors.
     */
    distinct?: MotorsScalarFieldEnum | MotorsScalarFieldEnum[]
  }

  /**
   * motors create
   */
  export type motorsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the motors
     */
    select?: motorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the motors
     */
    omit?: motorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: motorsInclude<ExtArgs> | null
    /**
     * The data needed to create a motors.
     */
    data: XOR<motorsCreateInput, motorsUncheckedCreateInput>
  }

  /**
   * motors createMany
   */
  export type motorsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many motors.
     */
    data: motorsCreateManyInput | motorsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * motors update
   */
  export type motorsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the motors
     */
    select?: motorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the motors
     */
    omit?: motorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: motorsInclude<ExtArgs> | null
    /**
     * The data needed to update a motors.
     */
    data: XOR<motorsUpdateInput, motorsUncheckedUpdateInput>
    /**
     * Choose, which motors to update.
     */
    where: motorsWhereUniqueInput
  }

  /**
   * motors updateMany
   */
  export type motorsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update motors.
     */
    data: XOR<motorsUpdateManyMutationInput, motorsUncheckedUpdateManyInput>
    /**
     * Filter which motors to update
     */
    where?: motorsWhereInput
    /**
     * Limit how many motors to update.
     */
    limit?: number
  }

  /**
   * motors upsert
   */
  export type motorsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the motors
     */
    select?: motorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the motors
     */
    omit?: motorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: motorsInclude<ExtArgs> | null
    /**
     * The filter to search for the motors to update in case it exists.
     */
    where: motorsWhereUniqueInput
    /**
     * In case the motors found by the `where` argument doesn't exist, create a new motors with this data.
     */
    create: XOR<motorsCreateInput, motorsUncheckedCreateInput>
    /**
     * In case the motors was found with the provided `where` argument, update it with this data.
     */
    update: XOR<motorsUpdateInput, motorsUncheckedUpdateInput>
  }

  /**
   * motors delete
   */
  export type motorsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the motors
     */
    select?: motorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the motors
     */
    omit?: motorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: motorsInclude<ExtArgs> | null
    /**
     * Filter which motors to delete.
     */
    where: motorsWhereUniqueInput
  }

  /**
   * motors deleteMany
   */
  export type motorsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which motors to delete
     */
    where?: motorsWhereInput
    /**
     * Limit how many motors to delete.
     */
    limit?: number
  }

  /**
   * motors.projects
   */
  export type motors$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    where?: projectsWhereInput
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    cursor?: projectsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * motors without action
   */
  export type motorsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the motors
     */
    select?: motorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the motors
     */
    omit?: motorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: motorsInclude<ExtArgs> | null
  }


  /**
   * Model projects
   */

  export type AggregateProjects = {
    _count: ProjectsCountAggregateOutputType | null
    _avg: ProjectsAvgAggregateOutputType | null
    _sum: ProjectsSumAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  export type ProjectsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    input_P: Decimal | null
    input_n_ct: Decimal | null
    input_L: Decimal | null
    efficiency: Decimal | null
    Pct: Decimal | null
    total_ratio: Decimal | null
    safety_factor: Decimal | null
    selected_motor_id: number | null
    deletedBy: number | null
  }

  export type ProjectsSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    input_P: Decimal | null
    input_n_ct: Decimal | null
    input_L: Decimal | null
    efficiency: Decimal | null
    Pct: Decimal | null
    total_ratio: Decimal | null
    safety_factor: Decimal | null
    selected_motor_id: number | null
    deletedBy: number | null
  }

  export type ProjectsMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    name: string | null
    input_P: Decimal | null
    input_n_ct: Decimal | null
    input_L: Decimal | null
    efficiency: Decimal | null
    Pct: Decimal | null
    total_ratio: Decimal | null
    safety_factor: Decimal | null
    selected_motor_id: number | null
    step: $Enums.projects_step | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectsMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    name: string | null
    input_P: Decimal | null
    input_n_ct: Decimal | null
    input_L: Decimal | null
    efficiency: Decimal | null
    Pct: Decimal | null
    total_ratio: Decimal | null
    safety_factor: Decimal | null
    selected_motor_id: number | null
    step: $Enums.projects_step | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectsCountAggregateOutputType = {
    id: number
    user_id: number
    name: number
    input_P: number
    input_n_ct: number
    input_L: number
    efficiency: number
    Pct: number
    total_ratio: number
    transmission: number
    shafts: number
    safety_factor: number
    selected_motor_id: number
    selected_motor_snapshot: number
    design_result: number
    step: number
    deletedBy: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectsAvgAggregateInputType = {
    id?: true
    user_id?: true
    input_P?: true
    input_n_ct?: true
    input_L?: true
    efficiency?: true
    Pct?: true
    total_ratio?: true
    safety_factor?: true
    selected_motor_id?: true
    deletedBy?: true
  }

  export type ProjectsSumAggregateInputType = {
    id?: true
    user_id?: true
    input_P?: true
    input_n_ct?: true
    input_L?: true
    efficiency?: true
    Pct?: true
    total_ratio?: true
    safety_factor?: true
    selected_motor_id?: true
    deletedBy?: true
  }

  export type ProjectsMinAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    input_P?: true
    input_n_ct?: true
    input_L?: true
    efficiency?: true
    Pct?: true
    total_ratio?: true
    safety_factor?: true
    selected_motor_id?: true
    step?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectsMaxAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    input_P?: true
    input_n_ct?: true
    input_L?: true
    efficiency?: true
    Pct?: true
    total_ratio?: true
    safety_factor?: true
    selected_motor_id?: true
    step?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectsCountAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    input_P?: true
    input_n_ct?: true
    input_L?: true
    efficiency?: true
    Pct?: true
    total_ratio?: true
    transmission?: true
    shafts?: true
    safety_factor?: true
    selected_motor_id?: true
    selected_motor_snapshot?: true
    design_result?: true
    step?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to aggregate.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned projects
    **/
    _count?: true | ProjectsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectsMaxAggregateInputType
  }

  export type GetProjectsAggregateType<T extends ProjectsAggregateArgs> = {
        [P in keyof T & keyof AggregateProjects]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjects[P]>
      : GetScalarType<T[P], AggregateProjects[P]>
  }




  export type projectsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: projectsWhereInput
    orderBy?: projectsOrderByWithAggregationInput | projectsOrderByWithAggregationInput[]
    by: ProjectsScalarFieldEnum[] | ProjectsScalarFieldEnum
    having?: projectsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectsCountAggregateInputType | true
    _avg?: ProjectsAvgAggregateInputType
    _sum?: ProjectsSumAggregateInputType
    _min?: ProjectsMinAggregateInputType
    _max?: ProjectsMaxAggregateInputType
  }

  export type ProjectsGroupByOutputType = {
    id: number
    user_id: number
    name: string
    input_P: Decimal
    input_n_ct: Decimal
    input_L: Decimal
    efficiency: Decimal | null
    Pct: Decimal | null
    total_ratio: Decimal | null
    transmission: JsonValue | null
    shafts: JsonValue | null
    safety_factor: Decimal | null
    selected_motor_id: number | null
    selected_motor_snapshot: JsonValue | null
    design_result: JsonValue | null
    step: $Enums.projects_step | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: ProjectsCountAggregateOutputType | null
    _avg: ProjectsAvgAggregateOutputType | null
    _sum: ProjectsSumAggregateOutputType | null
    _min: ProjectsMinAggregateOutputType | null
    _max: ProjectsMaxAggregateOutputType | null
  }

  type GetProjectsGroupByPayload<T extends projectsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectsGroupByOutputType[P]>
        }
      >
    >


  export type projectsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    name?: boolean
    input_P?: boolean
    input_n_ct?: boolean
    input_L?: boolean
    efficiency?: boolean
    Pct?: boolean
    total_ratio?: boolean
    transmission?: boolean
    shafts?: boolean
    safety_factor?: boolean
    selected_motor_id?: boolean
    selected_motor_snapshot?: boolean
    design_result?: boolean
    step?: boolean
    deletedBy?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    motors?: boolean | projects$motorsArgs<ExtArgs>
  }, ExtArgs["result"]["projects"]>



  export type projectsSelectScalar = {
    id?: boolean
    user_id?: boolean
    name?: boolean
    input_P?: boolean
    input_n_ct?: boolean
    input_L?: boolean
    efficiency?: boolean
    Pct?: boolean
    total_ratio?: boolean
    transmission?: boolean
    shafts?: boolean
    safety_factor?: boolean
    selected_motor_id?: boolean
    selected_motor_snapshot?: boolean
    design_result?: boolean
    step?: boolean
    deletedBy?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type projectsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "name" | "input_P" | "input_n_ct" | "input_L" | "efficiency" | "Pct" | "total_ratio" | "transmission" | "shafts" | "safety_factor" | "selected_motor_id" | "selected_motor_snapshot" | "design_result" | "step" | "deletedBy" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["projects"]>
  export type projectsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    motors?: boolean | projects$motorsArgs<ExtArgs>
  }

  export type $projectsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "projects"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      motors: Prisma.$motorsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      name: string
      input_P: Prisma.Decimal
      input_n_ct: Prisma.Decimal
      input_L: Prisma.Decimal
      efficiency: Prisma.Decimal | null
      Pct: Prisma.Decimal | null
      total_ratio: Prisma.Decimal | null
      transmission: Prisma.JsonValue | null
      shafts: Prisma.JsonValue | null
      safety_factor: Prisma.Decimal | null
      selected_motor_id: number | null
      selected_motor_snapshot: Prisma.JsonValue | null
      design_result: Prisma.JsonValue | null
      step: $Enums.projects_step | null
      deletedBy: number | null
      isDeleted: boolean | null
      deletedAt: Date | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["projects"]>
    composites: {}
  }

  type projectsGetPayload<S extends boolean | null | undefined | projectsDefaultArgs> = $Result.GetResult<Prisma.$projectsPayload, S>

  type projectsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<projectsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectsCountAggregateInputType | true
    }

  export interface projectsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['projects'], meta: { name: 'projects' } }
    /**
     * Find zero or one Projects that matches the filter.
     * @param {projectsFindUniqueArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends projectsFindUniqueArgs>(args: SelectSubset<T, projectsFindUniqueArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Projects that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {projectsFindUniqueOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends projectsFindUniqueOrThrowArgs>(args: SelectSubset<T, projectsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends projectsFindFirstArgs>(args?: SelectSubset<T, projectsFindFirstArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projects that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindFirstOrThrowArgs} args - Arguments to find a Projects
     * @example
     * // Get one Projects
     * const projects = await prisma.projects.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends projectsFindFirstOrThrowArgs>(args?: SelectSubset<T, projectsFindFirstOrThrowArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.projects.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.projects.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectsWithIdOnly = await prisma.projects.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends projectsFindManyArgs>(args?: SelectSubset<T, projectsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Projects.
     * @param {projectsCreateArgs} args - Arguments to create a Projects.
     * @example
     * // Create one Projects
     * const Projects = await prisma.projects.create({
     *   data: {
     *     // ... data to create a Projects
     *   }
     * })
     * 
     */
    create<T extends projectsCreateArgs>(args: SelectSubset<T, projectsCreateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {projectsCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const projects = await prisma.projects.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends projectsCreateManyArgs>(args?: SelectSubset<T, projectsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Projects.
     * @param {projectsDeleteArgs} args - Arguments to delete one Projects.
     * @example
     * // Delete one Projects
     * const Projects = await prisma.projects.delete({
     *   where: {
     *     // ... filter to delete one Projects
     *   }
     * })
     * 
     */
    delete<T extends projectsDeleteArgs>(args: SelectSubset<T, projectsDeleteArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Projects.
     * @param {projectsUpdateArgs} args - Arguments to update one Projects.
     * @example
     * // Update one Projects
     * const projects = await prisma.projects.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends projectsUpdateArgs>(args: SelectSubset<T, projectsUpdateArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {projectsDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.projects.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends projectsDeleteManyArgs>(args?: SelectSubset<T, projectsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const projects = await prisma.projects.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends projectsUpdateManyArgs>(args: SelectSubset<T, projectsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Projects.
     * @param {projectsUpsertArgs} args - Arguments to update or create a Projects.
     * @example
     * // Update or create a Projects
     * const projects = await prisma.projects.upsert({
     *   create: {
     *     // ... data to create a Projects
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Projects we want to update
     *   }
     * })
     */
    upsert<T extends projectsUpsertArgs>(args: SelectSubset<T, projectsUpsertArgs<ExtArgs>>): Prisma__projectsClient<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.projects.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends projectsCountArgs>(
      args?: Subset<T, projectsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectsAggregateArgs>(args: Subset<T, ProjectsAggregateArgs>): Prisma.PrismaPromise<GetProjectsAggregateType<T>>

    /**
     * Group by Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends projectsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: projectsGroupByArgs['orderBy'] }
        : { orderBy?: projectsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, projectsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the projects model
   */
  readonly fields: projectsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for projects.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__projectsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    motors<T extends projects$motorsArgs<ExtArgs> = {}>(args?: Subset<T, projects$motorsArgs<ExtArgs>>): Prisma__motorsClient<$Result.GetResult<Prisma.$motorsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the projects model
   */
  interface projectsFieldRefs {
    readonly id: FieldRef<"projects", 'Int'>
    readonly user_id: FieldRef<"projects", 'Int'>
    readonly name: FieldRef<"projects", 'String'>
    readonly input_P: FieldRef<"projects", 'Decimal'>
    readonly input_n_ct: FieldRef<"projects", 'Decimal'>
    readonly input_L: FieldRef<"projects", 'Decimal'>
    readonly efficiency: FieldRef<"projects", 'Decimal'>
    readonly Pct: FieldRef<"projects", 'Decimal'>
    readonly total_ratio: FieldRef<"projects", 'Decimal'>
    readonly transmission: FieldRef<"projects", 'Json'>
    readonly shafts: FieldRef<"projects", 'Json'>
    readonly safety_factor: FieldRef<"projects", 'Decimal'>
    readonly selected_motor_id: FieldRef<"projects", 'Int'>
    readonly selected_motor_snapshot: FieldRef<"projects", 'Json'>
    readonly design_result: FieldRef<"projects", 'Json'>
    readonly step: FieldRef<"projects", 'projects_step'>
    readonly deletedBy: FieldRef<"projects", 'Int'>
    readonly isDeleted: FieldRef<"projects", 'Boolean'>
    readonly deletedAt: FieldRef<"projects", 'DateTime'>
    readonly createdAt: FieldRef<"projects", 'DateTime'>
    readonly updatedAt: FieldRef<"projects", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * projects findUnique
   */
  export type projectsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findUniqueOrThrow
   */
  export type projectsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects findFirst
   */
  export type projectsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findFirstOrThrow
   */
  export type projectsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects findMany
   */
  export type projectsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing projects.
     */
    cursor?: projectsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * projects create
   */
  export type projectsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to create a projects.
     */
    data: XOR<projectsCreateInput, projectsUncheckedCreateInput>
  }

  /**
   * projects createMany
   */
  export type projectsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many projects.
     */
    data: projectsCreateManyInput | projectsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * projects update
   */
  export type projectsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The data needed to update a projects.
     */
    data: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
    /**
     * Choose, which projects to update.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects updateMany
   */
  export type projectsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update projects.
     */
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyInput>
    /**
     * Filter which projects to update
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to update.
     */
    limit?: number
  }

  /**
   * projects upsert
   */
  export type projectsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * The filter to search for the projects to update in case it exists.
     */
    where: projectsWhereUniqueInput
    /**
     * In case the projects found by the `where` argument doesn't exist, create a new projects with this data.
     */
    create: XOR<projectsCreateInput, projectsUncheckedCreateInput>
    /**
     * In case the projects was found with the provided `where` argument, update it with this data.
     */
    update: XOR<projectsUpdateInput, projectsUncheckedUpdateInput>
  }

  /**
   * projects delete
   */
  export type projectsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    /**
     * Filter which projects to delete.
     */
    where: projectsWhereUniqueInput
  }

  /**
   * projects deleteMany
   */
  export type projectsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to delete
     */
    where?: projectsWhereInput
    /**
     * Limit how many projects to delete.
     */
    limit?: number
  }

  /**
   * projects.motors
   */
  export type projects$motorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the motors
     */
    select?: motorsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the motors
     */
    omit?: motorsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: motorsInclude<ExtArgs> | null
    where?: motorsWhereInput
  }

  /**
   * projects without action
   */
  export type projectsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
    deletedBy: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
    deletedBy: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.users_role | null
    reset_token: string | null
    reset_token_expiry: Date | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.users_role | null
    reset_token: string | null
    reset_token_expiry: Date | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    reset_token: number
    reset_token_expiry: number
    deletedBy: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
    deletedBy?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
    deletedBy?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    reset_token?: true
    reset_token_expiry?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    reset_token?: true
    reset_token_expiry?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    reset_token?: true
    reset_token_expiry?: true
    deletedBy?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    role: $Enums.users_role | null
    reset_token: string | null
    reset_token_expiry: Date | null
    deletedBy: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    reset_token?: boolean
    reset_token_expiry?: boolean
    deletedBy?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projects?: boolean | users$projectsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type usersSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    reset_token?: boolean
    reset_token_expiry?: boolean
    deletedBy?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "reset_token" | "reset_token_expiry" | "deletedBy" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | users$projectsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      projects: Prisma.$projectsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      role: $Enums.users_role | null
      reset_token: string | null
      reset_token_expiry: Date | null
      deletedBy: number | null
      isDeleted: boolean | null
      deletedAt: Date | null
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends users$projectsArgs<ExtArgs> = {}>(args?: Subset<T, users$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'users_role'>
    readonly reset_token: FieldRef<"users", 'String'>
    readonly reset_token_expiry: FieldRef<"users", 'DateTime'>
    readonly deletedBy: FieldRef<"users", 'Int'>
    readonly isDeleted: FieldRef<"users", 'Boolean'>
    readonly deletedAt: FieldRef<"users", 'DateTime'>
    readonly createdAt: FieldRef<"users", 'DateTime'>
    readonly updatedAt: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.projects
   */
  export type users$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the projects
     */
    select?: projectsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the projects
     */
    omit?: projectsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectsInclude<ExtArgs> | null
    where?: projectsWhereInput
    orderBy?: projectsOrderByWithRelationInput | projectsOrderByWithRelationInput[]
    cursor?: projectsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectsScalarFieldEnum | ProjectsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BearingsScalarFieldEnum: {
    id: 'id',
    code: 'code',
    type: 'type',
    inner_d: 'inner_d',
    outer_D: 'outer_D',
    width_B: 'width_B',
    C: 'C',
    C0: 'C0',
    is_active: 'is_active',
    deletedBy: 'deletedBy',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BearingsScalarFieldEnum = (typeof BearingsScalarFieldEnum)[keyof typeof BearingsScalarFieldEnum]


  export const ChainsScalarFieldEnum: {
    id: 'id',
    pitch: 'pitch',
    breaking_load: 'breaking_load',
    mass_per_m: 'mass_per_m',
    is_active: 'is_active',
    deletedBy: 'deletedBy',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChainsScalarFieldEnum = (typeof ChainsScalarFieldEnum)[keyof typeof ChainsScalarFieldEnum]


  export const MotorsScalarFieldEnum: {
    id: 'id',
    code: 'code',
    P_dm: 'P_dm',
    n_dm: 'n_dm',
    cos_phi: 'cos_phi',
    eta_motor: 'eta_motor',
    mass_kg: 'mass_kg',
    price: 'price',
    is_active: 'is_active',
    deletedBy: 'deletedBy',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MotorsScalarFieldEnum = (typeof MotorsScalarFieldEnum)[keyof typeof MotorsScalarFieldEnum]


  export const ProjectsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    name: 'name',
    input_P: 'input_P',
    input_n_ct: 'input_n_ct',
    input_L: 'input_L',
    efficiency: 'efficiency',
    Pct: 'Pct',
    total_ratio: 'total_ratio',
    transmission: 'transmission',
    shafts: 'shafts',
    safety_factor: 'safety_factor',
    selected_motor_id: 'selected_motor_id',
    selected_motor_snapshot: 'selected_motor_snapshot',
    design_result: 'design_result',
    step: 'step',
    deletedBy: 'deletedBy',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectsScalarFieldEnum = (typeof ProjectsScalarFieldEnum)[keyof typeof ProjectsScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    reset_token: 'reset_token',
    reset_token_expiry: 'reset_token_expiry',
    deletedBy: 'deletedBy',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const bearingsOrderByRelevanceFieldEnum: {
    code: 'code',
    type: 'type'
  };

  export type bearingsOrderByRelevanceFieldEnum = (typeof bearingsOrderByRelevanceFieldEnum)[keyof typeof bearingsOrderByRelevanceFieldEnum]


  export const motorsOrderByRelevanceFieldEnum: {
    code: 'code'
  };

  export type motorsOrderByRelevanceFieldEnum = (typeof motorsOrderByRelevanceFieldEnum)[keyof typeof motorsOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const projectsOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type projectsOrderByRelevanceFieldEnum = (typeof projectsOrderByRelevanceFieldEnum)[keyof typeof projectsOrderByRelevanceFieldEnum]


  export const usersOrderByRelevanceFieldEnum: {
    name: 'name',
    email: 'email',
    password: 'password',
    reset_token: 'reset_token'
  };

  export type usersOrderByRelevanceFieldEnum = (typeof usersOrderByRelevanceFieldEnum)[keyof typeof usersOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'projects_step'
   */
  export type Enumprojects_stepFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'projects_step'>
    


  /**
   * Reference to a field of type 'users_role'
   */
  export type Enumusers_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_role'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type bearingsWhereInput = {
    AND?: bearingsWhereInput | bearingsWhereInput[]
    OR?: bearingsWhereInput[]
    NOT?: bearingsWhereInput | bearingsWhereInput[]
    id?: IntFilter<"bearings"> | number
    code?: StringFilter<"bearings"> | string
    type?: StringNullableFilter<"bearings"> | string | null
    inner_d?: DecimalFilter<"bearings"> | Decimal | DecimalJsLike | number | string
    outer_D?: DecimalFilter<"bearings"> | Decimal | DecimalJsLike | number | string
    width_B?: DecimalFilter<"bearings"> | Decimal | DecimalJsLike | number | string
    C?: DecimalNullableFilter<"bearings"> | Decimal | DecimalJsLike | number | string | null
    C0?: DecimalNullableFilter<"bearings"> | Decimal | DecimalJsLike | number | string | null
    is_active?: BoolNullableFilter<"bearings"> | boolean | null
    deletedBy?: IntNullableFilter<"bearings"> | number | null
    isDeleted?: BoolNullableFilter<"bearings"> | boolean | null
    deletedAt?: DateTimeNullableFilter<"bearings"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"bearings"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"bearings"> | Date | string | null
  }

  export type bearingsOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrderInput | SortOrder
    inner_d?: SortOrder
    outer_D?: SortOrder
    width_B?: SortOrder
    C?: SortOrderInput | SortOrder
    C0?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _relevance?: bearingsOrderByRelevanceInput
  }

  export type bearingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    inner_d_outer_D_width_B?: bearingsInner_dOuter_DWidth_BCompoundUniqueInput
    AND?: bearingsWhereInput | bearingsWhereInput[]
    OR?: bearingsWhereInput[]
    NOT?: bearingsWhereInput | bearingsWhereInput[]
    type?: StringNullableFilter<"bearings"> | string | null
    inner_d?: DecimalFilter<"bearings"> | Decimal | DecimalJsLike | number | string
    outer_D?: DecimalFilter<"bearings"> | Decimal | DecimalJsLike | number | string
    width_B?: DecimalFilter<"bearings"> | Decimal | DecimalJsLike | number | string
    C?: DecimalNullableFilter<"bearings"> | Decimal | DecimalJsLike | number | string | null
    C0?: DecimalNullableFilter<"bearings"> | Decimal | DecimalJsLike | number | string | null
    is_active?: BoolNullableFilter<"bearings"> | boolean | null
    deletedBy?: IntNullableFilter<"bearings"> | number | null
    isDeleted?: BoolNullableFilter<"bearings"> | boolean | null
    deletedAt?: DateTimeNullableFilter<"bearings"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"bearings"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"bearings"> | Date | string | null
  }, "id" | "code" | "inner_d_outer_D_width_B">

  export type bearingsOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrderInput | SortOrder
    inner_d?: SortOrder
    outer_D?: SortOrder
    width_B?: SortOrder
    C?: SortOrderInput | SortOrder
    C0?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: bearingsCountOrderByAggregateInput
    _avg?: bearingsAvgOrderByAggregateInput
    _max?: bearingsMaxOrderByAggregateInput
    _min?: bearingsMinOrderByAggregateInput
    _sum?: bearingsSumOrderByAggregateInput
  }

  export type bearingsScalarWhereWithAggregatesInput = {
    AND?: bearingsScalarWhereWithAggregatesInput | bearingsScalarWhereWithAggregatesInput[]
    OR?: bearingsScalarWhereWithAggregatesInput[]
    NOT?: bearingsScalarWhereWithAggregatesInput | bearingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"bearings"> | number
    code?: StringWithAggregatesFilter<"bearings"> | string
    type?: StringNullableWithAggregatesFilter<"bearings"> | string | null
    inner_d?: DecimalWithAggregatesFilter<"bearings"> | Decimal | DecimalJsLike | number | string
    outer_D?: DecimalWithAggregatesFilter<"bearings"> | Decimal | DecimalJsLike | number | string
    width_B?: DecimalWithAggregatesFilter<"bearings"> | Decimal | DecimalJsLike | number | string
    C?: DecimalNullableWithAggregatesFilter<"bearings"> | Decimal | DecimalJsLike | number | string | null
    C0?: DecimalNullableWithAggregatesFilter<"bearings"> | Decimal | DecimalJsLike | number | string | null
    is_active?: BoolNullableWithAggregatesFilter<"bearings"> | boolean | null
    deletedBy?: IntNullableWithAggregatesFilter<"bearings"> | number | null
    isDeleted?: BoolNullableWithAggregatesFilter<"bearings"> | boolean | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"bearings"> | Date | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"bearings"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"bearings"> | Date | string | null
  }

  export type chainsWhereInput = {
    AND?: chainsWhereInput | chainsWhereInput[]
    OR?: chainsWhereInput[]
    NOT?: chainsWhereInput | chainsWhereInput[]
    id?: IntFilter<"chains"> | number
    pitch?: DecimalFilter<"chains"> | Decimal | DecimalJsLike | number | string
    breaking_load?: DecimalNullableFilter<"chains"> | Decimal | DecimalJsLike | number | string | null
    mass_per_m?: DecimalNullableFilter<"chains"> | Decimal | DecimalJsLike | number | string | null
    is_active?: BoolNullableFilter<"chains"> | boolean | null
    deletedBy?: IntNullableFilter<"chains"> | number | null
    isDeleted?: BoolNullableFilter<"chains"> | boolean | null
    deletedAt?: DateTimeNullableFilter<"chains"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"chains"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"chains"> | Date | string | null
  }

  export type chainsOrderByWithRelationInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrderInput | SortOrder
    mass_per_m?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type chainsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    pitch?: Decimal | DecimalJsLike | number | string
    AND?: chainsWhereInput | chainsWhereInput[]
    OR?: chainsWhereInput[]
    NOT?: chainsWhereInput | chainsWhereInput[]
    breaking_load?: DecimalNullableFilter<"chains"> | Decimal | DecimalJsLike | number | string | null
    mass_per_m?: DecimalNullableFilter<"chains"> | Decimal | DecimalJsLike | number | string | null
    is_active?: BoolNullableFilter<"chains"> | boolean | null
    deletedBy?: IntNullableFilter<"chains"> | number | null
    isDeleted?: BoolNullableFilter<"chains"> | boolean | null
    deletedAt?: DateTimeNullableFilter<"chains"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"chains"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"chains"> | Date | string | null
  }, "id" | "pitch">

  export type chainsOrderByWithAggregationInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrderInput | SortOrder
    mass_per_m?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: chainsCountOrderByAggregateInput
    _avg?: chainsAvgOrderByAggregateInput
    _max?: chainsMaxOrderByAggregateInput
    _min?: chainsMinOrderByAggregateInput
    _sum?: chainsSumOrderByAggregateInput
  }

  export type chainsScalarWhereWithAggregatesInput = {
    AND?: chainsScalarWhereWithAggregatesInput | chainsScalarWhereWithAggregatesInput[]
    OR?: chainsScalarWhereWithAggregatesInput[]
    NOT?: chainsScalarWhereWithAggregatesInput | chainsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"chains"> | number
    pitch?: DecimalWithAggregatesFilter<"chains"> | Decimal | DecimalJsLike | number | string
    breaking_load?: DecimalNullableWithAggregatesFilter<"chains"> | Decimal | DecimalJsLike | number | string | null
    mass_per_m?: DecimalNullableWithAggregatesFilter<"chains"> | Decimal | DecimalJsLike | number | string | null
    is_active?: BoolNullableWithAggregatesFilter<"chains"> | boolean | null
    deletedBy?: IntNullableWithAggregatesFilter<"chains"> | number | null
    isDeleted?: BoolNullableWithAggregatesFilter<"chains"> | boolean | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"chains"> | Date | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"chains"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"chains"> | Date | string | null
  }

  export type motorsWhereInput = {
    AND?: motorsWhereInput | motorsWhereInput[]
    OR?: motorsWhereInput[]
    NOT?: motorsWhereInput | motorsWhereInput[]
    id?: IntFilter<"motors"> | number
    code?: StringFilter<"motors"> | string
    P_dm?: DecimalFilter<"motors"> | Decimal | DecimalJsLike | number | string
    n_dm?: IntFilter<"motors"> | number
    cos_phi?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    eta_motor?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    mass_kg?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    price?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    is_active?: BoolNullableFilter<"motors"> | boolean | null
    deletedBy?: IntNullableFilter<"motors"> | number | null
    isDeleted?: BoolNullableFilter<"motors"> | boolean | null
    deletedAt?: DateTimeNullableFilter<"motors"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"motors"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"motors"> | Date | string | null
    projects?: ProjectsListRelationFilter
  }

  export type motorsOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    cos_phi?: SortOrderInput | SortOrder
    eta_motor?: SortOrderInput | SortOrder
    mass_kg?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    projects?: projectsOrderByRelationAggregateInput
    _relevance?: motorsOrderByRelevanceInput
  }

  export type motorsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: motorsWhereInput | motorsWhereInput[]
    OR?: motorsWhereInput[]
    NOT?: motorsWhereInput | motorsWhereInput[]
    P_dm?: DecimalFilter<"motors"> | Decimal | DecimalJsLike | number | string
    n_dm?: IntFilter<"motors"> | number
    cos_phi?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    eta_motor?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    mass_kg?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    price?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    is_active?: BoolNullableFilter<"motors"> | boolean | null
    deletedBy?: IntNullableFilter<"motors"> | number | null
    isDeleted?: BoolNullableFilter<"motors"> | boolean | null
    deletedAt?: DateTimeNullableFilter<"motors"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"motors"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"motors"> | Date | string | null
    projects?: ProjectsListRelationFilter
  }, "id" | "code">

  export type motorsOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    cos_phi?: SortOrderInput | SortOrder
    eta_motor?: SortOrderInput | SortOrder
    mass_kg?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: motorsCountOrderByAggregateInput
    _avg?: motorsAvgOrderByAggregateInput
    _max?: motorsMaxOrderByAggregateInput
    _min?: motorsMinOrderByAggregateInput
    _sum?: motorsSumOrderByAggregateInput
  }

  export type motorsScalarWhereWithAggregatesInput = {
    AND?: motorsScalarWhereWithAggregatesInput | motorsScalarWhereWithAggregatesInput[]
    OR?: motorsScalarWhereWithAggregatesInput[]
    NOT?: motorsScalarWhereWithAggregatesInput | motorsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"motors"> | number
    code?: StringWithAggregatesFilter<"motors"> | string
    P_dm?: DecimalWithAggregatesFilter<"motors"> | Decimal | DecimalJsLike | number | string
    n_dm?: IntWithAggregatesFilter<"motors"> | number
    cos_phi?: DecimalNullableWithAggregatesFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    eta_motor?: DecimalNullableWithAggregatesFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    mass_kg?: DecimalNullableWithAggregatesFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    price?: DecimalNullableWithAggregatesFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    is_active?: BoolNullableWithAggregatesFilter<"motors"> | boolean | null
    deletedBy?: IntNullableWithAggregatesFilter<"motors"> | number | null
    isDeleted?: BoolNullableWithAggregatesFilter<"motors"> | boolean | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"motors"> | Date | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"motors"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"motors"> | Date | string | null
  }

  export type projectsWhereInput = {
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    id?: IntFilter<"projects"> | number
    user_id?: IntFilter<"projects"> | number
    name?: StringFilter<"projects"> | string
    input_P?: DecimalFilter<"projects"> | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFilter<"projects"> | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFilter<"projects"> | Decimal | DecimalJsLike | number | string
    efficiency?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    Pct?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    total_ratio?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    transmission?: JsonNullableFilter<"projects">
    shafts?: JsonNullableFilter<"projects">
    safety_factor?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: IntNullableFilter<"projects"> | number | null
    selected_motor_snapshot?: JsonNullableFilter<"projects">
    design_result?: JsonNullableFilter<"projects">
    step?: Enumprojects_stepNullableFilter<"projects"> | $Enums.projects_step | null
    deletedBy?: IntNullableFilter<"projects"> | number | null
    isDeleted?: BoolNullableFilter<"projects"> | boolean | null
    deletedAt?: DateTimeNullableFilter<"projects"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"projects"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"projects"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    motors?: XOR<MotorsNullableScalarRelationFilter, motorsWhereInput> | null
  }

  export type projectsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    input_P?: SortOrder
    input_n_ct?: SortOrder
    input_L?: SortOrder
    efficiency?: SortOrderInput | SortOrder
    Pct?: SortOrderInput | SortOrder
    total_ratio?: SortOrderInput | SortOrder
    transmission?: SortOrderInput | SortOrder
    shafts?: SortOrderInput | SortOrder
    safety_factor?: SortOrderInput | SortOrder
    selected_motor_id?: SortOrderInput | SortOrder
    selected_motor_snapshot?: SortOrderInput | SortOrder
    design_result?: SortOrderInput | SortOrder
    step?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
    motors?: motorsOrderByWithRelationInput
    _relevance?: projectsOrderByRelevanceInput
  }

  export type projectsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: projectsWhereInput | projectsWhereInput[]
    OR?: projectsWhereInput[]
    NOT?: projectsWhereInput | projectsWhereInput[]
    user_id?: IntFilter<"projects"> | number
    name?: StringFilter<"projects"> | string
    input_P?: DecimalFilter<"projects"> | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFilter<"projects"> | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFilter<"projects"> | Decimal | DecimalJsLike | number | string
    efficiency?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    Pct?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    total_ratio?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    transmission?: JsonNullableFilter<"projects">
    shafts?: JsonNullableFilter<"projects">
    safety_factor?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: IntNullableFilter<"projects"> | number | null
    selected_motor_snapshot?: JsonNullableFilter<"projects">
    design_result?: JsonNullableFilter<"projects">
    step?: Enumprojects_stepNullableFilter<"projects"> | $Enums.projects_step | null
    deletedBy?: IntNullableFilter<"projects"> | number | null
    isDeleted?: BoolNullableFilter<"projects"> | boolean | null
    deletedAt?: DateTimeNullableFilter<"projects"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"projects"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"projects"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    motors?: XOR<MotorsNullableScalarRelationFilter, motorsWhereInput> | null
  }, "id">

  export type projectsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    input_P?: SortOrder
    input_n_ct?: SortOrder
    input_L?: SortOrder
    efficiency?: SortOrderInput | SortOrder
    Pct?: SortOrderInput | SortOrder
    total_ratio?: SortOrderInput | SortOrder
    transmission?: SortOrderInput | SortOrder
    shafts?: SortOrderInput | SortOrder
    safety_factor?: SortOrderInput | SortOrder
    selected_motor_id?: SortOrderInput | SortOrder
    selected_motor_snapshot?: SortOrderInput | SortOrder
    design_result?: SortOrderInput | SortOrder
    step?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: projectsCountOrderByAggregateInput
    _avg?: projectsAvgOrderByAggregateInput
    _max?: projectsMaxOrderByAggregateInput
    _min?: projectsMinOrderByAggregateInput
    _sum?: projectsSumOrderByAggregateInput
  }

  export type projectsScalarWhereWithAggregatesInput = {
    AND?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    OR?: projectsScalarWhereWithAggregatesInput[]
    NOT?: projectsScalarWhereWithAggregatesInput | projectsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"projects"> | number
    user_id?: IntWithAggregatesFilter<"projects"> | number
    name?: StringWithAggregatesFilter<"projects"> | string
    input_P?: DecimalWithAggregatesFilter<"projects"> | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalWithAggregatesFilter<"projects"> | Decimal | DecimalJsLike | number | string
    input_L?: DecimalWithAggregatesFilter<"projects"> | Decimal | DecimalJsLike | number | string
    efficiency?: DecimalNullableWithAggregatesFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    Pct?: DecimalNullableWithAggregatesFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    total_ratio?: DecimalNullableWithAggregatesFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    transmission?: JsonNullableWithAggregatesFilter<"projects">
    shafts?: JsonNullableWithAggregatesFilter<"projects">
    safety_factor?: DecimalNullableWithAggregatesFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: IntNullableWithAggregatesFilter<"projects"> | number | null
    selected_motor_snapshot?: JsonNullableWithAggregatesFilter<"projects">
    design_result?: JsonNullableWithAggregatesFilter<"projects">
    step?: Enumprojects_stepNullableWithAggregatesFilter<"projects"> | $Enums.projects_step | null
    deletedBy?: IntNullableWithAggregatesFilter<"projects"> | number | null
    isDeleted?: BoolNullableWithAggregatesFilter<"projects"> | boolean | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"projects"> | Date | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"projects"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"projects"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: Enumusers_roleNullableFilter<"users"> | $Enums.users_role | null
    reset_token?: StringNullableFilter<"users"> | string | null
    reset_token_expiry?: DateTimeNullableFilter<"users"> | Date | string | null
    deletedBy?: IntNullableFilter<"users"> | number | null
    isDeleted?: BoolNullableFilter<"users"> | boolean | null
    deletedAt?: DateTimeNullableFilter<"users"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"users"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"users"> | Date | string | null
    projects?: ProjectsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrderInput | SortOrder
    reset_token?: SortOrderInput | SortOrder
    reset_token_expiry?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    projects?: projectsOrderByRelationAggregateInput
    _relevance?: usersOrderByRelevanceInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    name?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    role?: Enumusers_roleNullableFilter<"users"> | $Enums.users_role | null
    reset_token?: StringNullableFilter<"users"> | string | null
    reset_token_expiry?: DateTimeNullableFilter<"users"> | Date | string | null
    deletedBy?: IntNullableFilter<"users"> | number | null
    isDeleted?: BoolNullableFilter<"users"> | boolean | null
    deletedAt?: DateTimeNullableFilter<"users"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"users"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"users"> | Date | string | null
    projects?: ProjectsListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrderInput | SortOrder
    reset_token?: SortOrderInput | SortOrder
    reset_token_expiry?: SortOrderInput | SortOrder
    deletedBy?: SortOrderInput | SortOrder
    isDeleted?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    role?: Enumusers_roleNullableWithAggregatesFilter<"users"> | $Enums.users_role | null
    reset_token?: StringNullableWithAggregatesFilter<"users"> | string | null
    reset_token_expiry?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    deletedBy?: IntNullableWithAggregatesFilter<"users"> | number | null
    isDeleted?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type bearingsCreateInput = {
    code: string
    type?: string | null
    inner_d: Decimal | DecimalJsLike | number | string
    outer_D: Decimal | DecimalJsLike | number | string
    width_B: Decimal | DecimalJsLike | number | string
    C?: Decimal | DecimalJsLike | number | string | null
    C0?: Decimal | DecimalJsLike | number | string | null
    is_active?: boolean | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type bearingsUncheckedCreateInput = {
    id?: number
    code: string
    type?: string | null
    inner_d: Decimal | DecimalJsLike | number | string
    outer_D: Decimal | DecimalJsLike | number | string
    width_B: Decimal | DecimalJsLike | number | string
    C?: Decimal | DecimalJsLike | number | string | null
    C0?: Decimal | DecimalJsLike | number | string | null
    is_active?: boolean | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type bearingsUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    inner_d?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    outer_D?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    width_B?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    C?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    C0?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bearingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    inner_d?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    outer_D?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    width_B?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    C?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    C0?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bearingsCreateManyInput = {
    id?: number
    code: string
    type?: string | null
    inner_d: Decimal | DecimalJsLike | number | string
    outer_D: Decimal | DecimalJsLike | number | string
    width_B: Decimal | DecimalJsLike | number | string
    C?: Decimal | DecimalJsLike | number | string | null
    C0?: Decimal | DecimalJsLike | number | string | null
    is_active?: boolean | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type bearingsUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    inner_d?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    outer_D?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    width_B?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    C?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    C0?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bearingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    inner_d?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    outer_D?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    width_B?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    C?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    C0?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chainsCreateInput = {
    pitch: Decimal | DecimalJsLike | number | string
    breaking_load?: Decimal | DecimalJsLike | number | string | null
    mass_per_m?: Decimal | DecimalJsLike | number | string | null
    is_active?: boolean | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type chainsUncheckedCreateInput = {
    id?: number
    pitch: Decimal | DecimalJsLike | number | string
    breaking_load?: Decimal | DecimalJsLike | number | string | null
    mass_per_m?: Decimal | DecimalJsLike | number | string | null
    is_active?: boolean | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type chainsUpdateInput = {
    pitch?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    breaking_load?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    mass_per_m?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chainsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pitch?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    breaking_load?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    mass_per_m?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chainsCreateManyInput = {
    id?: number
    pitch: Decimal | DecimalJsLike | number | string
    breaking_load?: Decimal | DecimalJsLike | number | string | null
    mass_per_m?: Decimal | DecimalJsLike | number | string | null
    is_active?: boolean | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type chainsUpdateManyMutationInput = {
    pitch?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    breaking_load?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    mass_per_m?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chainsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pitch?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    breaking_load?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    mass_per_m?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type motorsCreateInput = {
    code: string
    P_dm: Decimal | DecimalJsLike | number | string
    n_dm: number
    cos_phi?: Decimal | DecimalJsLike | number | string | null
    eta_motor?: Decimal | DecimalJsLike | number | string | null
    mass_kg?: Decimal | DecimalJsLike | number | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    is_active?: boolean | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    projects?: projectsCreateNestedManyWithoutMotorsInput
  }

  export type motorsUncheckedCreateInput = {
    id?: number
    code: string
    P_dm: Decimal | DecimalJsLike | number | string
    n_dm: number
    cos_phi?: Decimal | DecimalJsLike | number | string | null
    eta_motor?: Decimal | DecimalJsLike | number | string | null
    mass_kg?: Decimal | DecimalJsLike | number | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    is_active?: boolean | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    projects?: projectsUncheckedCreateNestedManyWithoutMotorsInput
  }

  export type motorsUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    eta_motor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    mass_kg?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: projectsUpdateManyWithoutMotorsNestedInput
  }

  export type motorsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    eta_motor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    mass_kg?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: projectsUncheckedUpdateManyWithoutMotorsNestedInput
  }

  export type motorsCreateManyInput = {
    id?: number
    code: string
    P_dm: Decimal | DecimalJsLike | number | string
    n_dm: number
    cos_phi?: Decimal | DecimalJsLike | number | string | null
    eta_motor?: Decimal | DecimalJsLike | number | string | null
    mass_kg?: Decimal | DecimalJsLike | number | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    is_active?: boolean | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type motorsUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    eta_motor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    mass_kg?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type motorsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    eta_motor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    mass_kg?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type projectsCreateInput = {
    name: string
    input_P: Decimal | DecimalJsLike | number | string
    input_n_ct: Decimal | DecimalJsLike | number | string
    input_L: Decimal | DecimalJsLike | number | string
    efficiency?: Decimal | DecimalJsLike | number | string | null
    Pct?: Decimal | DecimalJsLike | number | string | null
    total_ratio?: Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: Decimal | DecimalJsLike | number | string | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: $Enums.projects_step | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    users: usersCreateNestedOneWithoutProjectsInput
    motors?: motorsCreateNestedOneWithoutProjectsInput
  }

  export type projectsUncheckedCreateInput = {
    id?: number
    user_id: number
    name: string
    input_P: Decimal | DecimalJsLike | number | string
    input_n_ct: Decimal | DecimalJsLike | number | string
    input_L: Decimal | DecimalJsLike | number | string
    efficiency?: Decimal | DecimalJsLike | number | string | null
    Pct?: Decimal | DecimalJsLike | number | string | null
    total_ratio?: Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: number | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: $Enums.projects_step | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type projectsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    input_P?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Pct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: NullableEnumprojects_stepFieldUpdateOperationsInput | $Enums.projects_step | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutProjectsNestedInput
    motors?: motorsUpdateOneWithoutProjectsNestedInput
  }

  export type projectsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    input_P?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Pct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: NullableIntFieldUpdateOperationsInput | number | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: NullableEnumprojects_stepFieldUpdateOperationsInput | $Enums.projects_step | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type projectsCreateManyInput = {
    id?: number
    user_id: number
    name: string
    input_P: Decimal | DecimalJsLike | number | string
    input_n_ct: Decimal | DecimalJsLike | number | string
    input_L: Decimal | DecimalJsLike | number | string
    efficiency?: Decimal | DecimalJsLike | number | string | null
    Pct?: Decimal | DecimalJsLike | number | string | null
    total_ratio?: Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: number | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: $Enums.projects_step | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type projectsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    input_P?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Pct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: NullableEnumprojects_stepFieldUpdateOperationsInput | $Enums.projects_step | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type projectsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    input_P?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Pct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: NullableIntFieldUpdateOperationsInput | number | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: NullableEnumprojects_stepFieldUpdateOperationsInput | $Enums.projects_step | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    name: string
    email: string
    password: string
    role?: $Enums.users_role | null
    reset_token?: string | null
    reset_token_expiry?: Date | string | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    projects?: projectsCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.users_role | null
    reset_token?: string | null
    reset_token_expiry?: Date | string | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    projects?: projectsUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: projectsUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: projectsUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.users_role | null
    reset_token?: string | null
    reset_token_expiry?: Date | string | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type bearingsOrderByRelevanceInput = {
    fields: bearingsOrderByRelevanceFieldEnum | bearingsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type bearingsInner_dOuter_DWidth_BCompoundUniqueInput = {
    inner_d: Decimal | DecimalJsLike | number | string
    outer_D: Decimal | DecimalJsLike | number | string
    width_B: Decimal | DecimalJsLike | number | string
  }

  export type bearingsCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    inner_d?: SortOrder
    outer_D?: SortOrder
    width_B?: SortOrder
    C?: SortOrder
    C0?: SortOrder
    is_active?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type bearingsAvgOrderByAggregateInput = {
    id?: SortOrder
    inner_d?: SortOrder
    outer_D?: SortOrder
    width_B?: SortOrder
    C?: SortOrder
    C0?: SortOrder
    deletedBy?: SortOrder
  }

  export type bearingsMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    inner_d?: SortOrder
    outer_D?: SortOrder
    width_B?: SortOrder
    C?: SortOrder
    C0?: SortOrder
    is_active?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type bearingsMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    inner_d?: SortOrder
    outer_D?: SortOrder
    width_B?: SortOrder
    C?: SortOrder
    C0?: SortOrder
    is_active?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type bearingsSumOrderByAggregateInput = {
    id?: SortOrder
    inner_d?: SortOrder
    outer_D?: SortOrder
    width_B?: SortOrder
    C?: SortOrder
    C0?: SortOrder
    deletedBy?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type chainsCountOrderByAggregateInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrder
    mass_per_m?: SortOrder
    is_active?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type chainsAvgOrderByAggregateInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrder
    mass_per_m?: SortOrder
    deletedBy?: SortOrder
  }

  export type chainsMaxOrderByAggregateInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrder
    mass_per_m?: SortOrder
    is_active?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type chainsMinOrderByAggregateInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrder
    mass_per_m?: SortOrder
    is_active?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type chainsSumOrderByAggregateInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrder
    mass_per_m?: SortOrder
    deletedBy?: SortOrder
  }

  export type ProjectsListRelationFilter = {
    every?: projectsWhereInput
    some?: projectsWhereInput
    none?: projectsWhereInput
  }

  export type projectsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type motorsOrderByRelevanceInput = {
    fields: motorsOrderByRelevanceFieldEnum | motorsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type motorsCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    cos_phi?: SortOrder
    eta_motor?: SortOrder
    mass_kg?: SortOrder
    price?: SortOrder
    is_active?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type motorsAvgOrderByAggregateInput = {
    id?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    cos_phi?: SortOrder
    eta_motor?: SortOrder
    mass_kg?: SortOrder
    price?: SortOrder
    deletedBy?: SortOrder
  }

  export type motorsMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    cos_phi?: SortOrder
    eta_motor?: SortOrder
    mass_kg?: SortOrder
    price?: SortOrder
    is_active?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type motorsMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    cos_phi?: SortOrder
    eta_motor?: SortOrder
    mass_kg?: SortOrder
    price?: SortOrder
    is_active?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type motorsSumOrderByAggregateInput = {
    id?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    cos_phi?: SortOrder
    eta_motor?: SortOrder
    mass_kg?: SortOrder
    price?: SortOrder
    deletedBy?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type Enumprojects_stepNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_step | Enumprojects_stepFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_step[] | null
    notIn?: $Enums.projects_step[] | null
    not?: NestedEnumprojects_stepNullableFilter<$PrismaModel> | $Enums.projects_step | null
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type MotorsNullableScalarRelationFilter = {
    is?: motorsWhereInput | null
    isNot?: motorsWhereInput | null
  }

  export type projectsOrderByRelevanceInput = {
    fields: projectsOrderByRelevanceFieldEnum | projectsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type projectsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    input_P?: SortOrder
    input_n_ct?: SortOrder
    input_L?: SortOrder
    efficiency?: SortOrder
    Pct?: SortOrder
    total_ratio?: SortOrder
    transmission?: SortOrder
    shafts?: SortOrder
    safety_factor?: SortOrder
    selected_motor_id?: SortOrder
    selected_motor_snapshot?: SortOrder
    design_result?: SortOrder
    step?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type projectsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    input_P?: SortOrder
    input_n_ct?: SortOrder
    input_L?: SortOrder
    efficiency?: SortOrder
    Pct?: SortOrder
    total_ratio?: SortOrder
    safety_factor?: SortOrder
    selected_motor_id?: SortOrder
    deletedBy?: SortOrder
  }

  export type projectsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    input_P?: SortOrder
    input_n_ct?: SortOrder
    input_L?: SortOrder
    efficiency?: SortOrder
    Pct?: SortOrder
    total_ratio?: SortOrder
    safety_factor?: SortOrder
    selected_motor_id?: SortOrder
    step?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type projectsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    input_P?: SortOrder
    input_n_ct?: SortOrder
    input_L?: SortOrder
    efficiency?: SortOrder
    Pct?: SortOrder
    total_ratio?: SortOrder
    safety_factor?: SortOrder
    selected_motor_id?: SortOrder
    step?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type projectsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    input_P?: SortOrder
    input_n_ct?: SortOrder
    input_L?: SortOrder
    efficiency?: SortOrder
    Pct?: SortOrder
    total_ratio?: SortOrder
    safety_factor?: SortOrder
    selected_motor_id?: SortOrder
    deletedBy?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type Enumprojects_stepNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_step | Enumprojects_stepFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_step[] | null
    notIn?: $Enums.projects_step[] | null
    not?: NestedEnumprojects_stepNullableWithAggregatesFilter<$PrismaModel> | $Enums.projects_step | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumprojects_stepNullableFilter<$PrismaModel>
    _max?: NestedEnumprojects_stepNullableFilter<$PrismaModel>
  }

  export type Enumusers_roleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_role[] | null
    notIn?: $Enums.users_role[] | null
    not?: NestedEnumusers_roleNullableFilter<$PrismaModel> | $Enums.users_role | null
  }

  export type usersOrderByRelevanceInput = {
    fields: usersOrderByRelevanceFieldEnum | usersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    reset_token?: SortOrder
    reset_token_expiry?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
    deletedBy?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    reset_token?: SortOrder
    reset_token_expiry?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    reset_token?: SortOrder
    reset_token_expiry?: SortOrder
    deletedBy?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
    deletedBy?: SortOrder
  }

  export type Enumusers_roleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_role[] | null
    notIn?: $Enums.users_role[] | null
    not?: NestedEnumusers_roleNullableWithAggregatesFilter<$PrismaModel> | $Enums.users_role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumusers_roleNullableFilter<$PrismaModel>
    _max?: NestedEnumusers_roleNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type projectsCreateNestedManyWithoutMotorsInput = {
    create?: XOR<projectsCreateWithoutMotorsInput, projectsUncheckedCreateWithoutMotorsInput> | projectsCreateWithoutMotorsInput[] | projectsUncheckedCreateWithoutMotorsInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutMotorsInput | projectsCreateOrConnectWithoutMotorsInput[]
    createMany?: projectsCreateManyMotorsInputEnvelope
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
  }

  export type projectsUncheckedCreateNestedManyWithoutMotorsInput = {
    create?: XOR<projectsCreateWithoutMotorsInput, projectsUncheckedCreateWithoutMotorsInput> | projectsCreateWithoutMotorsInput[] | projectsUncheckedCreateWithoutMotorsInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutMotorsInput | projectsCreateOrConnectWithoutMotorsInput[]
    createMany?: projectsCreateManyMotorsInputEnvelope
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
  }

  export type projectsUpdateManyWithoutMotorsNestedInput = {
    create?: XOR<projectsCreateWithoutMotorsInput, projectsUncheckedCreateWithoutMotorsInput> | projectsCreateWithoutMotorsInput[] | projectsUncheckedCreateWithoutMotorsInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutMotorsInput | projectsCreateOrConnectWithoutMotorsInput[]
    upsert?: projectsUpsertWithWhereUniqueWithoutMotorsInput | projectsUpsertWithWhereUniqueWithoutMotorsInput[]
    createMany?: projectsCreateManyMotorsInputEnvelope
    set?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    disconnect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    delete?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    update?: projectsUpdateWithWhereUniqueWithoutMotorsInput | projectsUpdateWithWhereUniqueWithoutMotorsInput[]
    updateMany?: projectsUpdateManyWithWhereWithoutMotorsInput | projectsUpdateManyWithWhereWithoutMotorsInput[]
    deleteMany?: projectsScalarWhereInput | projectsScalarWhereInput[]
  }

  export type projectsUncheckedUpdateManyWithoutMotorsNestedInput = {
    create?: XOR<projectsCreateWithoutMotorsInput, projectsUncheckedCreateWithoutMotorsInput> | projectsCreateWithoutMotorsInput[] | projectsUncheckedCreateWithoutMotorsInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutMotorsInput | projectsCreateOrConnectWithoutMotorsInput[]
    upsert?: projectsUpsertWithWhereUniqueWithoutMotorsInput | projectsUpsertWithWhereUniqueWithoutMotorsInput[]
    createMany?: projectsCreateManyMotorsInputEnvelope
    set?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    disconnect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    delete?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    update?: projectsUpdateWithWhereUniqueWithoutMotorsInput | projectsUpdateWithWhereUniqueWithoutMotorsInput[]
    updateMany?: projectsUpdateManyWithWhereWithoutMotorsInput | projectsUpdateManyWithWhereWithoutMotorsInput[]
    deleteMany?: projectsScalarWhereInput | projectsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutProjectsInput = {
    create?: XOR<usersCreateWithoutProjectsInput, usersUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: usersCreateOrConnectWithoutProjectsInput
    connect?: usersWhereUniqueInput
  }

  export type motorsCreateNestedOneWithoutProjectsInput = {
    create?: XOR<motorsCreateWithoutProjectsInput, motorsUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: motorsCreateOrConnectWithoutProjectsInput
    connect?: motorsWhereUniqueInput
  }

  export type NullableEnumprojects_stepFieldUpdateOperationsInput = {
    set?: $Enums.projects_step | null
  }

  export type usersUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<usersCreateWithoutProjectsInput, usersUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: usersCreateOrConnectWithoutProjectsInput
    upsert?: usersUpsertWithoutProjectsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutProjectsInput, usersUpdateWithoutProjectsInput>, usersUncheckedUpdateWithoutProjectsInput>
  }

  export type motorsUpdateOneWithoutProjectsNestedInput = {
    create?: XOR<motorsCreateWithoutProjectsInput, motorsUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: motorsCreateOrConnectWithoutProjectsInput
    upsert?: motorsUpsertWithoutProjectsInput
    disconnect?: motorsWhereInput | boolean
    delete?: motorsWhereInput | boolean
    connect?: motorsWhereUniqueInput
    update?: XOR<XOR<motorsUpdateToOneWithWhereWithoutProjectsInput, motorsUpdateWithoutProjectsInput>, motorsUncheckedUpdateWithoutProjectsInput>
  }

  export type projectsCreateNestedManyWithoutUsersInput = {
    create?: XOR<projectsCreateWithoutUsersInput, projectsUncheckedCreateWithoutUsersInput> | projectsCreateWithoutUsersInput[] | projectsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutUsersInput | projectsCreateOrConnectWithoutUsersInput[]
    createMany?: projectsCreateManyUsersInputEnvelope
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
  }

  export type projectsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<projectsCreateWithoutUsersInput, projectsUncheckedCreateWithoutUsersInput> | projectsCreateWithoutUsersInput[] | projectsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutUsersInput | projectsCreateOrConnectWithoutUsersInput[]
    createMany?: projectsCreateManyUsersInputEnvelope
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
  }

  export type NullableEnumusers_roleFieldUpdateOperationsInput = {
    set?: $Enums.users_role | null
  }

  export type projectsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<projectsCreateWithoutUsersInput, projectsUncheckedCreateWithoutUsersInput> | projectsCreateWithoutUsersInput[] | projectsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutUsersInput | projectsCreateOrConnectWithoutUsersInput[]
    upsert?: projectsUpsertWithWhereUniqueWithoutUsersInput | projectsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: projectsCreateManyUsersInputEnvelope
    set?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    disconnect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    delete?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    update?: projectsUpdateWithWhereUniqueWithoutUsersInput | projectsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: projectsUpdateManyWithWhereWithoutUsersInput | projectsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: projectsScalarWhereInput | projectsScalarWhereInput[]
  }

  export type projectsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<projectsCreateWithoutUsersInput, projectsUncheckedCreateWithoutUsersInput> | projectsCreateWithoutUsersInput[] | projectsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: projectsCreateOrConnectWithoutUsersInput | projectsCreateOrConnectWithoutUsersInput[]
    upsert?: projectsUpsertWithWhereUniqueWithoutUsersInput | projectsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: projectsCreateManyUsersInputEnvelope
    set?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    disconnect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    delete?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    connect?: projectsWhereUniqueInput | projectsWhereUniqueInput[]
    update?: projectsUpdateWithWhereUniqueWithoutUsersInput | projectsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: projectsUpdateManyWithWhereWithoutUsersInput | projectsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: projectsScalarWhereInput | projectsScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumprojects_stepNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_step | Enumprojects_stepFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_step[] | null
    notIn?: $Enums.projects_step[] | null
    not?: NestedEnumprojects_stepNullableFilter<$PrismaModel> | $Enums.projects_step | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumprojects_stepNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.projects_step | Enumprojects_stepFieldRefInput<$PrismaModel> | null
    in?: $Enums.projects_step[] | null
    notIn?: $Enums.projects_step[] | null
    not?: NestedEnumprojects_stepNullableWithAggregatesFilter<$PrismaModel> | $Enums.projects_step | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumprojects_stepNullableFilter<$PrismaModel>
    _max?: NestedEnumprojects_stepNullableFilter<$PrismaModel>
  }

  export type NestedEnumusers_roleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_role[] | null
    notIn?: $Enums.users_role[] | null
    not?: NestedEnumusers_roleNullableFilter<$PrismaModel> | $Enums.users_role | null
  }

  export type NestedEnumusers_roleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.users_role[] | null
    notIn?: $Enums.users_role[] | null
    not?: NestedEnumusers_roleNullableWithAggregatesFilter<$PrismaModel> | $Enums.users_role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumusers_roleNullableFilter<$PrismaModel>
    _max?: NestedEnumusers_roleNullableFilter<$PrismaModel>
  }

  export type projectsCreateWithoutMotorsInput = {
    name: string
    input_P: Decimal | DecimalJsLike | number | string
    input_n_ct: Decimal | DecimalJsLike | number | string
    input_L: Decimal | DecimalJsLike | number | string
    efficiency?: Decimal | DecimalJsLike | number | string | null
    Pct?: Decimal | DecimalJsLike | number | string | null
    total_ratio?: Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: Decimal | DecimalJsLike | number | string | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: $Enums.projects_step | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    users: usersCreateNestedOneWithoutProjectsInput
  }

  export type projectsUncheckedCreateWithoutMotorsInput = {
    id?: number
    user_id: number
    name: string
    input_P: Decimal | DecimalJsLike | number | string
    input_n_ct: Decimal | DecimalJsLike | number | string
    input_L: Decimal | DecimalJsLike | number | string
    efficiency?: Decimal | DecimalJsLike | number | string | null
    Pct?: Decimal | DecimalJsLike | number | string | null
    total_ratio?: Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: Decimal | DecimalJsLike | number | string | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: $Enums.projects_step | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type projectsCreateOrConnectWithoutMotorsInput = {
    where: projectsWhereUniqueInput
    create: XOR<projectsCreateWithoutMotorsInput, projectsUncheckedCreateWithoutMotorsInput>
  }

  export type projectsCreateManyMotorsInputEnvelope = {
    data: projectsCreateManyMotorsInput | projectsCreateManyMotorsInput[]
    skipDuplicates?: boolean
  }

  export type projectsUpsertWithWhereUniqueWithoutMotorsInput = {
    where: projectsWhereUniqueInput
    update: XOR<projectsUpdateWithoutMotorsInput, projectsUncheckedUpdateWithoutMotorsInput>
    create: XOR<projectsCreateWithoutMotorsInput, projectsUncheckedCreateWithoutMotorsInput>
  }

  export type projectsUpdateWithWhereUniqueWithoutMotorsInput = {
    where: projectsWhereUniqueInput
    data: XOR<projectsUpdateWithoutMotorsInput, projectsUncheckedUpdateWithoutMotorsInput>
  }

  export type projectsUpdateManyWithWhereWithoutMotorsInput = {
    where: projectsScalarWhereInput
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyWithoutMotorsInput>
  }

  export type projectsScalarWhereInput = {
    AND?: projectsScalarWhereInput | projectsScalarWhereInput[]
    OR?: projectsScalarWhereInput[]
    NOT?: projectsScalarWhereInput | projectsScalarWhereInput[]
    id?: IntFilter<"projects"> | number
    user_id?: IntFilter<"projects"> | number
    name?: StringFilter<"projects"> | string
    input_P?: DecimalFilter<"projects"> | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFilter<"projects"> | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFilter<"projects"> | Decimal | DecimalJsLike | number | string
    efficiency?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    Pct?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    total_ratio?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    transmission?: JsonNullableFilter<"projects">
    shafts?: JsonNullableFilter<"projects">
    safety_factor?: DecimalNullableFilter<"projects"> | Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: IntNullableFilter<"projects"> | number | null
    selected_motor_snapshot?: JsonNullableFilter<"projects">
    design_result?: JsonNullableFilter<"projects">
    step?: Enumprojects_stepNullableFilter<"projects"> | $Enums.projects_step | null
    deletedBy?: IntNullableFilter<"projects"> | number | null
    isDeleted?: BoolNullableFilter<"projects"> | boolean | null
    deletedAt?: DateTimeNullableFilter<"projects"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"projects"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"projects"> | Date | string | null
  }

  export type usersCreateWithoutProjectsInput = {
    name: string
    email: string
    password: string
    role?: $Enums.users_role | null
    reset_token?: string | null
    reset_token_expiry?: Date | string | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type usersUncheckedCreateWithoutProjectsInput = {
    id?: number
    name: string
    email: string
    password: string
    role?: $Enums.users_role | null
    reset_token?: string | null
    reset_token_expiry?: Date | string | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type usersCreateOrConnectWithoutProjectsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutProjectsInput, usersUncheckedCreateWithoutProjectsInput>
  }

  export type motorsCreateWithoutProjectsInput = {
    code: string
    P_dm: Decimal | DecimalJsLike | number | string
    n_dm: number
    cos_phi?: Decimal | DecimalJsLike | number | string | null
    eta_motor?: Decimal | DecimalJsLike | number | string | null
    mass_kg?: Decimal | DecimalJsLike | number | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    is_active?: boolean | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type motorsUncheckedCreateWithoutProjectsInput = {
    id?: number
    code: string
    P_dm: Decimal | DecimalJsLike | number | string
    n_dm: number
    cos_phi?: Decimal | DecimalJsLike | number | string | null
    eta_motor?: Decimal | DecimalJsLike | number | string | null
    mass_kg?: Decimal | DecimalJsLike | number | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    is_active?: boolean | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type motorsCreateOrConnectWithoutProjectsInput = {
    where: motorsWhereUniqueInput
    create: XOR<motorsCreateWithoutProjectsInput, motorsUncheckedCreateWithoutProjectsInput>
  }

  export type usersUpsertWithoutProjectsInput = {
    update: XOR<usersUpdateWithoutProjectsInput, usersUncheckedUpdateWithoutProjectsInput>
    create: XOR<usersCreateWithoutProjectsInput, usersUncheckedCreateWithoutProjectsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutProjectsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutProjectsInput, usersUncheckedUpdateWithoutProjectsInput>
  }

  export type usersUpdateWithoutProjectsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateWithoutProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: NullableEnumusers_roleFieldUpdateOperationsInput | $Enums.users_role | null
    reset_token?: NullableStringFieldUpdateOperationsInput | string | null
    reset_token_expiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type motorsUpsertWithoutProjectsInput = {
    update: XOR<motorsUpdateWithoutProjectsInput, motorsUncheckedUpdateWithoutProjectsInput>
    create: XOR<motorsCreateWithoutProjectsInput, motorsUncheckedCreateWithoutProjectsInput>
    where?: motorsWhereInput
  }

  export type motorsUpdateToOneWithWhereWithoutProjectsInput = {
    where?: motorsWhereInput
    data: XOR<motorsUpdateWithoutProjectsInput, motorsUncheckedUpdateWithoutProjectsInput>
  }

  export type motorsUpdateWithoutProjectsInput = {
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    eta_motor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    mass_kg?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type motorsUncheckedUpdateWithoutProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    eta_motor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    mass_kg?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type projectsCreateWithoutUsersInput = {
    name: string
    input_P: Decimal | DecimalJsLike | number | string
    input_n_ct: Decimal | DecimalJsLike | number | string
    input_L: Decimal | DecimalJsLike | number | string
    efficiency?: Decimal | DecimalJsLike | number | string | null
    Pct?: Decimal | DecimalJsLike | number | string | null
    total_ratio?: Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: Decimal | DecimalJsLike | number | string | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: $Enums.projects_step | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    motors?: motorsCreateNestedOneWithoutProjectsInput
  }

  export type projectsUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    input_P: Decimal | DecimalJsLike | number | string
    input_n_ct: Decimal | DecimalJsLike | number | string
    input_L: Decimal | DecimalJsLike | number | string
    efficiency?: Decimal | DecimalJsLike | number | string | null
    Pct?: Decimal | DecimalJsLike | number | string | null
    total_ratio?: Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: number | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: $Enums.projects_step | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type projectsCreateOrConnectWithoutUsersInput = {
    where: projectsWhereUniqueInput
    create: XOR<projectsCreateWithoutUsersInput, projectsUncheckedCreateWithoutUsersInput>
  }

  export type projectsCreateManyUsersInputEnvelope = {
    data: projectsCreateManyUsersInput | projectsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type projectsUpsertWithWhereUniqueWithoutUsersInput = {
    where: projectsWhereUniqueInput
    update: XOR<projectsUpdateWithoutUsersInput, projectsUncheckedUpdateWithoutUsersInput>
    create: XOR<projectsCreateWithoutUsersInput, projectsUncheckedCreateWithoutUsersInput>
  }

  export type projectsUpdateWithWhereUniqueWithoutUsersInput = {
    where: projectsWhereUniqueInput
    data: XOR<projectsUpdateWithoutUsersInput, projectsUncheckedUpdateWithoutUsersInput>
  }

  export type projectsUpdateManyWithWhereWithoutUsersInput = {
    where: projectsScalarWhereInput
    data: XOR<projectsUpdateManyMutationInput, projectsUncheckedUpdateManyWithoutUsersInput>
  }

  export type projectsCreateManyMotorsInput = {
    id?: number
    user_id: number
    name: string
    input_P: Decimal | DecimalJsLike | number | string
    input_n_ct: Decimal | DecimalJsLike | number | string
    input_L: Decimal | DecimalJsLike | number | string
    efficiency?: Decimal | DecimalJsLike | number | string | null
    Pct?: Decimal | DecimalJsLike | number | string | null
    total_ratio?: Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: Decimal | DecimalJsLike | number | string | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: $Enums.projects_step | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type projectsUpdateWithoutMotorsInput = {
    name?: StringFieldUpdateOperationsInput | string
    input_P?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Pct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: NullableEnumprojects_stepFieldUpdateOperationsInput | $Enums.projects_step | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type projectsUncheckedUpdateWithoutMotorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    input_P?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Pct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: NullableEnumprojects_stepFieldUpdateOperationsInput | $Enums.projects_step | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type projectsUncheckedUpdateManyWithoutMotorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    input_P?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Pct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: NullableEnumprojects_stepFieldUpdateOperationsInput | $Enums.projects_step | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type projectsCreateManyUsersInput = {
    id?: number
    name: string
    input_P: Decimal | DecimalJsLike | number | string
    input_n_ct: Decimal | DecimalJsLike | number | string
    input_L: Decimal | DecimalJsLike | number | string
    efficiency?: Decimal | DecimalJsLike | number | string | null
    Pct?: Decimal | DecimalJsLike | number | string | null
    total_ratio?: Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: number | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: $Enums.projects_step | null
    deletedBy?: number | null
    isDeleted?: boolean | null
    deletedAt?: Date | string | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type projectsUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    input_P?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Pct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: NullableEnumprojects_stepFieldUpdateOperationsInput | $Enums.projects_step | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    motors?: motorsUpdateOneWithoutProjectsNestedInput
  }

  export type projectsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    input_P?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Pct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: NullableIntFieldUpdateOperationsInput | number | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: NullableEnumprojects_stepFieldUpdateOperationsInput | $Enums.projects_step | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type projectsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    input_P?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_n_ct?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    input_L?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    Pct?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    total_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transmission?: NullableJsonNullValueInput | InputJsonValue
    shafts?: NullableJsonNullValueInput | InputJsonValue
    safety_factor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    selected_motor_id?: NullableIntFieldUpdateOperationsInput | number | null
    selected_motor_snapshot?: NullableJsonNullValueInput | InputJsonValue
    design_result?: NullableJsonNullValueInput | InputJsonValue
    step?: NullableEnumprojects_stepFieldUpdateOperationsInput | $Enums.projects_step | null
    deletedBy?: NullableIntFieldUpdateOperationsInput | number | null
    isDeleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}