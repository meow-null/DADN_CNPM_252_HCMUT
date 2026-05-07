
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
 * Model material_grades
 * 
 */
export type material_grades = $Result.DefaultSelection<Prisma.$material_gradesPayload>
/**
 * Model standard_modules
 * 
 */
export type standard_modules = $Result.DefaultSelection<Prisma.$standard_modulesPayload>
/**
 * Model standard_center_distances
 * 
 */
export type standard_center_distances = $Result.DefaultSelection<Prisma.$standard_center_distancesPayload>
/**
 * Model standard_shaft_diameters
 * 
 */
export type standard_shaft_diameters = $Result.DefaultSelection<Prisma.$standard_shaft_diametersPayload>
/**
 * Model key_dimensions
 * 
 */
export type key_dimensions = $Result.DefaultSelection<Prisma.$key_dimensionsPayload>
/**
 * Model standard_key_lengths
 * 
 */
export type standard_key_lengths = $Result.DefaultSelection<Prisma.$standard_key_lengthsPayload>

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

  /**
   * `prisma.material_grades`: Exposes CRUD operations for the **material_grades** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Material_grades
    * const material_grades = await prisma.material_grades.findMany()
    * ```
    */
  get material_grades(): Prisma.material_gradesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.standard_modules`: Exposes CRUD operations for the **standard_modules** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Standard_modules
    * const standard_modules = await prisma.standard_modules.findMany()
    * ```
    */
  get standard_modules(): Prisma.standard_modulesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.standard_center_distances`: Exposes CRUD operations for the **standard_center_distances** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Standard_center_distances
    * const standard_center_distances = await prisma.standard_center_distances.findMany()
    * ```
    */
  get standard_center_distances(): Prisma.standard_center_distancesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.standard_shaft_diameters`: Exposes CRUD operations for the **standard_shaft_diameters** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Standard_shaft_diameters
    * const standard_shaft_diameters = await prisma.standard_shaft_diameters.findMany()
    * ```
    */
  get standard_shaft_diameters(): Prisma.standard_shaft_diametersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.key_dimensions`: Exposes CRUD operations for the **key_dimensions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Key_dimensions
    * const key_dimensions = await prisma.key_dimensions.findMany()
    * ```
    */
  get key_dimensions(): Prisma.key_dimensionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.standard_key_lengths`: Exposes CRUD operations for the **standard_key_lengths** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Standard_key_lengths
    * const standard_key_lengths = await prisma.standard_key_lengths.findMany()
    * ```
    */
  get standard_key_lengths(): Prisma.standard_key_lengthsDelegate<ExtArgs, ClientOptions>;
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
    users: 'users',
    material_grades: 'material_grades',
    standard_modules: 'standard_modules',
    standard_center_distances: 'standard_center_distances',
    standard_shaft_diameters: 'standard_shaft_diameters',
    key_dimensions: 'key_dimensions',
    standard_key_lengths: 'standard_key_lengths'
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
      modelProps: "bearings" | "chains" | "motors" | "projects" | "users" | "material_grades" | "standard_modules" | "standard_center_distances" | "standard_shaft_diameters" | "key_dimensions" | "standard_key_lengths"
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
      material_grades: {
        payload: Prisma.$material_gradesPayload<ExtArgs>
        fields: Prisma.material_gradesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.material_gradesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$material_gradesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.material_gradesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$material_gradesPayload>
          }
          findFirst: {
            args: Prisma.material_gradesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$material_gradesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.material_gradesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$material_gradesPayload>
          }
          findMany: {
            args: Prisma.material_gradesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$material_gradesPayload>[]
          }
          create: {
            args: Prisma.material_gradesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$material_gradesPayload>
          }
          createMany: {
            args: Prisma.material_gradesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.material_gradesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$material_gradesPayload>
          }
          update: {
            args: Prisma.material_gradesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$material_gradesPayload>
          }
          deleteMany: {
            args: Prisma.material_gradesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.material_gradesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.material_gradesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$material_gradesPayload>
          }
          aggregate: {
            args: Prisma.Material_gradesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaterial_grades>
          }
          groupBy: {
            args: Prisma.material_gradesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Material_gradesGroupByOutputType>[]
          }
          count: {
            args: Prisma.material_gradesCountArgs<ExtArgs>
            result: $Utils.Optional<Material_gradesCountAggregateOutputType> | number
          }
        }
      }
      standard_modules: {
        payload: Prisma.$standard_modulesPayload<ExtArgs>
        fields: Prisma.standard_modulesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.standard_modulesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_modulesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.standard_modulesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_modulesPayload>
          }
          findFirst: {
            args: Prisma.standard_modulesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_modulesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.standard_modulesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_modulesPayload>
          }
          findMany: {
            args: Prisma.standard_modulesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_modulesPayload>[]
          }
          create: {
            args: Prisma.standard_modulesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_modulesPayload>
          }
          createMany: {
            args: Prisma.standard_modulesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.standard_modulesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_modulesPayload>
          }
          update: {
            args: Prisma.standard_modulesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_modulesPayload>
          }
          deleteMany: {
            args: Prisma.standard_modulesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.standard_modulesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.standard_modulesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_modulesPayload>
          }
          aggregate: {
            args: Prisma.Standard_modulesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStandard_modules>
          }
          groupBy: {
            args: Prisma.standard_modulesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Standard_modulesGroupByOutputType>[]
          }
          count: {
            args: Prisma.standard_modulesCountArgs<ExtArgs>
            result: $Utils.Optional<Standard_modulesCountAggregateOutputType> | number
          }
        }
      }
      standard_center_distances: {
        payload: Prisma.$standard_center_distancesPayload<ExtArgs>
        fields: Prisma.standard_center_distancesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.standard_center_distancesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_center_distancesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.standard_center_distancesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_center_distancesPayload>
          }
          findFirst: {
            args: Prisma.standard_center_distancesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_center_distancesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.standard_center_distancesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_center_distancesPayload>
          }
          findMany: {
            args: Prisma.standard_center_distancesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_center_distancesPayload>[]
          }
          create: {
            args: Prisma.standard_center_distancesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_center_distancesPayload>
          }
          createMany: {
            args: Prisma.standard_center_distancesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.standard_center_distancesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_center_distancesPayload>
          }
          update: {
            args: Prisma.standard_center_distancesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_center_distancesPayload>
          }
          deleteMany: {
            args: Prisma.standard_center_distancesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.standard_center_distancesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.standard_center_distancesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_center_distancesPayload>
          }
          aggregate: {
            args: Prisma.Standard_center_distancesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStandard_center_distances>
          }
          groupBy: {
            args: Prisma.standard_center_distancesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Standard_center_distancesGroupByOutputType>[]
          }
          count: {
            args: Prisma.standard_center_distancesCountArgs<ExtArgs>
            result: $Utils.Optional<Standard_center_distancesCountAggregateOutputType> | number
          }
        }
      }
      standard_shaft_diameters: {
        payload: Prisma.$standard_shaft_diametersPayload<ExtArgs>
        fields: Prisma.standard_shaft_diametersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.standard_shaft_diametersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_shaft_diametersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.standard_shaft_diametersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_shaft_diametersPayload>
          }
          findFirst: {
            args: Prisma.standard_shaft_diametersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_shaft_diametersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.standard_shaft_diametersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_shaft_diametersPayload>
          }
          findMany: {
            args: Prisma.standard_shaft_diametersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_shaft_diametersPayload>[]
          }
          create: {
            args: Prisma.standard_shaft_diametersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_shaft_diametersPayload>
          }
          createMany: {
            args: Prisma.standard_shaft_diametersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.standard_shaft_diametersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_shaft_diametersPayload>
          }
          update: {
            args: Prisma.standard_shaft_diametersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_shaft_diametersPayload>
          }
          deleteMany: {
            args: Prisma.standard_shaft_diametersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.standard_shaft_diametersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.standard_shaft_diametersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_shaft_diametersPayload>
          }
          aggregate: {
            args: Prisma.Standard_shaft_diametersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStandard_shaft_diameters>
          }
          groupBy: {
            args: Prisma.standard_shaft_diametersGroupByArgs<ExtArgs>
            result: $Utils.Optional<Standard_shaft_diametersGroupByOutputType>[]
          }
          count: {
            args: Prisma.standard_shaft_diametersCountArgs<ExtArgs>
            result: $Utils.Optional<Standard_shaft_diametersCountAggregateOutputType> | number
          }
        }
      }
      key_dimensions: {
        payload: Prisma.$key_dimensionsPayload<ExtArgs>
        fields: Prisma.key_dimensionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.key_dimensionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$key_dimensionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.key_dimensionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$key_dimensionsPayload>
          }
          findFirst: {
            args: Prisma.key_dimensionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$key_dimensionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.key_dimensionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$key_dimensionsPayload>
          }
          findMany: {
            args: Prisma.key_dimensionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$key_dimensionsPayload>[]
          }
          create: {
            args: Prisma.key_dimensionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$key_dimensionsPayload>
          }
          createMany: {
            args: Prisma.key_dimensionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.key_dimensionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$key_dimensionsPayload>
          }
          update: {
            args: Prisma.key_dimensionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$key_dimensionsPayload>
          }
          deleteMany: {
            args: Prisma.key_dimensionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.key_dimensionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.key_dimensionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$key_dimensionsPayload>
          }
          aggregate: {
            args: Prisma.Key_dimensionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKey_dimensions>
          }
          groupBy: {
            args: Prisma.key_dimensionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Key_dimensionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.key_dimensionsCountArgs<ExtArgs>
            result: $Utils.Optional<Key_dimensionsCountAggregateOutputType> | number
          }
        }
      }
      standard_key_lengths: {
        payload: Prisma.$standard_key_lengthsPayload<ExtArgs>
        fields: Prisma.standard_key_lengthsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.standard_key_lengthsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_key_lengthsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.standard_key_lengthsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_key_lengthsPayload>
          }
          findFirst: {
            args: Prisma.standard_key_lengthsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_key_lengthsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.standard_key_lengthsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_key_lengthsPayload>
          }
          findMany: {
            args: Prisma.standard_key_lengthsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_key_lengthsPayload>[]
          }
          create: {
            args: Prisma.standard_key_lengthsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_key_lengthsPayload>
          }
          createMany: {
            args: Prisma.standard_key_lengthsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.standard_key_lengthsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_key_lengthsPayload>
          }
          update: {
            args: Prisma.standard_key_lengthsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_key_lengthsPayload>
          }
          deleteMany: {
            args: Prisma.standard_key_lengthsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.standard_key_lengthsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.standard_key_lengthsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$standard_key_lengthsPayload>
          }
          aggregate: {
            args: Prisma.Standard_key_lengthsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStandard_key_lengths>
          }
          groupBy: {
            args: Prisma.standard_key_lengthsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Standard_key_lengthsGroupByOutputType>[]
          }
          count: {
            args: Prisma.standard_key_lengthsCountArgs<ExtArgs>
            result: $Utils.Optional<Standard_key_lengthsCountAggregateOutputType> | number
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
    material_grades?: material_gradesOmit
    standard_modules?: standard_modulesOmit
    standard_center_distances?: standard_center_distancesOmit
    standard_shaft_diameters?: standard_shaft_diametersOmit
    key_dimensions?: key_dimensionsOmit
    standard_key_lengths?: standard_key_lengthsOmit
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
    inner_d: number | null
    outer_D: number | null
    width_B: number | null
    C: number | null
    C0: number | null
    e: number | null
    Y: number | null
    alpha_deg: number | null
  }

  export type BearingsSumAggregateOutputType = {
    id: number | null
    inner_d: number | null
    outer_D: number | null
    width_B: number | null
    C: number | null
    C0: number | null
    e: number | null
    Y: number | null
    alpha_deg: number | null
  }

  export type BearingsMinAggregateOutputType = {
    id: number | null
    code: string | null
    type: string | null
    inner_d: number | null
    outer_D: number | null
    width_B: number | null
    C: number | null
    C0: number | null
    e: number | null
    Y: number | null
    alpha_deg: number | null
    is_active: boolean | null
  }

  export type BearingsMaxAggregateOutputType = {
    id: number | null
    code: string | null
    type: string | null
    inner_d: number | null
    outer_D: number | null
    width_B: number | null
    C: number | null
    C0: number | null
    e: number | null
    Y: number | null
    alpha_deg: number | null
    is_active: boolean | null
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
    e: number
    Y: number
    alpha_deg: number
    is_active: number
    _all: number
  }


  export type BearingsAvgAggregateInputType = {
    id?: true
    inner_d?: true
    outer_D?: true
    width_B?: true
    C?: true
    C0?: true
    e?: true
    Y?: true
    alpha_deg?: true
  }

  export type BearingsSumAggregateInputType = {
    id?: true
    inner_d?: true
    outer_D?: true
    width_B?: true
    C?: true
    C0?: true
    e?: true
    Y?: true
    alpha_deg?: true
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
    e?: true
    Y?: true
    alpha_deg?: true
    is_active?: true
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
    e?: true
    Y?: true
    alpha_deg?: true
    is_active?: true
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
    e?: true
    Y?: true
    alpha_deg?: true
    is_active?: true
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
    inner_d: number
    outer_D: number
    width_B: number
    C: number | null
    C0: number | null
    e: number | null
    Y: number | null
    alpha_deg: number | null
    is_active: boolean | null
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
    e?: boolean
    Y?: boolean
    alpha_deg?: boolean
    is_active?: boolean
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
    e?: boolean
    Y?: boolean
    alpha_deg?: boolean
    is_active?: boolean
  }

  export type bearingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "type" | "inner_d" | "outer_D" | "width_B" | "C" | "C0" | "e" | "Y" | "alpha_deg" | "is_active", ExtArgs["result"]["bearings"]>

  export type $bearingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bearings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      type: string | null
      inner_d: number
      outer_D: number
      width_B: number
      C: number | null
      C0: number | null
      e: number | null
      Y: number | null
      alpha_deg: number | null
      is_active: boolean | null
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
    readonly inner_d: FieldRef<"bearings", 'Float'>
    readonly outer_D: FieldRef<"bearings", 'Float'>
    readonly width_B: FieldRef<"bearings", 'Float'>
    readonly C: FieldRef<"bearings", 'Float'>
    readonly C0: FieldRef<"bearings", 'Float'>
    readonly e: FieldRef<"bearings", 'Float'>
    readonly Y: FieldRef<"bearings", 'Float'>
    readonly alpha_deg: FieldRef<"bearings", 'Float'>
    readonly is_active: FieldRef<"bearings", 'Boolean'>
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
    pitch: number | null
    breaking_load: number | null
    mass_per_m: number | null
    A_mm2: number | null
    s_allow: number | null
    n_ref: number | null
  }

  export type ChainsSumAggregateOutputType = {
    id: number | null
    pitch: number | null
    breaking_load: number | null
    mass_per_m: number | null
    A_mm2: number | null
    s_allow: number | null
    n_ref: number | null
  }

  export type ChainsMinAggregateOutputType = {
    id: number | null
    pitch: number | null
    breaking_load: number | null
    mass_per_m: number | null
    A_mm2: number | null
    s_allow: number | null
    n_ref: number | null
    is_active: boolean | null
  }

  export type ChainsMaxAggregateOutputType = {
    id: number | null
    pitch: number | null
    breaking_load: number | null
    mass_per_m: number | null
    A_mm2: number | null
    s_allow: number | null
    n_ref: number | null
    is_active: boolean | null
  }

  export type ChainsCountAggregateOutputType = {
    id: number
    pitch: number
    breaking_load: number
    mass_per_m: number
    A_mm2: number
    s_allow: number
    n_ref: number
    is_active: number
    _all: number
  }


  export type ChainsAvgAggregateInputType = {
    id?: true
    pitch?: true
    breaking_load?: true
    mass_per_m?: true
    A_mm2?: true
    s_allow?: true
    n_ref?: true
  }

  export type ChainsSumAggregateInputType = {
    id?: true
    pitch?: true
    breaking_load?: true
    mass_per_m?: true
    A_mm2?: true
    s_allow?: true
    n_ref?: true
  }

  export type ChainsMinAggregateInputType = {
    id?: true
    pitch?: true
    breaking_load?: true
    mass_per_m?: true
    A_mm2?: true
    s_allow?: true
    n_ref?: true
    is_active?: true
  }

  export type ChainsMaxAggregateInputType = {
    id?: true
    pitch?: true
    breaking_load?: true
    mass_per_m?: true
    A_mm2?: true
    s_allow?: true
    n_ref?: true
    is_active?: true
  }

  export type ChainsCountAggregateInputType = {
    id?: true
    pitch?: true
    breaking_load?: true
    mass_per_m?: true
    A_mm2?: true
    s_allow?: true
    n_ref?: true
    is_active?: true
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
    pitch: number
    breaking_load: number | null
    mass_per_m: number | null
    A_mm2: number | null
    s_allow: number | null
    n_ref: number | null
    is_active: boolean | null
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
    A_mm2?: boolean
    s_allow?: boolean
    n_ref?: boolean
    is_active?: boolean
  }, ExtArgs["result"]["chains"]>



  export type chainsSelectScalar = {
    id?: boolean
    pitch?: boolean
    breaking_load?: boolean
    mass_per_m?: boolean
    A_mm2?: boolean
    s_allow?: boolean
    n_ref?: boolean
    is_active?: boolean
  }

  export type chainsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pitch" | "breaking_load" | "mass_per_m" | "A_mm2" | "s_allow" | "n_ref" | "is_active", ExtArgs["result"]["chains"]>

  export type $chainsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "chains"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pitch: number
      breaking_load: number | null
      mass_per_m: number | null
      A_mm2: number | null
      s_allow: number | null
      n_ref: number | null
      is_active: boolean | null
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
    readonly pitch: FieldRef<"chains", 'Float'>
    readonly breaking_load: FieldRef<"chains", 'Float'>
    readonly mass_per_m: FieldRef<"chains", 'Float'>
    readonly A_mm2: FieldRef<"chains", 'Float'>
    readonly s_allow: FieldRef<"chains", 'Float'>
    readonly n_ref: FieldRef<"chains", 'Int'>
    readonly is_active: FieldRef<"chains", 'Boolean'>
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
    efficiency: Decimal | null
    cos_phi: Decimal | null
    t_start_ratio: Decimal | null
    t_max_ratio: Decimal | null
    mass_kg: Decimal | null
    price: Decimal | null
    deletedBy: number | null
  }

  export type MotorsSumAggregateOutputType = {
    id: number | null
    P_dm: Decimal | null
    n_dm: number | null
    efficiency: Decimal | null
    cos_phi: Decimal | null
    t_start_ratio: Decimal | null
    t_max_ratio: Decimal | null
    mass_kg: Decimal | null
    price: Decimal | null
    deletedBy: number | null
  }

  export type MotorsMinAggregateOutputType = {
    id: number | null
    series: string | null
    code: string | null
    P_dm: Decimal | null
    n_dm: number | null
    efficiency: Decimal | null
    cos_phi: Decimal | null
    t_start_ratio: Decimal | null
    t_max_ratio: Decimal | null
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
    series: string | null
    code: string | null
    P_dm: Decimal | null
    n_dm: number | null
    efficiency: Decimal | null
    cos_phi: Decimal | null
    t_start_ratio: Decimal | null
    t_max_ratio: Decimal | null
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
    series: number
    code: number
    P_dm: number
    n_dm: number
    efficiency: number
    cos_phi: number
    t_start_ratio: number
    t_max_ratio: number
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
    efficiency?: true
    cos_phi?: true
    t_start_ratio?: true
    t_max_ratio?: true
    mass_kg?: true
    price?: true
    deletedBy?: true
  }

  export type MotorsSumAggregateInputType = {
    id?: true
    P_dm?: true
    n_dm?: true
    efficiency?: true
    cos_phi?: true
    t_start_ratio?: true
    t_max_ratio?: true
    mass_kg?: true
    price?: true
    deletedBy?: true
  }

  export type MotorsMinAggregateInputType = {
    id?: true
    series?: true
    code?: true
    P_dm?: true
    n_dm?: true
    efficiency?: true
    cos_phi?: true
    t_start_ratio?: true
    t_max_ratio?: true
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
    series?: true
    code?: true
    P_dm?: true
    n_dm?: true
    efficiency?: true
    cos_phi?: true
    t_start_ratio?: true
    t_max_ratio?: true
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
    series?: true
    code?: true
    P_dm?: true
    n_dm?: true
    efficiency?: true
    cos_phi?: true
    t_start_ratio?: true
    t_max_ratio?: true
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
    series: string | null
    code: string
    P_dm: Decimal
    n_dm: number
    efficiency: Decimal | null
    cos_phi: Decimal | null
    t_start_ratio: Decimal | null
    t_max_ratio: Decimal | null
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
    series?: boolean
    code?: boolean
    P_dm?: boolean
    n_dm?: boolean
    efficiency?: boolean
    cos_phi?: boolean
    t_start_ratio?: boolean
    t_max_ratio?: boolean
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
    series?: boolean
    code?: boolean
    P_dm?: boolean
    n_dm?: boolean
    efficiency?: boolean
    cos_phi?: boolean
    t_start_ratio?: boolean
    t_max_ratio?: boolean
    mass_kg?: boolean
    price?: boolean
    is_active?: boolean
    deletedBy?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type motorsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "series" | "code" | "P_dm" | "n_dm" | "efficiency" | "cos_phi" | "t_start_ratio" | "t_max_ratio" | "mass_kg" | "price" | "is_active" | "deletedBy" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["motors"]>
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
      series: string | null
      code: string
      P_dm: Prisma.Decimal
      n_dm: number
      efficiency: Prisma.Decimal | null
      cos_phi: Prisma.Decimal | null
      t_start_ratio: Prisma.Decimal | null
      t_max_ratio: Prisma.Decimal | null
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
    readonly series: FieldRef<"motors", 'String'>
    readonly code: FieldRef<"motors", 'String'>
    readonly P_dm: FieldRef<"motors", 'Decimal'>
    readonly n_dm: FieldRef<"motors", 'Int'>
    readonly efficiency: FieldRef<"motors", 'Decimal'>
    readonly cos_phi: FieldRef<"motors", 'Decimal'>
    readonly t_start_ratio: FieldRef<"motors", 'Decimal'>
    readonly t_max_ratio: FieldRef<"motors", 'Decimal'>
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
   * Model material_grades
   */

  export type AggregateMaterial_grades = {
    _count: Material_gradesCountAggregateOutputType | null
    _avg: Material_gradesAvgAggregateOutputType | null
    _sum: Material_gradesSumAggregateOutputType | null
    _min: Material_gradesMinAggregateOutputType | null
    _max: Material_gradesMaxAggregateOutputType | null
  }

  export type Material_gradesAvgAggregateOutputType = {
    id: number | null
    HB: number | null
    sigma_b: number | null
    sigma_ch: number | null
    sigma_Hlim: number | null
    sigma_Flim: number | null
  }

  export type Material_gradesSumAggregateOutputType = {
    id: number | null
    HB: number | null
    sigma_b: number | null
    sigma_ch: number | null
    sigma_Hlim: number | null
    sigma_Flim: number | null
  }

  export type Material_gradesMinAggregateOutputType = {
    id: number | null
    grade_name: string | null
    HB: number | null
    sigma_b: number | null
    sigma_ch: number | null
    sigma_Hlim: number | null
    sigma_Flim: number | null
  }

  export type Material_gradesMaxAggregateOutputType = {
    id: number | null
    grade_name: string | null
    HB: number | null
    sigma_b: number | null
    sigma_ch: number | null
    sigma_Hlim: number | null
    sigma_Flim: number | null
  }

  export type Material_gradesCountAggregateOutputType = {
    id: number
    grade_name: number
    HB: number
    sigma_b: number
    sigma_ch: number
    sigma_Hlim: number
    sigma_Flim: number
    _all: number
  }


  export type Material_gradesAvgAggregateInputType = {
    id?: true
    HB?: true
    sigma_b?: true
    sigma_ch?: true
    sigma_Hlim?: true
    sigma_Flim?: true
  }

  export type Material_gradesSumAggregateInputType = {
    id?: true
    HB?: true
    sigma_b?: true
    sigma_ch?: true
    sigma_Hlim?: true
    sigma_Flim?: true
  }

  export type Material_gradesMinAggregateInputType = {
    id?: true
    grade_name?: true
    HB?: true
    sigma_b?: true
    sigma_ch?: true
    sigma_Hlim?: true
    sigma_Flim?: true
  }

  export type Material_gradesMaxAggregateInputType = {
    id?: true
    grade_name?: true
    HB?: true
    sigma_b?: true
    sigma_ch?: true
    sigma_Hlim?: true
    sigma_Flim?: true
  }

  export type Material_gradesCountAggregateInputType = {
    id?: true
    grade_name?: true
    HB?: true
    sigma_b?: true
    sigma_ch?: true
    sigma_Hlim?: true
    sigma_Flim?: true
    _all?: true
  }

  export type Material_gradesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which material_grades to aggregate.
     */
    where?: material_gradesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of material_grades to fetch.
     */
    orderBy?: material_gradesOrderByWithRelationInput | material_gradesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: material_gradesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` material_grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` material_grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned material_grades
    **/
    _count?: true | Material_gradesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Material_gradesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Material_gradesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Material_gradesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Material_gradesMaxAggregateInputType
  }

  export type GetMaterial_gradesAggregateType<T extends Material_gradesAggregateArgs> = {
        [P in keyof T & keyof AggregateMaterial_grades]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaterial_grades[P]>
      : GetScalarType<T[P], AggregateMaterial_grades[P]>
  }




  export type material_gradesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: material_gradesWhereInput
    orderBy?: material_gradesOrderByWithAggregationInput | material_gradesOrderByWithAggregationInput[]
    by: Material_gradesScalarFieldEnum[] | Material_gradesScalarFieldEnum
    having?: material_gradesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Material_gradesCountAggregateInputType | true
    _avg?: Material_gradesAvgAggregateInputType
    _sum?: Material_gradesSumAggregateInputType
    _min?: Material_gradesMinAggregateInputType
    _max?: Material_gradesMaxAggregateInputType
  }

  export type Material_gradesGroupByOutputType = {
    id: number
    grade_name: string
    HB: number
    sigma_b: number
    sigma_ch: number
    sigma_Hlim: number
    sigma_Flim: number
    _count: Material_gradesCountAggregateOutputType | null
    _avg: Material_gradesAvgAggregateOutputType | null
    _sum: Material_gradesSumAggregateOutputType | null
    _min: Material_gradesMinAggregateOutputType | null
    _max: Material_gradesMaxAggregateOutputType | null
  }

  type GetMaterial_gradesGroupByPayload<T extends material_gradesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Material_gradesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Material_gradesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Material_gradesGroupByOutputType[P]>
            : GetScalarType<T[P], Material_gradesGroupByOutputType[P]>
        }
      >
    >


  export type material_gradesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    grade_name?: boolean
    HB?: boolean
    sigma_b?: boolean
    sigma_ch?: boolean
    sigma_Hlim?: boolean
    sigma_Flim?: boolean
  }, ExtArgs["result"]["material_grades"]>



  export type material_gradesSelectScalar = {
    id?: boolean
    grade_name?: boolean
    HB?: boolean
    sigma_b?: boolean
    sigma_ch?: boolean
    sigma_Hlim?: boolean
    sigma_Flim?: boolean
  }

  export type material_gradesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "grade_name" | "HB" | "sigma_b" | "sigma_ch" | "sigma_Hlim" | "sigma_Flim", ExtArgs["result"]["material_grades"]>

  export type $material_gradesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "material_grades"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      grade_name: string
      HB: number
      sigma_b: number
      sigma_ch: number
      sigma_Hlim: number
      sigma_Flim: number
    }, ExtArgs["result"]["material_grades"]>
    composites: {}
  }

  type material_gradesGetPayload<S extends boolean | null | undefined | material_gradesDefaultArgs> = $Result.GetResult<Prisma.$material_gradesPayload, S>

  type material_gradesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<material_gradesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Material_gradesCountAggregateInputType | true
    }

  export interface material_gradesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['material_grades'], meta: { name: 'material_grades' } }
    /**
     * Find zero or one Material_grades that matches the filter.
     * @param {material_gradesFindUniqueArgs} args - Arguments to find a Material_grades
     * @example
     * // Get one Material_grades
     * const material_grades = await prisma.material_grades.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends material_gradesFindUniqueArgs>(args: SelectSubset<T, material_gradesFindUniqueArgs<ExtArgs>>): Prisma__material_gradesClient<$Result.GetResult<Prisma.$material_gradesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Material_grades that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {material_gradesFindUniqueOrThrowArgs} args - Arguments to find a Material_grades
     * @example
     * // Get one Material_grades
     * const material_grades = await prisma.material_grades.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends material_gradesFindUniqueOrThrowArgs>(args: SelectSubset<T, material_gradesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__material_gradesClient<$Result.GetResult<Prisma.$material_gradesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Material_grades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {material_gradesFindFirstArgs} args - Arguments to find a Material_grades
     * @example
     * // Get one Material_grades
     * const material_grades = await prisma.material_grades.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends material_gradesFindFirstArgs>(args?: SelectSubset<T, material_gradesFindFirstArgs<ExtArgs>>): Prisma__material_gradesClient<$Result.GetResult<Prisma.$material_gradesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Material_grades that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {material_gradesFindFirstOrThrowArgs} args - Arguments to find a Material_grades
     * @example
     * // Get one Material_grades
     * const material_grades = await prisma.material_grades.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends material_gradesFindFirstOrThrowArgs>(args?: SelectSubset<T, material_gradesFindFirstOrThrowArgs<ExtArgs>>): Prisma__material_gradesClient<$Result.GetResult<Prisma.$material_gradesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Material_grades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {material_gradesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Material_grades
     * const material_grades = await prisma.material_grades.findMany()
     * 
     * // Get first 10 Material_grades
     * const material_grades = await prisma.material_grades.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const material_gradesWithIdOnly = await prisma.material_grades.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends material_gradesFindManyArgs>(args?: SelectSubset<T, material_gradesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$material_gradesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Material_grades.
     * @param {material_gradesCreateArgs} args - Arguments to create a Material_grades.
     * @example
     * // Create one Material_grades
     * const Material_grades = await prisma.material_grades.create({
     *   data: {
     *     // ... data to create a Material_grades
     *   }
     * })
     * 
     */
    create<T extends material_gradesCreateArgs>(args: SelectSubset<T, material_gradesCreateArgs<ExtArgs>>): Prisma__material_gradesClient<$Result.GetResult<Prisma.$material_gradesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Material_grades.
     * @param {material_gradesCreateManyArgs} args - Arguments to create many Material_grades.
     * @example
     * // Create many Material_grades
     * const material_grades = await prisma.material_grades.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends material_gradesCreateManyArgs>(args?: SelectSubset<T, material_gradesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Material_grades.
     * @param {material_gradesDeleteArgs} args - Arguments to delete one Material_grades.
     * @example
     * // Delete one Material_grades
     * const Material_grades = await prisma.material_grades.delete({
     *   where: {
     *     // ... filter to delete one Material_grades
     *   }
     * })
     * 
     */
    delete<T extends material_gradesDeleteArgs>(args: SelectSubset<T, material_gradesDeleteArgs<ExtArgs>>): Prisma__material_gradesClient<$Result.GetResult<Prisma.$material_gradesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Material_grades.
     * @param {material_gradesUpdateArgs} args - Arguments to update one Material_grades.
     * @example
     * // Update one Material_grades
     * const material_grades = await prisma.material_grades.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends material_gradesUpdateArgs>(args: SelectSubset<T, material_gradesUpdateArgs<ExtArgs>>): Prisma__material_gradesClient<$Result.GetResult<Prisma.$material_gradesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Material_grades.
     * @param {material_gradesDeleteManyArgs} args - Arguments to filter Material_grades to delete.
     * @example
     * // Delete a few Material_grades
     * const { count } = await prisma.material_grades.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends material_gradesDeleteManyArgs>(args?: SelectSubset<T, material_gradesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Material_grades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {material_gradesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Material_grades
     * const material_grades = await prisma.material_grades.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends material_gradesUpdateManyArgs>(args: SelectSubset<T, material_gradesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Material_grades.
     * @param {material_gradesUpsertArgs} args - Arguments to update or create a Material_grades.
     * @example
     * // Update or create a Material_grades
     * const material_grades = await prisma.material_grades.upsert({
     *   create: {
     *     // ... data to create a Material_grades
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Material_grades we want to update
     *   }
     * })
     */
    upsert<T extends material_gradesUpsertArgs>(args: SelectSubset<T, material_gradesUpsertArgs<ExtArgs>>): Prisma__material_gradesClient<$Result.GetResult<Prisma.$material_gradesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Material_grades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {material_gradesCountArgs} args - Arguments to filter Material_grades to count.
     * @example
     * // Count the number of Material_grades
     * const count = await prisma.material_grades.count({
     *   where: {
     *     // ... the filter for the Material_grades we want to count
     *   }
     * })
    **/
    count<T extends material_gradesCountArgs>(
      args?: Subset<T, material_gradesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Material_gradesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Material_grades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Material_gradesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Material_gradesAggregateArgs>(args: Subset<T, Material_gradesAggregateArgs>): Prisma.PrismaPromise<GetMaterial_gradesAggregateType<T>>

    /**
     * Group by Material_grades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {material_gradesGroupByArgs} args - Group by arguments.
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
      T extends material_gradesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: material_gradesGroupByArgs['orderBy'] }
        : { orderBy?: material_gradesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, material_gradesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaterial_gradesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the material_grades model
   */
  readonly fields: material_gradesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for material_grades.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__material_gradesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the material_grades model
   */
  interface material_gradesFieldRefs {
    readonly id: FieldRef<"material_grades", 'Int'>
    readonly grade_name: FieldRef<"material_grades", 'String'>
    readonly HB: FieldRef<"material_grades", 'Int'>
    readonly sigma_b: FieldRef<"material_grades", 'Float'>
    readonly sigma_ch: FieldRef<"material_grades", 'Float'>
    readonly sigma_Hlim: FieldRef<"material_grades", 'Float'>
    readonly sigma_Flim: FieldRef<"material_grades", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * material_grades findUnique
   */
  export type material_gradesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the material_grades
     */
    select?: material_gradesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the material_grades
     */
    omit?: material_gradesOmit<ExtArgs> | null
    /**
     * Filter, which material_grades to fetch.
     */
    where: material_gradesWhereUniqueInput
  }

  /**
   * material_grades findUniqueOrThrow
   */
  export type material_gradesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the material_grades
     */
    select?: material_gradesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the material_grades
     */
    omit?: material_gradesOmit<ExtArgs> | null
    /**
     * Filter, which material_grades to fetch.
     */
    where: material_gradesWhereUniqueInput
  }

  /**
   * material_grades findFirst
   */
  export type material_gradesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the material_grades
     */
    select?: material_gradesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the material_grades
     */
    omit?: material_gradesOmit<ExtArgs> | null
    /**
     * Filter, which material_grades to fetch.
     */
    where?: material_gradesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of material_grades to fetch.
     */
    orderBy?: material_gradesOrderByWithRelationInput | material_gradesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for material_grades.
     */
    cursor?: material_gradesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` material_grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` material_grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of material_grades.
     */
    distinct?: Material_gradesScalarFieldEnum | Material_gradesScalarFieldEnum[]
  }

  /**
   * material_grades findFirstOrThrow
   */
  export type material_gradesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the material_grades
     */
    select?: material_gradesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the material_grades
     */
    omit?: material_gradesOmit<ExtArgs> | null
    /**
     * Filter, which material_grades to fetch.
     */
    where?: material_gradesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of material_grades to fetch.
     */
    orderBy?: material_gradesOrderByWithRelationInput | material_gradesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for material_grades.
     */
    cursor?: material_gradesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` material_grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` material_grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of material_grades.
     */
    distinct?: Material_gradesScalarFieldEnum | Material_gradesScalarFieldEnum[]
  }

  /**
   * material_grades findMany
   */
  export type material_gradesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the material_grades
     */
    select?: material_gradesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the material_grades
     */
    omit?: material_gradesOmit<ExtArgs> | null
    /**
     * Filter, which material_grades to fetch.
     */
    where?: material_gradesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of material_grades to fetch.
     */
    orderBy?: material_gradesOrderByWithRelationInput | material_gradesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing material_grades.
     */
    cursor?: material_gradesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` material_grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` material_grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of material_grades.
     */
    distinct?: Material_gradesScalarFieldEnum | Material_gradesScalarFieldEnum[]
  }

  /**
   * material_grades create
   */
  export type material_gradesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the material_grades
     */
    select?: material_gradesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the material_grades
     */
    omit?: material_gradesOmit<ExtArgs> | null
    /**
     * The data needed to create a material_grades.
     */
    data: XOR<material_gradesCreateInput, material_gradesUncheckedCreateInput>
  }

  /**
   * material_grades createMany
   */
  export type material_gradesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many material_grades.
     */
    data: material_gradesCreateManyInput | material_gradesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * material_grades update
   */
  export type material_gradesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the material_grades
     */
    select?: material_gradesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the material_grades
     */
    omit?: material_gradesOmit<ExtArgs> | null
    /**
     * The data needed to update a material_grades.
     */
    data: XOR<material_gradesUpdateInput, material_gradesUncheckedUpdateInput>
    /**
     * Choose, which material_grades to update.
     */
    where: material_gradesWhereUniqueInput
  }

  /**
   * material_grades updateMany
   */
  export type material_gradesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update material_grades.
     */
    data: XOR<material_gradesUpdateManyMutationInput, material_gradesUncheckedUpdateManyInput>
    /**
     * Filter which material_grades to update
     */
    where?: material_gradesWhereInput
    /**
     * Limit how many material_grades to update.
     */
    limit?: number
  }

  /**
   * material_grades upsert
   */
  export type material_gradesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the material_grades
     */
    select?: material_gradesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the material_grades
     */
    omit?: material_gradesOmit<ExtArgs> | null
    /**
     * The filter to search for the material_grades to update in case it exists.
     */
    where: material_gradesWhereUniqueInput
    /**
     * In case the material_grades found by the `where` argument doesn't exist, create a new material_grades with this data.
     */
    create: XOR<material_gradesCreateInput, material_gradesUncheckedCreateInput>
    /**
     * In case the material_grades was found with the provided `where` argument, update it with this data.
     */
    update: XOR<material_gradesUpdateInput, material_gradesUncheckedUpdateInput>
  }

  /**
   * material_grades delete
   */
  export type material_gradesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the material_grades
     */
    select?: material_gradesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the material_grades
     */
    omit?: material_gradesOmit<ExtArgs> | null
    /**
     * Filter which material_grades to delete.
     */
    where: material_gradesWhereUniqueInput
  }

  /**
   * material_grades deleteMany
   */
  export type material_gradesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which material_grades to delete
     */
    where?: material_gradesWhereInput
    /**
     * Limit how many material_grades to delete.
     */
    limit?: number
  }

  /**
   * material_grades without action
   */
  export type material_gradesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the material_grades
     */
    select?: material_gradesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the material_grades
     */
    omit?: material_gradesOmit<ExtArgs> | null
  }


  /**
   * Model standard_modules
   */

  export type AggregateStandard_modules = {
    _count: Standard_modulesCountAggregateOutputType | null
    _avg: Standard_modulesAvgAggregateOutputType | null
    _sum: Standard_modulesSumAggregateOutputType | null
    _min: Standard_modulesMinAggregateOutputType | null
    _max: Standard_modulesMaxAggregateOutputType | null
  }

  export type Standard_modulesAvgAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_modulesSumAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_modulesMinAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_modulesMaxAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_modulesCountAggregateOutputType = {
    id: number
    value: number
    _all: number
  }


  export type Standard_modulesAvgAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_modulesSumAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_modulesMinAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_modulesMaxAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_modulesCountAggregateInputType = {
    id?: true
    value?: true
    _all?: true
  }

  export type Standard_modulesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which standard_modules to aggregate.
     */
    where?: standard_modulesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_modules to fetch.
     */
    orderBy?: standard_modulesOrderByWithRelationInput | standard_modulesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: standard_modulesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_modules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned standard_modules
    **/
    _count?: true | Standard_modulesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Standard_modulesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Standard_modulesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Standard_modulesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Standard_modulesMaxAggregateInputType
  }

  export type GetStandard_modulesAggregateType<T extends Standard_modulesAggregateArgs> = {
        [P in keyof T & keyof AggregateStandard_modules]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStandard_modules[P]>
      : GetScalarType<T[P], AggregateStandard_modules[P]>
  }




  export type standard_modulesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: standard_modulesWhereInput
    orderBy?: standard_modulesOrderByWithAggregationInput | standard_modulesOrderByWithAggregationInput[]
    by: Standard_modulesScalarFieldEnum[] | Standard_modulesScalarFieldEnum
    having?: standard_modulesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Standard_modulesCountAggregateInputType | true
    _avg?: Standard_modulesAvgAggregateInputType
    _sum?: Standard_modulesSumAggregateInputType
    _min?: Standard_modulesMinAggregateInputType
    _max?: Standard_modulesMaxAggregateInputType
  }

  export type Standard_modulesGroupByOutputType = {
    id: number
    value: number
    _count: Standard_modulesCountAggregateOutputType | null
    _avg: Standard_modulesAvgAggregateOutputType | null
    _sum: Standard_modulesSumAggregateOutputType | null
    _min: Standard_modulesMinAggregateOutputType | null
    _max: Standard_modulesMaxAggregateOutputType | null
  }

  type GetStandard_modulesGroupByPayload<T extends standard_modulesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Standard_modulesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Standard_modulesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Standard_modulesGroupByOutputType[P]>
            : GetScalarType<T[P], Standard_modulesGroupByOutputType[P]>
        }
      >
    >


  export type standard_modulesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
  }, ExtArgs["result"]["standard_modules"]>



  export type standard_modulesSelectScalar = {
    id?: boolean
    value?: boolean
  }

  export type standard_modulesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value", ExtArgs["result"]["standard_modules"]>

  export type $standard_modulesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "standard_modules"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      value: number
    }, ExtArgs["result"]["standard_modules"]>
    composites: {}
  }

  type standard_modulesGetPayload<S extends boolean | null | undefined | standard_modulesDefaultArgs> = $Result.GetResult<Prisma.$standard_modulesPayload, S>

  type standard_modulesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<standard_modulesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Standard_modulesCountAggregateInputType | true
    }

  export interface standard_modulesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['standard_modules'], meta: { name: 'standard_modules' } }
    /**
     * Find zero or one Standard_modules that matches the filter.
     * @param {standard_modulesFindUniqueArgs} args - Arguments to find a Standard_modules
     * @example
     * // Get one Standard_modules
     * const standard_modules = await prisma.standard_modules.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends standard_modulesFindUniqueArgs>(args: SelectSubset<T, standard_modulesFindUniqueArgs<ExtArgs>>): Prisma__standard_modulesClient<$Result.GetResult<Prisma.$standard_modulesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Standard_modules that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {standard_modulesFindUniqueOrThrowArgs} args - Arguments to find a Standard_modules
     * @example
     * // Get one Standard_modules
     * const standard_modules = await prisma.standard_modules.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends standard_modulesFindUniqueOrThrowArgs>(args: SelectSubset<T, standard_modulesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__standard_modulesClient<$Result.GetResult<Prisma.$standard_modulesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Standard_modules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_modulesFindFirstArgs} args - Arguments to find a Standard_modules
     * @example
     * // Get one Standard_modules
     * const standard_modules = await prisma.standard_modules.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends standard_modulesFindFirstArgs>(args?: SelectSubset<T, standard_modulesFindFirstArgs<ExtArgs>>): Prisma__standard_modulesClient<$Result.GetResult<Prisma.$standard_modulesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Standard_modules that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_modulesFindFirstOrThrowArgs} args - Arguments to find a Standard_modules
     * @example
     * // Get one Standard_modules
     * const standard_modules = await prisma.standard_modules.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends standard_modulesFindFirstOrThrowArgs>(args?: SelectSubset<T, standard_modulesFindFirstOrThrowArgs<ExtArgs>>): Prisma__standard_modulesClient<$Result.GetResult<Prisma.$standard_modulesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Standard_modules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_modulesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Standard_modules
     * const standard_modules = await prisma.standard_modules.findMany()
     * 
     * // Get first 10 Standard_modules
     * const standard_modules = await prisma.standard_modules.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const standard_modulesWithIdOnly = await prisma.standard_modules.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends standard_modulesFindManyArgs>(args?: SelectSubset<T, standard_modulesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$standard_modulesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Standard_modules.
     * @param {standard_modulesCreateArgs} args - Arguments to create a Standard_modules.
     * @example
     * // Create one Standard_modules
     * const Standard_modules = await prisma.standard_modules.create({
     *   data: {
     *     // ... data to create a Standard_modules
     *   }
     * })
     * 
     */
    create<T extends standard_modulesCreateArgs>(args: SelectSubset<T, standard_modulesCreateArgs<ExtArgs>>): Prisma__standard_modulesClient<$Result.GetResult<Prisma.$standard_modulesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Standard_modules.
     * @param {standard_modulesCreateManyArgs} args - Arguments to create many Standard_modules.
     * @example
     * // Create many Standard_modules
     * const standard_modules = await prisma.standard_modules.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends standard_modulesCreateManyArgs>(args?: SelectSubset<T, standard_modulesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Standard_modules.
     * @param {standard_modulesDeleteArgs} args - Arguments to delete one Standard_modules.
     * @example
     * // Delete one Standard_modules
     * const Standard_modules = await prisma.standard_modules.delete({
     *   where: {
     *     // ... filter to delete one Standard_modules
     *   }
     * })
     * 
     */
    delete<T extends standard_modulesDeleteArgs>(args: SelectSubset<T, standard_modulesDeleteArgs<ExtArgs>>): Prisma__standard_modulesClient<$Result.GetResult<Prisma.$standard_modulesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Standard_modules.
     * @param {standard_modulesUpdateArgs} args - Arguments to update one Standard_modules.
     * @example
     * // Update one Standard_modules
     * const standard_modules = await prisma.standard_modules.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends standard_modulesUpdateArgs>(args: SelectSubset<T, standard_modulesUpdateArgs<ExtArgs>>): Prisma__standard_modulesClient<$Result.GetResult<Prisma.$standard_modulesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Standard_modules.
     * @param {standard_modulesDeleteManyArgs} args - Arguments to filter Standard_modules to delete.
     * @example
     * // Delete a few Standard_modules
     * const { count } = await prisma.standard_modules.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends standard_modulesDeleteManyArgs>(args?: SelectSubset<T, standard_modulesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Standard_modules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_modulesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Standard_modules
     * const standard_modules = await prisma.standard_modules.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends standard_modulesUpdateManyArgs>(args: SelectSubset<T, standard_modulesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Standard_modules.
     * @param {standard_modulesUpsertArgs} args - Arguments to update or create a Standard_modules.
     * @example
     * // Update or create a Standard_modules
     * const standard_modules = await prisma.standard_modules.upsert({
     *   create: {
     *     // ... data to create a Standard_modules
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Standard_modules we want to update
     *   }
     * })
     */
    upsert<T extends standard_modulesUpsertArgs>(args: SelectSubset<T, standard_modulesUpsertArgs<ExtArgs>>): Prisma__standard_modulesClient<$Result.GetResult<Prisma.$standard_modulesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Standard_modules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_modulesCountArgs} args - Arguments to filter Standard_modules to count.
     * @example
     * // Count the number of Standard_modules
     * const count = await prisma.standard_modules.count({
     *   where: {
     *     // ... the filter for the Standard_modules we want to count
     *   }
     * })
    **/
    count<T extends standard_modulesCountArgs>(
      args?: Subset<T, standard_modulesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Standard_modulesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Standard_modules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Standard_modulesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Standard_modulesAggregateArgs>(args: Subset<T, Standard_modulesAggregateArgs>): Prisma.PrismaPromise<GetStandard_modulesAggregateType<T>>

    /**
     * Group by Standard_modules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_modulesGroupByArgs} args - Group by arguments.
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
      T extends standard_modulesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: standard_modulesGroupByArgs['orderBy'] }
        : { orderBy?: standard_modulesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, standard_modulesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStandard_modulesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the standard_modules model
   */
  readonly fields: standard_modulesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for standard_modules.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__standard_modulesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the standard_modules model
   */
  interface standard_modulesFieldRefs {
    readonly id: FieldRef<"standard_modules", 'Int'>
    readonly value: FieldRef<"standard_modules", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * standard_modules findUnique
   */
  export type standard_modulesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_modules
     */
    select?: standard_modulesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_modules
     */
    omit?: standard_modulesOmit<ExtArgs> | null
    /**
     * Filter, which standard_modules to fetch.
     */
    where: standard_modulesWhereUniqueInput
  }

  /**
   * standard_modules findUniqueOrThrow
   */
  export type standard_modulesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_modules
     */
    select?: standard_modulesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_modules
     */
    omit?: standard_modulesOmit<ExtArgs> | null
    /**
     * Filter, which standard_modules to fetch.
     */
    where: standard_modulesWhereUniqueInput
  }

  /**
   * standard_modules findFirst
   */
  export type standard_modulesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_modules
     */
    select?: standard_modulesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_modules
     */
    omit?: standard_modulesOmit<ExtArgs> | null
    /**
     * Filter, which standard_modules to fetch.
     */
    where?: standard_modulesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_modules to fetch.
     */
    orderBy?: standard_modulesOrderByWithRelationInput | standard_modulesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for standard_modules.
     */
    cursor?: standard_modulesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_modules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_modules.
     */
    distinct?: Standard_modulesScalarFieldEnum | Standard_modulesScalarFieldEnum[]
  }

  /**
   * standard_modules findFirstOrThrow
   */
  export type standard_modulesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_modules
     */
    select?: standard_modulesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_modules
     */
    omit?: standard_modulesOmit<ExtArgs> | null
    /**
     * Filter, which standard_modules to fetch.
     */
    where?: standard_modulesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_modules to fetch.
     */
    orderBy?: standard_modulesOrderByWithRelationInput | standard_modulesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for standard_modules.
     */
    cursor?: standard_modulesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_modules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_modules.
     */
    distinct?: Standard_modulesScalarFieldEnum | Standard_modulesScalarFieldEnum[]
  }

  /**
   * standard_modules findMany
   */
  export type standard_modulesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_modules
     */
    select?: standard_modulesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_modules
     */
    omit?: standard_modulesOmit<ExtArgs> | null
    /**
     * Filter, which standard_modules to fetch.
     */
    where?: standard_modulesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_modules to fetch.
     */
    orderBy?: standard_modulesOrderByWithRelationInput | standard_modulesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing standard_modules.
     */
    cursor?: standard_modulesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_modules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_modules.
     */
    distinct?: Standard_modulesScalarFieldEnum | Standard_modulesScalarFieldEnum[]
  }

  /**
   * standard_modules create
   */
  export type standard_modulesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_modules
     */
    select?: standard_modulesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_modules
     */
    omit?: standard_modulesOmit<ExtArgs> | null
    /**
     * The data needed to create a standard_modules.
     */
    data: XOR<standard_modulesCreateInput, standard_modulesUncheckedCreateInput>
  }

  /**
   * standard_modules createMany
   */
  export type standard_modulesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many standard_modules.
     */
    data: standard_modulesCreateManyInput | standard_modulesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * standard_modules update
   */
  export type standard_modulesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_modules
     */
    select?: standard_modulesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_modules
     */
    omit?: standard_modulesOmit<ExtArgs> | null
    /**
     * The data needed to update a standard_modules.
     */
    data: XOR<standard_modulesUpdateInput, standard_modulesUncheckedUpdateInput>
    /**
     * Choose, which standard_modules to update.
     */
    where: standard_modulesWhereUniqueInput
  }

  /**
   * standard_modules updateMany
   */
  export type standard_modulesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update standard_modules.
     */
    data: XOR<standard_modulesUpdateManyMutationInput, standard_modulesUncheckedUpdateManyInput>
    /**
     * Filter which standard_modules to update
     */
    where?: standard_modulesWhereInput
    /**
     * Limit how many standard_modules to update.
     */
    limit?: number
  }

  /**
   * standard_modules upsert
   */
  export type standard_modulesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_modules
     */
    select?: standard_modulesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_modules
     */
    omit?: standard_modulesOmit<ExtArgs> | null
    /**
     * The filter to search for the standard_modules to update in case it exists.
     */
    where: standard_modulesWhereUniqueInput
    /**
     * In case the standard_modules found by the `where` argument doesn't exist, create a new standard_modules with this data.
     */
    create: XOR<standard_modulesCreateInput, standard_modulesUncheckedCreateInput>
    /**
     * In case the standard_modules was found with the provided `where` argument, update it with this data.
     */
    update: XOR<standard_modulesUpdateInput, standard_modulesUncheckedUpdateInput>
  }

  /**
   * standard_modules delete
   */
  export type standard_modulesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_modules
     */
    select?: standard_modulesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_modules
     */
    omit?: standard_modulesOmit<ExtArgs> | null
    /**
     * Filter which standard_modules to delete.
     */
    where: standard_modulesWhereUniqueInput
  }

  /**
   * standard_modules deleteMany
   */
  export type standard_modulesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which standard_modules to delete
     */
    where?: standard_modulesWhereInput
    /**
     * Limit how many standard_modules to delete.
     */
    limit?: number
  }

  /**
   * standard_modules without action
   */
  export type standard_modulesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_modules
     */
    select?: standard_modulesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_modules
     */
    omit?: standard_modulesOmit<ExtArgs> | null
  }


  /**
   * Model standard_center_distances
   */

  export type AggregateStandard_center_distances = {
    _count: Standard_center_distancesCountAggregateOutputType | null
    _avg: Standard_center_distancesAvgAggregateOutputType | null
    _sum: Standard_center_distancesSumAggregateOutputType | null
    _min: Standard_center_distancesMinAggregateOutputType | null
    _max: Standard_center_distancesMaxAggregateOutputType | null
  }

  export type Standard_center_distancesAvgAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_center_distancesSumAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_center_distancesMinAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_center_distancesMaxAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_center_distancesCountAggregateOutputType = {
    id: number
    value: number
    _all: number
  }


  export type Standard_center_distancesAvgAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_center_distancesSumAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_center_distancesMinAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_center_distancesMaxAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_center_distancesCountAggregateInputType = {
    id?: true
    value?: true
    _all?: true
  }

  export type Standard_center_distancesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which standard_center_distances to aggregate.
     */
    where?: standard_center_distancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_center_distances to fetch.
     */
    orderBy?: standard_center_distancesOrderByWithRelationInput | standard_center_distancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: standard_center_distancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_center_distances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_center_distances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned standard_center_distances
    **/
    _count?: true | Standard_center_distancesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Standard_center_distancesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Standard_center_distancesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Standard_center_distancesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Standard_center_distancesMaxAggregateInputType
  }

  export type GetStandard_center_distancesAggregateType<T extends Standard_center_distancesAggregateArgs> = {
        [P in keyof T & keyof AggregateStandard_center_distances]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStandard_center_distances[P]>
      : GetScalarType<T[P], AggregateStandard_center_distances[P]>
  }




  export type standard_center_distancesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: standard_center_distancesWhereInput
    orderBy?: standard_center_distancesOrderByWithAggregationInput | standard_center_distancesOrderByWithAggregationInput[]
    by: Standard_center_distancesScalarFieldEnum[] | Standard_center_distancesScalarFieldEnum
    having?: standard_center_distancesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Standard_center_distancesCountAggregateInputType | true
    _avg?: Standard_center_distancesAvgAggregateInputType
    _sum?: Standard_center_distancesSumAggregateInputType
    _min?: Standard_center_distancesMinAggregateInputType
    _max?: Standard_center_distancesMaxAggregateInputType
  }

  export type Standard_center_distancesGroupByOutputType = {
    id: number
    value: number
    _count: Standard_center_distancesCountAggregateOutputType | null
    _avg: Standard_center_distancesAvgAggregateOutputType | null
    _sum: Standard_center_distancesSumAggregateOutputType | null
    _min: Standard_center_distancesMinAggregateOutputType | null
    _max: Standard_center_distancesMaxAggregateOutputType | null
  }

  type GetStandard_center_distancesGroupByPayload<T extends standard_center_distancesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Standard_center_distancesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Standard_center_distancesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Standard_center_distancesGroupByOutputType[P]>
            : GetScalarType<T[P], Standard_center_distancesGroupByOutputType[P]>
        }
      >
    >


  export type standard_center_distancesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
  }, ExtArgs["result"]["standard_center_distances"]>



  export type standard_center_distancesSelectScalar = {
    id?: boolean
    value?: boolean
  }

  export type standard_center_distancesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value", ExtArgs["result"]["standard_center_distances"]>

  export type $standard_center_distancesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "standard_center_distances"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      value: number
    }, ExtArgs["result"]["standard_center_distances"]>
    composites: {}
  }

  type standard_center_distancesGetPayload<S extends boolean | null | undefined | standard_center_distancesDefaultArgs> = $Result.GetResult<Prisma.$standard_center_distancesPayload, S>

  type standard_center_distancesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<standard_center_distancesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Standard_center_distancesCountAggregateInputType | true
    }

  export interface standard_center_distancesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['standard_center_distances'], meta: { name: 'standard_center_distances' } }
    /**
     * Find zero or one Standard_center_distances that matches the filter.
     * @param {standard_center_distancesFindUniqueArgs} args - Arguments to find a Standard_center_distances
     * @example
     * // Get one Standard_center_distances
     * const standard_center_distances = await prisma.standard_center_distances.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends standard_center_distancesFindUniqueArgs>(args: SelectSubset<T, standard_center_distancesFindUniqueArgs<ExtArgs>>): Prisma__standard_center_distancesClient<$Result.GetResult<Prisma.$standard_center_distancesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Standard_center_distances that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {standard_center_distancesFindUniqueOrThrowArgs} args - Arguments to find a Standard_center_distances
     * @example
     * // Get one Standard_center_distances
     * const standard_center_distances = await prisma.standard_center_distances.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends standard_center_distancesFindUniqueOrThrowArgs>(args: SelectSubset<T, standard_center_distancesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__standard_center_distancesClient<$Result.GetResult<Prisma.$standard_center_distancesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Standard_center_distances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_center_distancesFindFirstArgs} args - Arguments to find a Standard_center_distances
     * @example
     * // Get one Standard_center_distances
     * const standard_center_distances = await prisma.standard_center_distances.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends standard_center_distancesFindFirstArgs>(args?: SelectSubset<T, standard_center_distancesFindFirstArgs<ExtArgs>>): Prisma__standard_center_distancesClient<$Result.GetResult<Prisma.$standard_center_distancesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Standard_center_distances that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_center_distancesFindFirstOrThrowArgs} args - Arguments to find a Standard_center_distances
     * @example
     * // Get one Standard_center_distances
     * const standard_center_distances = await prisma.standard_center_distances.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends standard_center_distancesFindFirstOrThrowArgs>(args?: SelectSubset<T, standard_center_distancesFindFirstOrThrowArgs<ExtArgs>>): Prisma__standard_center_distancesClient<$Result.GetResult<Prisma.$standard_center_distancesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Standard_center_distances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_center_distancesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Standard_center_distances
     * const standard_center_distances = await prisma.standard_center_distances.findMany()
     * 
     * // Get first 10 Standard_center_distances
     * const standard_center_distances = await prisma.standard_center_distances.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const standard_center_distancesWithIdOnly = await prisma.standard_center_distances.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends standard_center_distancesFindManyArgs>(args?: SelectSubset<T, standard_center_distancesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$standard_center_distancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Standard_center_distances.
     * @param {standard_center_distancesCreateArgs} args - Arguments to create a Standard_center_distances.
     * @example
     * // Create one Standard_center_distances
     * const Standard_center_distances = await prisma.standard_center_distances.create({
     *   data: {
     *     // ... data to create a Standard_center_distances
     *   }
     * })
     * 
     */
    create<T extends standard_center_distancesCreateArgs>(args: SelectSubset<T, standard_center_distancesCreateArgs<ExtArgs>>): Prisma__standard_center_distancesClient<$Result.GetResult<Prisma.$standard_center_distancesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Standard_center_distances.
     * @param {standard_center_distancesCreateManyArgs} args - Arguments to create many Standard_center_distances.
     * @example
     * // Create many Standard_center_distances
     * const standard_center_distances = await prisma.standard_center_distances.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends standard_center_distancesCreateManyArgs>(args?: SelectSubset<T, standard_center_distancesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Standard_center_distances.
     * @param {standard_center_distancesDeleteArgs} args - Arguments to delete one Standard_center_distances.
     * @example
     * // Delete one Standard_center_distances
     * const Standard_center_distances = await prisma.standard_center_distances.delete({
     *   where: {
     *     // ... filter to delete one Standard_center_distances
     *   }
     * })
     * 
     */
    delete<T extends standard_center_distancesDeleteArgs>(args: SelectSubset<T, standard_center_distancesDeleteArgs<ExtArgs>>): Prisma__standard_center_distancesClient<$Result.GetResult<Prisma.$standard_center_distancesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Standard_center_distances.
     * @param {standard_center_distancesUpdateArgs} args - Arguments to update one Standard_center_distances.
     * @example
     * // Update one Standard_center_distances
     * const standard_center_distances = await prisma.standard_center_distances.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends standard_center_distancesUpdateArgs>(args: SelectSubset<T, standard_center_distancesUpdateArgs<ExtArgs>>): Prisma__standard_center_distancesClient<$Result.GetResult<Prisma.$standard_center_distancesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Standard_center_distances.
     * @param {standard_center_distancesDeleteManyArgs} args - Arguments to filter Standard_center_distances to delete.
     * @example
     * // Delete a few Standard_center_distances
     * const { count } = await prisma.standard_center_distances.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends standard_center_distancesDeleteManyArgs>(args?: SelectSubset<T, standard_center_distancesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Standard_center_distances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_center_distancesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Standard_center_distances
     * const standard_center_distances = await prisma.standard_center_distances.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends standard_center_distancesUpdateManyArgs>(args: SelectSubset<T, standard_center_distancesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Standard_center_distances.
     * @param {standard_center_distancesUpsertArgs} args - Arguments to update or create a Standard_center_distances.
     * @example
     * // Update or create a Standard_center_distances
     * const standard_center_distances = await prisma.standard_center_distances.upsert({
     *   create: {
     *     // ... data to create a Standard_center_distances
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Standard_center_distances we want to update
     *   }
     * })
     */
    upsert<T extends standard_center_distancesUpsertArgs>(args: SelectSubset<T, standard_center_distancesUpsertArgs<ExtArgs>>): Prisma__standard_center_distancesClient<$Result.GetResult<Prisma.$standard_center_distancesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Standard_center_distances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_center_distancesCountArgs} args - Arguments to filter Standard_center_distances to count.
     * @example
     * // Count the number of Standard_center_distances
     * const count = await prisma.standard_center_distances.count({
     *   where: {
     *     // ... the filter for the Standard_center_distances we want to count
     *   }
     * })
    **/
    count<T extends standard_center_distancesCountArgs>(
      args?: Subset<T, standard_center_distancesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Standard_center_distancesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Standard_center_distances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Standard_center_distancesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Standard_center_distancesAggregateArgs>(args: Subset<T, Standard_center_distancesAggregateArgs>): Prisma.PrismaPromise<GetStandard_center_distancesAggregateType<T>>

    /**
     * Group by Standard_center_distances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_center_distancesGroupByArgs} args - Group by arguments.
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
      T extends standard_center_distancesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: standard_center_distancesGroupByArgs['orderBy'] }
        : { orderBy?: standard_center_distancesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, standard_center_distancesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStandard_center_distancesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the standard_center_distances model
   */
  readonly fields: standard_center_distancesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for standard_center_distances.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__standard_center_distancesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the standard_center_distances model
   */
  interface standard_center_distancesFieldRefs {
    readonly id: FieldRef<"standard_center_distances", 'Int'>
    readonly value: FieldRef<"standard_center_distances", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * standard_center_distances findUnique
   */
  export type standard_center_distancesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_center_distances
     */
    select?: standard_center_distancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_center_distances
     */
    omit?: standard_center_distancesOmit<ExtArgs> | null
    /**
     * Filter, which standard_center_distances to fetch.
     */
    where: standard_center_distancesWhereUniqueInput
  }

  /**
   * standard_center_distances findUniqueOrThrow
   */
  export type standard_center_distancesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_center_distances
     */
    select?: standard_center_distancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_center_distances
     */
    omit?: standard_center_distancesOmit<ExtArgs> | null
    /**
     * Filter, which standard_center_distances to fetch.
     */
    where: standard_center_distancesWhereUniqueInput
  }

  /**
   * standard_center_distances findFirst
   */
  export type standard_center_distancesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_center_distances
     */
    select?: standard_center_distancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_center_distances
     */
    omit?: standard_center_distancesOmit<ExtArgs> | null
    /**
     * Filter, which standard_center_distances to fetch.
     */
    where?: standard_center_distancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_center_distances to fetch.
     */
    orderBy?: standard_center_distancesOrderByWithRelationInput | standard_center_distancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for standard_center_distances.
     */
    cursor?: standard_center_distancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_center_distances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_center_distances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_center_distances.
     */
    distinct?: Standard_center_distancesScalarFieldEnum | Standard_center_distancesScalarFieldEnum[]
  }

  /**
   * standard_center_distances findFirstOrThrow
   */
  export type standard_center_distancesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_center_distances
     */
    select?: standard_center_distancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_center_distances
     */
    omit?: standard_center_distancesOmit<ExtArgs> | null
    /**
     * Filter, which standard_center_distances to fetch.
     */
    where?: standard_center_distancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_center_distances to fetch.
     */
    orderBy?: standard_center_distancesOrderByWithRelationInput | standard_center_distancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for standard_center_distances.
     */
    cursor?: standard_center_distancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_center_distances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_center_distances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_center_distances.
     */
    distinct?: Standard_center_distancesScalarFieldEnum | Standard_center_distancesScalarFieldEnum[]
  }

  /**
   * standard_center_distances findMany
   */
  export type standard_center_distancesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_center_distances
     */
    select?: standard_center_distancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_center_distances
     */
    omit?: standard_center_distancesOmit<ExtArgs> | null
    /**
     * Filter, which standard_center_distances to fetch.
     */
    where?: standard_center_distancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_center_distances to fetch.
     */
    orderBy?: standard_center_distancesOrderByWithRelationInput | standard_center_distancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing standard_center_distances.
     */
    cursor?: standard_center_distancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_center_distances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_center_distances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_center_distances.
     */
    distinct?: Standard_center_distancesScalarFieldEnum | Standard_center_distancesScalarFieldEnum[]
  }

  /**
   * standard_center_distances create
   */
  export type standard_center_distancesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_center_distances
     */
    select?: standard_center_distancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_center_distances
     */
    omit?: standard_center_distancesOmit<ExtArgs> | null
    /**
     * The data needed to create a standard_center_distances.
     */
    data: XOR<standard_center_distancesCreateInput, standard_center_distancesUncheckedCreateInput>
  }

  /**
   * standard_center_distances createMany
   */
  export type standard_center_distancesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many standard_center_distances.
     */
    data: standard_center_distancesCreateManyInput | standard_center_distancesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * standard_center_distances update
   */
  export type standard_center_distancesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_center_distances
     */
    select?: standard_center_distancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_center_distances
     */
    omit?: standard_center_distancesOmit<ExtArgs> | null
    /**
     * The data needed to update a standard_center_distances.
     */
    data: XOR<standard_center_distancesUpdateInput, standard_center_distancesUncheckedUpdateInput>
    /**
     * Choose, which standard_center_distances to update.
     */
    where: standard_center_distancesWhereUniqueInput
  }

  /**
   * standard_center_distances updateMany
   */
  export type standard_center_distancesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update standard_center_distances.
     */
    data: XOR<standard_center_distancesUpdateManyMutationInput, standard_center_distancesUncheckedUpdateManyInput>
    /**
     * Filter which standard_center_distances to update
     */
    where?: standard_center_distancesWhereInput
    /**
     * Limit how many standard_center_distances to update.
     */
    limit?: number
  }

  /**
   * standard_center_distances upsert
   */
  export type standard_center_distancesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_center_distances
     */
    select?: standard_center_distancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_center_distances
     */
    omit?: standard_center_distancesOmit<ExtArgs> | null
    /**
     * The filter to search for the standard_center_distances to update in case it exists.
     */
    where: standard_center_distancesWhereUniqueInput
    /**
     * In case the standard_center_distances found by the `where` argument doesn't exist, create a new standard_center_distances with this data.
     */
    create: XOR<standard_center_distancesCreateInput, standard_center_distancesUncheckedCreateInput>
    /**
     * In case the standard_center_distances was found with the provided `where` argument, update it with this data.
     */
    update: XOR<standard_center_distancesUpdateInput, standard_center_distancesUncheckedUpdateInput>
  }

  /**
   * standard_center_distances delete
   */
  export type standard_center_distancesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_center_distances
     */
    select?: standard_center_distancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_center_distances
     */
    omit?: standard_center_distancesOmit<ExtArgs> | null
    /**
     * Filter which standard_center_distances to delete.
     */
    where: standard_center_distancesWhereUniqueInput
  }

  /**
   * standard_center_distances deleteMany
   */
  export type standard_center_distancesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which standard_center_distances to delete
     */
    where?: standard_center_distancesWhereInput
    /**
     * Limit how many standard_center_distances to delete.
     */
    limit?: number
  }

  /**
   * standard_center_distances without action
   */
  export type standard_center_distancesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_center_distances
     */
    select?: standard_center_distancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_center_distances
     */
    omit?: standard_center_distancesOmit<ExtArgs> | null
  }


  /**
   * Model standard_shaft_diameters
   */

  export type AggregateStandard_shaft_diameters = {
    _count: Standard_shaft_diametersCountAggregateOutputType | null
    _avg: Standard_shaft_diametersAvgAggregateOutputType | null
    _sum: Standard_shaft_diametersSumAggregateOutputType | null
    _min: Standard_shaft_diametersMinAggregateOutputType | null
    _max: Standard_shaft_diametersMaxAggregateOutputType | null
  }

  export type Standard_shaft_diametersAvgAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_shaft_diametersSumAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_shaft_diametersMinAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_shaft_diametersMaxAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_shaft_diametersCountAggregateOutputType = {
    id: number
    value: number
    _all: number
  }


  export type Standard_shaft_diametersAvgAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_shaft_diametersSumAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_shaft_diametersMinAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_shaft_diametersMaxAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_shaft_diametersCountAggregateInputType = {
    id?: true
    value?: true
    _all?: true
  }

  export type Standard_shaft_diametersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which standard_shaft_diameters to aggregate.
     */
    where?: standard_shaft_diametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_shaft_diameters to fetch.
     */
    orderBy?: standard_shaft_diametersOrderByWithRelationInput | standard_shaft_diametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: standard_shaft_diametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_shaft_diameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_shaft_diameters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned standard_shaft_diameters
    **/
    _count?: true | Standard_shaft_diametersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Standard_shaft_diametersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Standard_shaft_diametersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Standard_shaft_diametersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Standard_shaft_diametersMaxAggregateInputType
  }

  export type GetStandard_shaft_diametersAggregateType<T extends Standard_shaft_diametersAggregateArgs> = {
        [P in keyof T & keyof AggregateStandard_shaft_diameters]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStandard_shaft_diameters[P]>
      : GetScalarType<T[P], AggregateStandard_shaft_diameters[P]>
  }




  export type standard_shaft_diametersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: standard_shaft_diametersWhereInput
    orderBy?: standard_shaft_diametersOrderByWithAggregationInput | standard_shaft_diametersOrderByWithAggregationInput[]
    by: Standard_shaft_diametersScalarFieldEnum[] | Standard_shaft_diametersScalarFieldEnum
    having?: standard_shaft_diametersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Standard_shaft_diametersCountAggregateInputType | true
    _avg?: Standard_shaft_diametersAvgAggregateInputType
    _sum?: Standard_shaft_diametersSumAggregateInputType
    _min?: Standard_shaft_diametersMinAggregateInputType
    _max?: Standard_shaft_diametersMaxAggregateInputType
  }

  export type Standard_shaft_diametersGroupByOutputType = {
    id: number
    value: number
    _count: Standard_shaft_diametersCountAggregateOutputType | null
    _avg: Standard_shaft_diametersAvgAggregateOutputType | null
    _sum: Standard_shaft_diametersSumAggregateOutputType | null
    _min: Standard_shaft_diametersMinAggregateOutputType | null
    _max: Standard_shaft_diametersMaxAggregateOutputType | null
  }

  type GetStandard_shaft_diametersGroupByPayload<T extends standard_shaft_diametersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Standard_shaft_diametersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Standard_shaft_diametersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Standard_shaft_diametersGroupByOutputType[P]>
            : GetScalarType<T[P], Standard_shaft_diametersGroupByOutputType[P]>
        }
      >
    >


  export type standard_shaft_diametersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
  }, ExtArgs["result"]["standard_shaft_diameters"]>



  export type standard_shaft_diametersSelectScalar = {
    id?: boolean
    value?: boolean
  }

  export type standard_shaft_diametersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value", ExtArgs["result"]["standard_shaft_diameters"]>

  export type $standard_shaft_diametersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "standard_shaft_diameters"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      value: number
    }, ExtArgs["result"]["standard_shaft_diameters"]>
    composites: {}
  }

  type standard_shaft_diametersGetPayload<S extends boolean | null | undefined | standard_shaft_diametersDefaultArgs> = $Result.GetResult<Prisma.$standard_shaft_diametersPayload, S>

  type standard_shaft_diametersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<standard_shaft_diametersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Standard_shaft_diametersCountAggregateInputType | true
    }

  export interface standard_shaft_diametersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['standard_shaft_diameters'], meta: { name: 'standard_shaft_diameters' } }
    /**
     * Find zero or one Standard_shaft_diameters that matches the filter.
     * @param {standard_shaft_diametersFindUniqueArgs} args - Arguments to find a Standard_shaft_diameters
     * @example
     * // Get one Standard_shaft_diameters
     * const standard_shaft_diameters = await prisma.standard_shaft_diameters.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends standard_shaft_diametersFindUniqueArgs>(args: SelectSubset<T, standard_shaft_diametersFindUniqueArgs<ExtArgs>>): Prisma__standard_shaft_diametersClient<$Result.GetResult<Prisma.$standard_shaft_diametersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Standard_shaft_diameters that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {standard_shaft_diametersFindUniqueOrThrowArgs} args - Arguments to find a Standard_shaft_diameters
     * @example
     * // Get one Standard_shaft_diameters
     * const standard_shaft_diameters = await prisma.standard_shaft_diameters.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends standard_shaft_diametersFindUniqueOrThrowArgs>(args: SelectSubset<T, standard_shaft_diametersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__standard_shaft_diametersClient<$Result.GetResult<Prisma.$standard_shaft_diametersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Standard_shaft_diameters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_shaft_diametersFindFirstArgs} args - Arguments to find a Standard_shaft_diameters
     * @example
     * // Get one Standard_shaft_diameters
     * const standard_shaft_diameters = await prisma.standard_shaft_diameters.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends standard_shaft_diametersFindFirstArgs>(args?: SelectSubset<T, standard_shaft_diametersFindFirstArgs<ExtArgs>>): Prisma__standard_shaft_diametersClient<$Result.GetResult<Prisma.$standard_shaft_diametersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Standard_shaft_diameters that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_shaft_diametersFindFirstOrThrowArgs} args - Arguments to find a Standard_shaft_diameters
     * @example
     * // Get one Standard_shaft_diameters
     * const standard_shaft_diameters = await prisma.standard_shaft_diameters.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends standard_shaft_diametersFindFirstOrThrowArgs>(args?: SelectSubset<T, standard_shaft_diametersFindFirstOrThrowArgs<ExtArgs>>): Prisma__standard_shaft_diametersClient<$Result.GetResult<Prisma.$standard_shaft_diametersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Standard_shaft_diameters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_shaft_diametersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Standard_shaft_diameters
     * const standard_shaft_diameters = await prisma.standard_shaft_diameters.findMany()
     * 
     * // Get first 10 Standard_shaft_diameters
     * const standard_shaft_diameters = await prisma.standard_shaft_diameters.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const standard_shaft_diametersWithIdOnly = await prisma.standard_shaft_diameters.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends standard_shaft_diametersFindManyArgs>(args?: SelectSubset<T, standard_shaft_diametersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$standard_shaft_diametersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Standard_shaft_diameters.
     * @param {standard_shaft_diametersCreateArgs} args - Arguments to create a Standard_shaft_diameters.
     * @example
     * // Create one Standard_shaft_diameters
     * const Standard_shaft_diameters = await prisma.standard_shaft_diameters.create({
     *   data: {
     *     // ... data to create a Standard_shaft_diameters
     *   }
     * })
     * 
     */
    create<T extends standard_shaft_diametersCreateArgs>(args: SelectSubset<T, standard_shaft_diametersCreateArgs<ExtArgs>>): Prisma__standard_shaft_diametersClient<$Result.GetResult<Prisma.$standard_shaft_diametersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Standard_shaft_diameters.
     * @param {standard_shaft_diametersCreateManyArgs} args - Arguments to create many Standard_shaft_diameters.
     * @example
     * // Create many Standard_shaft_diameters
     * const standard_shaft_diameters = await prisma.standard_shaft_diameters.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends standard_shaft_diametersCreateManyArgs>(args?: SelectSubset<T, standard_shaft_diametersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Standard_shaft_diameters.
     * @param {standard_shaft_diametersDeleteArgs} args - Arguments to delete one Standard_shaft_diameters.
     * @example
     * // Delete one Standard_shaft_diameters
     * const Standard_shaft_diameters = await prisma.standard_shaft_diameters.delete({
     *   where: {
     *     // ... filter to delete one Standard_shaft_diameters
     *   }
     * })
     * 
     */
    delete<T extends standard_shaft_diametersDeleteArgs>(args: SelectSubset<T, standard_shaft_diametersDeleteArgs<ExtArgs>>): Prisma__standard_shaft_diametersClient<$Result.GetResult<Prisma.$standard_shaft_diametersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Standard_shaft_diameters.
     * @param {standard_shaft_diametersUpdateArgs} args - Arguments to update one Standard_shaft_diameters.
     * @example
     * // Update one Standard_shaft_diameters
     * const standard_shaft_diameters = await prisma.standard_shaft_diameters.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends standard_shaft_diametersUpdateArgs>(args: SelectSubset<T, standard_shaft_diametersUpdateArgs<ExtArgs>>): Prisma__standard_shaft_diametersClient<$Result.GetResult<Prisma.$standard_shaft_diametersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Standard_shaft_diameters.
     * @param {standard_shaft_diametersDeleteManyArgs} args - Arguments to filter Standard_shaft_diameters to delete.
     * @example
     * // Delete a few Standard_shaft_diameters
     * const { count } = await prisma.standard_shaft_diameters.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends standard_shaft_diametersDeleteManyArgs>(args?: SelectSubset<T, standard_shaft_diametersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Standard_shaft_diameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_shaft_diametersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Standard_shaft_diameters
     * const standard_shaft_diameters = await prisma.standard_shaft_diameters.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends standard_shaft_diametersUpdateManyArgs>(args: SelectSubset<T, standard_shaft_diametersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Standard_shaft_diameters.
     * @param {standard_shaft_diametersUpsertArgs} args - Arguments to update or create a Standard_shaft_diameters.
     * @example
     * // Update or create a Standard_shaft_diameters
     * const standard_shaft_diameters = await prisma.standard_shaft_diameters.upsert({
     *   create: {
     *     // ... data to create a Standard_shaft_diameters
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Standard_shaft_diameters we want to update
     *   }
     * })
     */
    upsert<T extends standard_shaft_diametersUpsertArgs>(args: SelectSubset<T, standard_shaft_diametersUpsertArgs<ExtArgs>>): Prisma__standard_shaft_diametersClient<$Result.GetResult<Prisma.$standard_shaft_diametersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Standard_shaft_diameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_shaft_diametersCountArgs} args - Arguments to filter Standard_shaft_diameters to count.
     * @example
     * // Count the number of Standard_shaft_diameters
     * const count = await prisma.standard_shaft_diameters.count({
     *   where: {
     *     // ... the filter for the Standard_shaft_diameters we want to count
     *   }
     * })
    **/
    count<T extends standard_shaft_diametersCountArgs>(
      args?: Subset<T, standard_shaft_diametersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Standard_shaft_diametersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Standard_shaft_diameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Standard_shaft_diametersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Standard_shaft_diametersAggregateArgs>(args: Subset<T, Standard_shaft_diametersAggregateArgs>): Prisma.PrismaPromise<GetStandard_shaft_diametersAggregateType<T>>

    /**
     * Group by Standard_shaft_diameters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_shaft_diametersGroupByArgs} args - Group by arguments.
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
      T extends standard_shaft_diametersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: standard_shaft_diametersGroupByArgs['orderBy'] }
        : { orderBy?: standard_shaft_diametersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, standard_shaft_diametersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStandard_shaft_diametersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the standard_shaft_diameters model
   */
  readonly fields: standard_shaft_diametersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for standard_shaft_diameters.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__standard_shaft_diametersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the standard_shaft_diameters model
   */
  interface standard_shaft_diametersFieldRefs {
    readonly id: FieldRef<"standard_shaft_diameters", 'Int'>
    readonly value: FieldRef<"standard_shaft_diameters", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * standard_shaft_diameters findUnique
   */
  export type standard_shaft_diametersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_shaft_diameters
     */
    select?: standard_shaft_diametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_shaft_diameters
     */
    omit?: standard_shaft_diametersOmit<ExtArgs> | null
    /**
     * Filter, which standard_shaft_diameters to fetch.
     */
    where: standard_shaft_diametersWhereUniqueInput
  }

  /**
   * standard_shaft_diameters findUniqueOrThrow
   */
  export type standard_shaft_diametersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_shaft_diameters
     */
    select?: standard_shaft_diametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_shaft_diameters
     */
    omit?: standard_shaft_diametersOmit<ExtArgs> | null
    /**
     * Filter, which standard_shaft_diameters to fetch.
     */
    where: standard_shaft_diametersWhereUniqueInput
  }

  /**
   * standard_shaft_diameters findFirst
   */
  export type standard_shaft_diametersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_shaft_diameters
     */
    select?: standard_shaft_diametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_shaft_diameters
     */
    omit?: standard_shaft_diametersOmit<ExtArgs> | null
    /**
     * Filter, which standard_shaft_diameters to fetch.
     */
    where?: standard_shaft_diametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_shaft_diameters to fetch.
     */
    orderBy?: standard_shaft_diametersOrderByWithRelationInput | standard_shaft_diametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for standard_shaft_diameters.
     */
    cursor?: standard_shaft_diametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_shaft_diameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_shaft_diameters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_shaft_diameters.
     */
    distinct?: Standard_shaft_diametersScalarFieldEnum | Standard_shaft_diametersScalarFieldEnum[]
  }

  /**
   * standard_shaft_diameters findFirstOrThrow
   */
  export type standard_shaft_diametersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_shaft_diameters
     */
    select?: standard_shaft_diametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_shaft_diameters
     */
    omit?: standard_shaft_diametersOmit<ExtArgs> | null
    /**
     * Filter, which standard_shaft_diameters to fetch.
     */
    where?: standard_shaft_diametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_shaft_diameters to fetch.
     */
    orderBy?: standard_shaft_diametersOrderByWithRelationInput | standard_shaft_diametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for standard_shaft_diameters.
     */
    cursor?: standard_shaft_diametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_shaft_diameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_shaft_diameters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_shaft_diameters.
     */
    distinct?: Standard_shaft_diametersScalarFieldEnum | Standard_shaft_diametersScalarFieldEnum[]
  }

  /**
   * standard_shaft_diameters findMany
   */
  export type standard_shaft_diametersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_shaft_diameters
     */
    select?: standard_shaft_diametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_shaft_diameters
     */
    omit?: standard_shaft_diametersOmit<ExtArgs> | null
    /**
     * Filter, which standard_shaft_diameters to fetch.
     */
    where?: standard_shaft_diametersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_shaft_diameters to fetch.
     */
    orderBy?: standard_shaft_diametersOrderByWithRelationInput | standard_shaft_diametersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing standard_shaft_diameters.
     */
    cursor?: standard_shaft_diametersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_shaft_diameters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_shaft_diameters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_shaft_diameters.
     */
    distinct?: Standard_shaft_diametersScalarFieldEnum | Standard_shaft_diametersScalarFieldEnum[]
  }

  /**
   * standard_shaft_diameters create
   */
  export type standard_shaft_diametersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_shaft_diameters
     */
    select?: standard_shaft_diametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_shaft_diameters
     */
    omit?: standard_shaft_diametersOmit<ExtArgs> | null
    /**
     * The data needed to create a standard_shaft_diameters.
     */
    data: XOR<standard_shaft_diametersCreateInput, standard_shaft_diametersUncheckedCreateInput>
  }

  /**
   * standard_shaft_diameters createMany
   */
  export type standard_shaft_diametersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many standard_shaft_diameters.
     */
    data: standard_shaft_diametersCreateManyInput | standard_shaft_diametersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * standard_shaft_diameters update
   */
  export type standard_shaft_diametersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_shaft_diameters
     */
    select?: standard_shaft_diametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_shaft_diameters
     */
    omit?: standard_shaft_diametersOmit<ExtArgs> | null
    /**
     * The data needed to update a standard_shaft_diameters.
     */
    data: XOR<standard_shaft_diametersUpdateInput, standard_shaft_diametersUncheckedUpdateInput>
    /**
     * Choose, which standard_shaft_diameters to update.
     */
    where: standard_shaft_diametersWhereUniqueInput
  }

  /**
   * standard_shaft_diameters updateMany
   */
  export type standard_shaft_diametersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update standard_shaft_diameters.
     */
    data: XOR<standard_shaft_diametersUpdateManyMutationInput, standard_shaft_diametersUncheckedUpdateManyInput>
    /**
     * Filter which standard_shaft_diameters to update
     */
    where?: standard_shaft_diametersWhereInput
    /**
     * Limit how many standard_shaft_diameters to update.
     */
    limit?: number
  }

  /**
   * standard_shaft_diameters upsert
   */
  export type standard_shaft_diametersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_shaft_diameters
     */
    select?: standard_shaft_diametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_shaft_diameters
     */
    omit?: standard_shaft_diametersOmit<ExtArgs> | null
    /**
     * The filter to search for the standard_shaft_diameters to update in case it exists.
     */
    where: standard_shaft_diametersWhereUniqueInput
    /**
     * In case the standard_shaft_diameters found by the `where` argument doesn't exist, create a new standard_shaft_diameters with this data.
     */
    create: XOR<standard_shaft_diametersCreateInput, standard_shaft_diametersUncheckedCreateInput>
    /**
     * In case the standard_shaft_diameters was found with the provided `where` argument, update it with this data.
     */
    update: XOR<standard_shaft_diametersUpdateInput, standard_shaft_diametersUncheckedUpdateInput>
  }

  /**
   * standard_shaft_diameters delete
   */
  export type standard_shaft_diametersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_shaft_diameters
     */
    select?: standard_shaft_diametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_shaft_diameters
     */
    omit?: standard_shaft_diametersOmit<ExtArgs> | null
    /**
     * Filter which standard_shaft_diameters to delete.
     */
    where: standard_shaft_diametersWhereUniqueInput
  }

  /**
   * standard_shaft_diameters deleteMany
   */
  export type standard_shaft_diametersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which standard_shaft_diameters to delete
     */
    where?: standard_shaft_diametersWhereInput
    /**
     * Limit how many standard_shaft_diameters to delete.
     */
    limit?: number
  }

  /**
   * standard_shaft_diameters without action
   */
  export type standard_shaft_diametersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_shaft_diameters
     */
    select?: standard_shaft_diametersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_shaft_diameters
     */
    omit?: standard_shaft_diametersOmit<ExtArgs> | null
  }


  /**
   * Model key_dimensions
   */

  export type AggregateKey_dimensions = {
    _count: Key_dimensionsCountAggregateOutputType | null
    _avg: Key_dimensionsAvgAggregateOutputType | null
    _sum: Key_dimensionsSumAggregateOutputType | null
    _min: Key_dimensionsMinAggregateOutputType | null
    _max: Key_dimensionsMaxAggregateOutputType | null
  }

  export type Key_dimensionsAvgAggregateOutputType = {
    id: number | null
    d_min: number | null
    d_max: number | null
    b: number | null
    h: number | null
    t1: number | null
    t2: number | null
  }

  export type Key_dimensionsSumAggregateOutputType = {
    id: number | null
    d_min: number | null
    d_max: number | null
    b: number | null
    h: number | null
    t1: number | null
    t2: number | null
  }

  export type Key_dimensionsMinAggregateOutputType = {
    id: number | null
    d_min: number | null
    d_max: number | null
    b: number | null
    h: number | null
    t1: number | null
    t2: number | null
  }

  export type Key_dimensionsMaxAggregateOutputType = {
    id: number | null
    d_min: number | null
    d_max: number | null
    b: number | null
    h: number | null
    t1: number | null
    t2: number | null
  }

  export type Key_dimensionsCountAggregateOutputType = {
    id: number
    d_min: number
    d_max: number
    b: number
    h: number
    t1: number
    t2: number
    _all: number
  }


  export type Key_dimensionsAvgAggregateInputType = {
    id?: true
    d_min?: true
    d_max?: true
    b?: true
    h?: true
    t1?: true
    t2?: true
  }

  export type Key_dimensionsSumAggregateInputType = {
    id?: true
    d_min?: true
    d_max?: true
    b?: true
    h?: true
    t1?: true
    t2?: true
  }

  export type Key_dimensionsMinAggregateInputType = {
    id?: true
    d_min?: true
    d_max?: true
    b?: true
    h?: true
    t1?: true
    t2?: true
  }

  export type Key_dimensionsMaxAggregateInputType = {
    id?: true
    d_min?: true
    d_max?: true
    b?: true
    h?: true
    t1?: true
    t2?: true
  }

  export type Key_dimensionsCountAggregateInputType = {
    id?: true
    d_min?: true
    d_max?: true
    b?: true
    h?: true
    t1?: true
    t2?: true
    _all?: true
  }

  export type Key_dimensionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which key_dimensions to aggregate.
     */
    where?: key_dimensionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of key_dimensions to fetch.
     */
    orderBy?: key_dimensionsOrderByWithRelationInput | key_dimensionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: key_dimensionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` key_dimensions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` key_dimensions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned key_dimensions
    **/
    _count?: true | Key_dimensionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Key_dimensionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Key_dimensionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Key_dimensionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Key_dimensionsMaxAggregateInputType
  }

  export type GetKey_dimensionsAggregateType<T extends Key_dimensionsAggregateArgs> = {
        [P in keyof T & keyof AggregateKey_dimensions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKey_dimensions[P]>
      : GetScalarType<T[P], AggregateKey_dimensions[P]>
  }




  export type key_dimensionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: key_dimensionsWhereInput
    orderBy?: key_dimensionsOrderByWithAggregationInput | key_dimensionsOrderByWithAggregationInput[]
    by: Key_dimensionsScalarFieldEnum[] | Key_dimensionsScalarFieldEnum
    having?: key_dimensionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Key_dimensionsCountAggregateInputType | true
    _avg?: Key_dimensionsAvgAggregateInputType
    _sum?: Key_dimensionsSumAggregateInputType
    _min?: Key_dimensionsMinAggregateInputType
    _max?: Key_dimensionsMaxAggregateInputType
  }

  export type Key_dimensionsGroupByOutputType = {
    id: number
    d_min: number
    d_max: number
    b: number
    h: number
    t1: number
    t2: number
    _count: Key_dimensionsCountAggregateOutputType | null
    _avg: Key_dimensionsAvgAggregateOutputType | null
    _sum: Key_dimensionsSumAggregateOutputType | null
    _min: Key_dimensionsMinAggregateOutputType | null
    _max: Key_dimensionsMaxAggregateOutputType | null
  }

  type GetKey_dimensionsGroupByPayload<T extends key_dimensionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Key_dimensionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Key_dimensionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Key_dimensionsGroupByOutputType[P]>
            : GetScalarType<T[P], Key_dimensionsGroupByOutputType[P]>
        }
      >
    >


  export type key_dimensionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    d_min?: boolean
    d_max?: boolean
    b?: boolean
    h?: boolean
    t1?: boolean
    t2?: boolean
  }, ExtArgs["result"]["key_dimensions"]>



  export type key_dimensionsSelectScalar = {
    id?: boolean
    d_min?: boolean
    d_max?: boolean
    b?: boolean
    h?: boolean
    t1?: boolean
    t2?: boolean
  }

  export type key_dimensionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "d_min" | "d_max" | "b" | "h" | "t1" | "t2", ExtArgs["result"]["key_dimensions"]>

  export type $key_dimensionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "key_dimensions"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      d_min: number
      d_max: number
      b: number
      h: number
      t1: number
      t2: number
    }, ExtArgs["result"]["key_dimensions"]>
    composites: {}
  }

  type key_dimensionsGetPayload<S extends boolean | null | undefined | key_dimensionsDefaultArgs> = $Result.GetResult<Prisma.$key_dimensionsPayload, S>

  type key_dimensionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<key_dimensionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Key_dimensionsCountAggregateInputType | true
    }

  export interface key_dimensionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['key_dimensions'], meta: { name: 'key_dimensions' } }
    /**
     * Find zero or one Key_dimensions that matches the filter.
     * @param {key_dimensionsFindUniqueArgs} args - Arguments to find a Key_dimensions
     * @example
     * // Get one Key_dimensions
     * const key_dimensions = await prisma.key_dimensions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends key_dimensionsFindUniqueArgs>(args: SelectSubset<T, key_dimensionsFindUniqueArgs<ExtArgs>>): Prisma__key_dimensionsClient<$Result.GetResult<Prisma.$key_dimensionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Key_dimensions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {key_dimensionsFindUniqueOrThrowArgs} args - Arguments to find a Key_dimensions
     * @example
     * // Get one Key_dimensions
     * const key_dimensions = await prisma.key_dimensions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends key_dimensionsFindUniqueOrThrowArgs>(args: SelectSubset<T, key_dimensionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__key_dimensionsClient<$Result.GetResult<Prisma.$key_dimensionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Key_dimensions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {key_dimensionsFindFirstArgs} args - Arguments to find a Key_dimensions
     * @example
     * // Get one Key_dimensions
     * const key_dimensions = await prisma.key_dimensions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends key_dimensionsFindFirstArgs>(args?: SelectSubset<T, key_dimensionsFindFirstArgs<ExtArgs>>): Prisma__key_dimensionsClient<$Result.GetResult<Prisma.$key_dimensionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Key_dimensions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {key_dimensionsFindFirstOrThrowArgs} args - Arguments to find a Key_dimensions
     * @example
     * // Get one Key_dimensions
     * const key_dimensions = await prisma.key_dimensions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends key_dimensionsFindFirstOrThrowArgs>(args?: SelectSubset<T, key_dimensionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__key_dimensionsClient<$Result.GetResult<Prisma.$key_dimensionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Key_dimensions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {key_dimensionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Key_dimensions
     * const key_dimensions = await prisma.key_dimensions.findMany()
     * 
     * // Get first 10 Key_dimensions
     * const key_dimensions = await prisma.key_dimensions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const key_dimensionsWithIdOnly = await prisma.key_dimensions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends key_dimensionsFindManyArgs>(args?: SelectSubset<T, key_dimensionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$key_dimensionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Key_dimensions.
     * @param {key_dimensionsCreateArgs} args - Arguments to create a Key_dimensions.
     * @example
     * // Create one Key_dimensions
     * const Key_dimensions = await prisma.key_dimensions.create({
     *   data: {
     *     // ... data to create a Key_dimensions
     *   }
     * })
     * 
     */
    create<T extends key_dimensionsCreateArgs>(args: SelectSubset<T, key_dimensionsCreateArgs<ExtArgs>>): Prisma__key_dimensionsClient<$Result.GetResult<Prisma.$key_dimensionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Key_dimensions.
     * @param {key_dimensionsCreateManyArgs} args - Arguments to create many Key_dimensions.
     * @example
     * // Create many Key_dimensions
     * const key_dimensions = await prisma.key_dimensions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends key_dimensionsCreateManyArgs>(args?: SelectSubset<T, key_dimensionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Key_dimensions.
     * @param {key_dimensionsDeleteArgs} args - Arguments to delete one Key_dimensions.
     * @example
     * // Delete one Key_dimensions
     * const Key_dimensions = await prisma.key_dimensions.delete({
     *   where: {
     *     // ... filter to delete one Key_dimensions
     *   }
     * })
     * 
     */
    delete<T extends key_dimensionsDeleteArgs>(args: SelectSubset<T, key_dimensionsDeleteArgs<ExtArgs>>): Prisma__key_dimensionsClient<$Result.GetResult<Prisma.$key_dimensionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Key_dimensions.
     * @param {key_dimensionsUpdateArgs} args - Arguments to update one Key_dimensions.
     * @example
     * // Update one Key_dimensions
     * const key_dimensions = await prisma.key_dimensions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends key_dimensionsUpdateArgs>(args: SelectSubset<T, key_dimensionsUpdateArgs<ExtArgs>>): Prisma__key_dimensionsClient<$Result.GetResult<Prisma.$key_dimensionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Key_dimensions.
     * @param {key_dimensionsDeleteManyArgs} args - Arguments to filter Key_dimensions to delete.
     * @example
     * // Delete a few Key_dimensions
     * const { count } = await prisma.key_dimensions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends key_dimensionsDeleteManyArgs>(args?: SelectSubset<T, key_dimensionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Key_dimensions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {key_dimensionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Key_dimensions
     * const key_dimensions = await prisma.key_dimensions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends key_dimensionsUpdateManyArgs>(args: SelectSubset<T, key_dimensionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Key_dimensions.
     * @param {key_dimensionsUpsertArgs} args - Arguments to update or create a Key_dimensions.
     * @example
     * // Update or create a Key_dimensions
     * const key_dimensions = await prisma.key_dimensions.upsert({
     *   create: {
     *     // ... data to create a Key_dimensions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Key_dimensions we want to update
     *   }
     * })
     */
    upsert<T extends key_dimensionsUpsertArgs>(args: SelectSubset<T, key_dimensionsUpsertArgs<ExtArgs>>): Prisma__key_dimensionsClient<$Result.GetResult<Prisma.$key_dimensionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Key_dimensions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {key_dimensionsCountArgs} args - Arguments to filter Key_dimensions to count.
     * @example
     * // Count the number of Key_dimensions
     * const count = await prisma.key_dimensions.count({
     *   where: {
     *     // ... the filter for the Key_dimensions we want to count
     *   }
     * })
    **/
    count<T extends key_dimensionsCountArgs>(
      args?: Subset<T, key_dimensionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Key_dimensionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Key_dimensions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Key_dimensionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Key_dimensionsAggregateArgs>(args: Subset<T, Key_dimensionsAggregateArgs>): Prisma.PrismaPromise<GetKey_dimensionsAggregateType<T>>

    /**
     * Group by Key_dimensions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {key_dimensionsGroupByArgs} args - Group by arguments.
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
      T extends key_dimensionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: key_dimensionsGroupByArgs['orderBy'] }
        : { orderBy?: key_dimensionsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, key_dimensionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKey_dimensionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the key_dimensions model
   */
  readonly fields: key_dimensionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for key_dimensions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__key_dimensionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the key_dimensions model
   */
  interface key_dimensionsFieldRefs {
    readonly id: FieldRef<"key_dimensions", 'Int'>
    readonly d_min: FieldRef<"key_dimensions", 'Int'>
    readonly d_max: FieldRef<"key_dimensions", 'Int'>
    readonly b: FieldRef<"key_dimensions", 'Int'>
    readonly h: FieldRef<"key_dimensions", 'Int'>
    readonly t1: FieldRef<"key_dimensions", 'Float'>
    readonly t2: FieldRef<"key_dimensions", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * key_dimensions findUnique
   */
  export type key_dimensionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the key_dimensions
     */
    select?: key_dimensionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the key_dimensions
     */
    omit?: key_dimensionsOmit<ExtArgs> | null
    /**
     * Filter, which key_dimensions to fetch.
     */
    where: key_dimensionsWhereUniqueInput
  }

  /**
   * key_dimensions findUniqueOrThrow
   */
  export type key_dimensionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the key_dimensions
     */
    select?: key_dimensionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the key_dimensions
     */
    omit?: key_dimensionsOmit<ExtArgs> | null
    /**
     * Filter, which key_dimensions to fetch.
     */
    where: key_dimensionsWhereUniqueInput
  }

  /**
   * key_dimensions findFirst
   */
  export type key_dimensionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the key_dimensions
     */
    select?: key_dimensionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the key_dimensions
     */
    omit?: key_dimensionsOmit<ExtArgs> | null
    /**
     * Filter, which key_dimensions to fetch.
     */
    where?: key_dimensionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of key_dimensions to fetch.
     */
    orderBy?: key_dimensionsOrderByWithRelationInput | key_dimensionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for key_dimensions.
     */
    cursor?: key_dimensionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` key_dimensions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` key_dimensions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of key_dimensions.
     */
    distinct?: Key_dimensionsScalarFieldEnum | Key_dimensionsScalarFieldEnum[]
  }

  /**
   * key_dimensions findFirstOrThrow
   */
  export type key_dimensionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the key_dimensions
     */
    select?: key_dimensionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the key_dimensions
     */
    omit?: key_dimensionsOmit<ExtArgs> | null
    /**
     * Filter, which key_dimensions to fetch.
     */
    where?: key_dimensionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of key_dimensions to fetch.
     */
    orderBy?: key_dimensionsOrderByWithRelationInput | key_dimensionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for key_dimensions.
     */
    cursor?: key_dimensionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` key_dimensions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` key_dimensions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of key_dimensions.
     */
    distinct?: Key_dimensionsScalarFieldEnum | Key_dimensionsScalarFieldEnum[]
  }

  /**
   * key_dimensions findMany
   */
  export type key_dimensionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the key_dimensions
     */
    select?: key_dimensionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the key_dimensions
     */
    omit?: key_dimensionsOmit<ExtArgs> | null
    /**
     * Filter, which key_dimensions to fetch.
     */
    where?: key_dimensionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of key_dimensions to fetch.
     */
    orderBy?: key_dimensionsOrderByWithRelationInput | key_dimensionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing key_dimensions.
     */
    cursor?: key_dimensionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` key_dimensions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` key_dimensions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of key_dimensions.
     */
    distinct?: Key_dimensionsScalarFieldEnum | Key_dimensionsScalarFieldEnum[]
  }

  /**
   * key_dimensions create
   */
  export type key_dimensionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the key_dimensions
     */
    select?: key_dimensionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the key_dimensions
     */
    omit?: key_dimensionsOmit<ExtArgs> | null
    /**
     * The data needed to create a key_dimensions.
     */
    data: XOR<key_dimensionsCreateInput, key_dimensionsUncheckedCreateInput>
  }

  /**
   * key_dimensions createMany
   */
  export type key_dimensionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many key_dimensions.
     */
    data: key_dimensionsCreateManyInput | key_dimensionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * key_dimensions update
   */
  export type key_dimensionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the key_dimensions
     */
    select?: key_dimensionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the key_dimensions
     */
    omit?: key_dimensionsOmit<ExtArgs> | null
    /**
     * The data needed to update a key_dimensions.
     */
    data: XOR<key_dimensionsUpdateInput, key_dimensionsUncheckedUpdateInput>
    /**
     * Choose, which key_dimensions to update.
     */
    where: key_dimensionsWhereUniqueInput
  }

  /**
   * key_dimensions updateMany
   */
  export type key_dimensionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update key_dimensions.
     */
    data: XOR<key_dimensionsUpdateManyMutationInput, key_dimensionsUncheckedUpdateManyInput>
    /**
     * Filter which key_dimensions to update
     */
    where?: key_dimensionsWhereInput
    /**
     * Limit how many key_dimensions to update.
     */
    limit?: number
  }

  /**
   * key_dimensions upsert
   */
  export type key_dimensionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the key_dimensions
     */
    select?: key_dimensionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the key_dimensions
     */
    omit?: key_dimensionsOmit<ExtArgs> | null
    /**
     * The filter to search for the key_dimensions to update in case it exists.
     */
    where: key_dimensionsWhereUniqueInput
    /**
     * In case the key_dimensions found by the `where` argument doesn't exist, create a new key_dimensions with this data.
     */
    create: XOR<key_dimensionsCreateInput, key_dimensionsUncheckedCreateInput>
    /**
     * In case the key_dimensions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<key_dimensionsUpdateInput, key_dimensionsUncheckedUpdateInput>
  }

  /**
   * key_dimensions delete
   */
  export type key_dimensionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the key_dimensions
     */
    select?: key_dimensionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the key_dimensions
     */
    omit?: key_dimensionsOmit<ExtArgs> | null
    /**
     * Filter which key_dimensions to delete.
     */
    where: key_dimensionsWhereUniqueInput
  }

  /**
   * key_dimensions deleteMany
   */
  export type key_dimensionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which key_dimensions to delete
     */
    where?: key_dimensionsWhereInput
    /**
     * Limit how many key_dimensions to delete.
     */
    limit?: number
  }

  /**
   * key_dimensions without action
   */
  export type key_dimensionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the key_dimensions
     */
    select?: key_dimensionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the key_dimensions
     */
    omit?: key_dimensionsOmit<ExtArgs> | null
  }


  /**
   * Model standard_key_lengths
   */

  export type AggregateStandard_key_lengths = {
    _count: Standard_key_lengthsCountAggregateOutputType | null
    _avg: Standard_key_lengthsAvgAggregateOutputType | null
    _sum: Standard_key_lengthsSumAggregateOutputType | null
    _min: Standard_key_lengthsMinAggregateOutputType | null
    _max: Standard_key_lengthsMaxAggregateOutputType | null
  }

  export type Standard_key_lengthsAvgAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_key_lengthsSumAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_key_lengthsMinAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_key_lengthsMaxAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type Standard_key_lengthsCountAggregateOutputType = {
    id: number
    value: number
    _all: number
  }


  export type Standard_key_lengthsAvgAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_key_lengthsSumAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_key_lengthsMinAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_key_lengthsMaxAggregateInputType = {
    id?: true
    value?: true
  }

  export type Standard_key_lengthsCountAggregateInputType = {
    id?: true
    value?: true
    _all?: true
  }

  export type Standard_key_lengthsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which standard_key_lengths to aggregate.
     */
    where?: standard_key_lengthsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_key_lengths to fetch.
     */
    orderBy?: standard_key_lengthsOrderByWithRelationInput | standard_key_lengthsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: standard_key_lengthsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_key_lengths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_key_lengths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned standard_key_lengths
    **/
    _count?: true | Standard_key_lengthsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Standard_key_lengthsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Standard_key_lengthsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Standard_key_lengthsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Standard_key_lengthsMaxAggregateInputType
  }

  export type GetStandard_key_lengthsAggregateType<T extends Standard_key_lengthsAggregateArgs> = {
        [P in keyof T & keyof AggregateStandard_key_lengths]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStandard_key_lengths[P]>
      : GetScalarType<T[P], AggregateStandard_key_lengths[P]>
  }




  export type standard_key_lengthsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: standard_key_lengthsWhereInput
    orderBy?: standard_key_lengthsOrderByWithAggregationInput | standard_key_lengthsOrderByWithAggregationInput[]
    by: Standard_key_lengthsScalarFieldEnum[] | Standard_key_lengthsScalarFieldEnum
    having?: standard_key_lengthsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Standard_key_lengthsCountAggregateInputType | true
    _avg?: Standard_key_lengthsAvgAggregateInputType
    _sum?: Standard_key_lengthsSumAggregateInputType
    _min?: Standard_key_lengthsMinAggregateInputType
    _max?: Standard_key_lengthsMaxAggregateInputType
  }

  export type Standard_key_lengthsGroupByOutputType = {
    id: number
    value: number
    _count: Standard_key_lengthsCountAggregateOutputType | null
    _avg: Standard_key_lengthsAvgAggregateOutputType | null
    _sum: Standard_key_lengthsSumAggregateOutputType | null
    _min: Standard_key_lengthsMinAggregateOutputType | null
    _max: Standard_key_lengthsMaxAggregateOutputType | null
  }

  type GetStandard_key_lengthsGroupByPayload<T extends standard_key_lengthsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Standard_key_lengthsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Standard_key_lengthsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Standard_key_lengthsGroupByOutputType[P]>
            : GetScalarType<T[P], Standard_key_lengthsGroupByOutputType[P]>
        }
      >
    >


  export type standard_key_lengthsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
  }, ExtArgs["result"]["standard_key_lengths"]>



  export type standard_key_lengthsSelectScalar = {
    id?: boolean
    value?: boolean
  }

  export type standard_key_lengthsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value", ExtArgs["result"]["standard_key_lengths"]>

  export type $standard_key_lengthsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "standard_key_lengths"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      value: number
    }, ExtArgs["result"]["standard_key_lengths"]>
    composites: {}
  }

  type standard_key_lengthsGetPayload<S extends boolean | null | undefined | standard_key_lengthsDefaultArgs> = $Result.GetResult<Prisma.$standard_key_lengthsPayload, S>

  type standard_key_lengthsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<standard_key_lengthsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Standard_key_lengthsCountAggregateInputType | true
    }

  export interface standard_key_lengthsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['standard_key_lengths'], meta: { name: 'standard_key_lengths' } }
    /**
     * Find zero or one Standard_key_lengths that matches the filter.
     * @param {standard_key_lengthsFindUniqueArgs} args - Arguments to find a Standard_key_lengths
     * @example
     * // Get one Standard_key_lengths
     * const standard_key_lengths = await prisma.standard_key_lengths.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends standard_key_lengthsFindUniqueArgs>(args: SelectSubset<T, standard_key_lengthsFindUniqueArgs<ExtArgs>>): Prisma__standard_key_lengthsClient<$Result.GetResult<Prisma.$standard_key_lengthsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Standard_key_lengths that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {standard_key_lengthsFindUniqueOrThrowArgs} args - Arguments to find a Standard_key_lengths
     * @example
     * // Get one Standard_key_lengths
     * const standard_key_lengths = await prisma.standard_key_lengths.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends standard_key_lengthsFindUniqueOrThrowArgs>(args: SelectSubset<T, standard_key_lengthsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__standard_key_lengthsClient<$Result.GetResult<Prisma.$standard_key_lengthsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Standard_key_lengths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_key_lengthsFindFirstArgs} args - Arguments to find a Standard_key_lengths
     * @example
     * // Get one Standard_key_lengths
     * const standard_key_lengths = await prisma.standard_key_lengths.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends standard_key_lengthsFindFirstArgs>(args?: SelectSubset<T, standard_key_lengthsFindFirstArgs<ExtArgs>>): Prisma__standard_key_lengthsClient<$Result.GetResult<Prisma.$standard_key_lengthsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Standard_key_lengths that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_key_lengthsFindFirstOrThrowArgs} args - Arguments to find a Standard_key_lengths
     * @example
     * // Get one Standard_key_lengths
     * const standard_key_lengths = await prisma.standard_key_lengths.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends standard_key_lengthsFindFirstOrThrowArgs>(args?: SelectSubset<T, standard_key_lengthsFindFirstOrThrowArgs<ExtArgs>>): Prisma__standard_key_lengthsClient<$Result.GetResult<Prisma.$standard_key_lengthsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Standard_key_lengths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_key_lengthsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Standard_key_lengths
     * const standard_key_lengths = await prisma.standard_key_lengths.findMany()
     * 
     * // Get first 10 Standard_key_lengths
     * const standard_key_lengths = await prisma.standard_key_lengths.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const standard_key_lengthsWithIdOnly = await prisma.standard_key_lengths.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends standard_key_lengthsFindManyArgs>(args?: SelectSubset<T, standard_key_lengthsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$standard_key_lengthsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Standard_key_lengths.
     * @param {standard_key_lengthsCreateArgs} args - Arguments to create a Standard_key_lengths.
     * @example
     * // Create one Standard_key_lengths
     * const Standard_key_lengths = await prisma.standard_key_lengths.create({
     *   data: {
     *     // ... data to create a Standard_key_lengths
     *   }
     * })
     * 
     */
    create<T extends standard_key_lengthsCreateArgs>(args: SelectSubset<T, standard_key_lengthsCreateArgs<ExtArgs>>): Prisma__standard_key_lengthsClient<$Result.GetResult<Prisma.$standard_key_lengthsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Standard_key_lengths.
     * @param {standard_key_lengthsCreateManyArgs} args - Arguments to create many Standard_key_lengths.
     * @example
     * // Create many Standard_key_lengths
     * const standard_key_lengths = await prisma.standard_key_lengths.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends standard_key_lengthsCreateManyArgs>(args?: SelectSubset<T, standard_key_lengthsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Standard_key_lengths.
     * @param {standard_key_lengthsDeleteArgs} args - Arguments to delete one Standard_key_lengths.
     * @example
     * // Delete one Standard_key_lengths
     * const Standard_key_lengths = await prisma.standard_key_lengths.delete({
     *   where: {
     *     // ... filter to delete one Standard_key_lengths
     *   }
     * })
     * 
     */
    delete<T extends standard_key_lengthsDeleteArgs>(args: SelectSubset<T, standard_key_lengthsDeleteArgs<ExtArgs>>): Prisma__standard_key_lengthsClient<$Result.GetResult<Prisma.$standard_key_lengthsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Standard_key_lengths.
     * @param {standard_key_lengthsUpdateArgs} args - Arguments to update one Standard_key_lengths.
     * @example
     * // Update one Standard_key_lengths
     * const standard_key_lengths = await prisma.standard_key_lengths.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends standard_key_lengthsUpdateArgs>(args: SelectSubset<T, standard_key_lengthsUpdateArgs<ExtArgs>>): Prisma__standard_key_lengthsClient<$Result.GetResult<Prisma.$standard_key_lengthsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Standard_key_lengths.
     * @param {standard_key_lengthsDeleteManyArgs} args - Arguments to filter Standard_key_lengths to delete.
     * @example
     * // Delete a few Standard_key_lengths
     * const { count } = await prisma.standard_key_lengths.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends standard_key_lengthsDeleteManyArgs>(args?: SelectSubset<T, standard_key_lengthsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Standard_key_lengths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_key_lengthsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Standard_key_lengths
     * const standard_key_lengths = await prisma.standard_key_lengths.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends standard_key_lengthsUpdateManyArgs>(args: SelectSubset<T, standard_key_lengthsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Standard_key_lengths.
     * @param {standard_key_lengthsUpsertArgs} args - Arguments to update or create a Standard_key_lengths.
     * @example
     * // Update or create a Standard_key_lengths
     * const standard_key_lengths = await prisma.standard_key_lengths.upsert({
     *   create: {
     *     // ... data to create a Standard_key_lengths
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Standard_key_lengths we want to update
     *   }
     * })
     */
    upsert<T extends standard_key_lengthsUpsertArgs>(args: SelectSubset<T, standard_key_lengthsUpsertArgs<ExtArgs>>): Prisma__standard_key_lengthsClient<$Result.GetResult<Prisma.$standard_key_lengthsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Standard_key_lengths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_key_lengthsCountArgs} args - Arguments to filter Standard_key_lengths to count.
     * @example
     * // Count the number of Standard_key_lengths
     * const count = await prisma.standard_key_lengths.count({
     *   where: {
     *     // ... the filter for the Standard_key_lengths we want to count
     *   }
     * })
    **/
    count<T extends standard_key_lengthsCountArgs>(
      args?: Subset<T, standard_key_lengthsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Standard_key_lengthsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Standard_key_lengths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Standard_key_lengthsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Standard_key_lengthsAggregateArgs>(args: Subset<T, Standard_key_lengthsAggregateArgs>): Prisma.PrismaPromise<GetStandard_key_lengthsAggregateType<T>>

    /**
     * Group by Standard_key_lengths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {standard_key_lengthsGroupByArgs} args - Group by arguments.
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
      T extends standard_key_lengthsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: standard_key_lengthsGroupByArgs['orderBy'] }
        : { orderBy?: standard_key_lengthsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, standard_key_lengthsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStandard_key_lengthsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the standard_key_lengths model
   */
  readonly fields: standard_key_lengthsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for standard_key_lengths.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__standard_key_lengthsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the standard_key_lengths model
   */
  interface standard_key_lengthsFieldRefs {
    readonly id: FieldRef<"standard_key_lengths", 'Int'>
    readonly value: FieldRef<"standard_key_lengths", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * standard_key_lengths findUnique
   */
  export type standard_key_lengthsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_key_lengths
     */
    select?: standard_key_lengthsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_key_lengths
     */
    omit?: standard_key_lengthsOmit<ExtArgs> | null
    /**
     * Filter, which standard_key_lengths to fetch.
     */
    where: standard_key_lengthsWhereUniqueInput
  }

  /**
   * standard_key_lengths findUniqueOrThrow
   */
  export type standard_key_lengthsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_key_lengths
     */
    select?: standard_key_lengthsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_key_lengths
     */
    omit?: standard_key_lengthsOmit<ExtArgs> | null
    /**
     * Filter, which standard_key_lengths to fetch.
     */
    where: standard_key_lengthsWhereUniqueInput
  }

  /**
   * standard_key_lengths findFirst
   */
  export type standard_key_lengthsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_key_lengths
     */
    select?: standard_key_lengthsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_key_lengths
     */
    omit?: standard_key_lengthsOmit<ExtArgs> | null
    /**
     * Filter, which standard_key_lengths to fetch.
     */
    where?: standard_key_lengthsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_key_lengths to fetch.
     */
    orderBy?: standard_key_lengthsOrderByWithRelationInput | standard_key_lengthsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for standard_key_lengths.
     */
    cursor?: standard_key_lengthsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_key_lengths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_key_lengths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_key_lengths.
     */
    distinct?: Standard_key_lengthsScalarFieldEnum | Standard_key_lengthsScalarFieldEnum[]
  }

  /**
   * standard_key_lengths findFirstOrThrow
   */
  export type standard_key_lengthsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_key_lengths
     */
    select?: standard_key_lengthsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_key_lengths
     */
    omit?: standard_key_lengthsOmit<ExtArgs> | null
    /**
     * Filter, which standard_key_lengths to fetch.
     */
    where?: standard_key_lengthsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_key_lengths to fetch.
     */
    orderBy?: standard_key_lengthsOrderByWithRelationInput | standard_key_lengthsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for standard_key_lengths.
     */
    cursor?: standard_key_lengthsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_key_lengths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_key_lengths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_key_lengths.
     */
    distinct?: Standard_key_lengthsScalarFieldEnum | Standard_key_lengthsScalarFieldEnum[]
  }

  /**
   * standard_key_lengths findMany
   */
  export type standard_key_lengthsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_key_lengths
     */
    select?: standard_key_lengthsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_key_lengths
     */
    omit?: standard_key_lengthsOmit<ExtArgs> | null
    /**
     * Filter, which standard_key_lengths to fetch.
     */
    where?: standard_key_lengthsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of standard_key_lengths to fetch.
     */
    orderBy?: standard_key_lengthsOrderByWithRelationInput | standard_key_lengthsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing standard_key_lengths.
     */
    cursor?: standard_key_lengthsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` standard_key_lengths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` standard_key_lengths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of standard_key_lengths.
     */
    distinct?: Standard_key_lengthsScalarFieldEnum | Standard_key_lengthsScalarFieldEnum[]
  }

  /**
   * standard_key_lengths create
   */
  export type standard_key_lengthsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_key_lengths
     */
    select?: standard_key_lengthsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_key_lengths
     */
    omit?: standard_key_lengthsOmit<ExtArgs> | null
    /**
     * The data needed to create a standard_key_lengths.
     */
    data: XOR<standard_key_lengthsCreateInput, standard_key_lengthsUncheckedCreateInput>
  }

  /**
   * standard_key_lengths createMany
   */
  export type standard_key_lengthsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many standard_key_lengths.
     */
    data: standard_key_lengthsCreateManyInput | standard_key_lengthsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * standard_key_lengths update
   */
  export type standard_key_lengthsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_key_lengths
     */
    select?: standard_key_lengthsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_key_lengths
     */
    omit?: standard_key_lengthsOmit<ExtArgs> | null
    /**
     * The data needed to update a standard_key_lengths.
     */
    data: XOR<standard_key_lengthsUpdateInput, standard_key_lengthsUncheckedUpdateInput>
    /**
     * Choose, which standard_key_lengths to update.
     */
    where: standard_key_lengthsWhereUniqueInput
  }

  /**
   * standard_key_lengths updateMany
   */
  export type standard_key_lengthsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update standard_key_lengths.
     */
    data: XOR<standard_key_lengthsUpdateManyMutationInput, standard_key_lengthsUncheckedUpdateManyInput>
    /**
     * Filter which standard_key_lengths to update
     */
    where?: standard_key_lengthsWhereInput
    /**
     * Limit how many standard_key_lengths to update.
     */
    limit?: number
  }

  /**
   * standard_key_lengths upsert
   */
  export type standard_key_lengthsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_key_lengths
     */
    select?: standard_key_lengthsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_key_lengths
     */
    omit?: standard_key_lengthsOmit<ExtArgs> | null
    /**
     * The filter to search for the standard_key_lengths to update in case it exists.
     */
    where: standard_key_lengthsWhereUniqueInput
    /**
     * In case the standard_key_lengths found by the `where` argument doesn't exist, create a new standard_key_lengths with this data.
     */
    create: XOR<standard_key_lengthsCreateInput, standard_key_lengthsUncheckedCreateInput>
    /**
     * In case the standard_key_lengths was found with the provided `where` argument, update it with this data.
     */
    update: XOR<standard_key_lengthsUpdateInput, standard_key_lengthsUncheckedUpdateInput>
  }

  /**
   * standard_key_lengths delete
   */
  export type standard_key_lengthsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_key_lengths
     */
    select?: standard_key_lengthsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_key_lengths
     */
    omit?: standard_key_lengthsOmit<ExtArgs> | null
    /**
     * Filter which standard_key_lengths to delete.
     */
    where: standard_key_lengthsWhereUniqueInput
  }

  /**
   * standard_key_lengths deleteMany
   */
  export type standard_key_lengthsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which standard_key_lengths to delete
     */
    where?: standard_key_lengthsWhereInput
    /**
     * Limit how many standard_key_lengths to delete.
     */
    limit?: number
  }

  /**
   * standard_key_lengths without action
   */
  export type standard_key_lengthsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the standard_key_lengths
     */
    select?: standard_key_lengthsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the standard_key_lengths
     */
    omit?: standard_key_lengthsOmit<ExtArgs> | null
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
    e: 'e',
    Y: 'Y',
    alpha_deg: 'alpha_deg',
    is_active: 'is_active'
  };

  export type BearingsScalarFieldEnum = (typeof BearingsScalarFieldEnum)[keyof typeof BearingsScalarFieldEnum]


  export const ChainsScalarFieldEnum: {
    id: 'id',
    pitch: 'pitch',
    breaking_load: 'breaking_load',
    mass_per_m: 'mass_per_m',
    A_mm2: 'A_mm2',
    s_allow: 's_allow',
    n_ref: 'n_ref',
    is_active: 'is_active'
  };

  export type ChainsScalarFieldEnum = (typeof ChainsScalarFieldEnum)[keyof typeof ChainsScalarFieldEnum]


  export const MotorsScalarFieldEnum: {
    id: 'id',
    series: 'series',
    code: 'code',
    P_dm: 'P_dm',
    n_dm: 'n_dm',
    efficiency: 'efficiency',
    cos_phi: 'cos_phi',
    t_start_ratio: 't_start_ratio',
    t_max_ratio: 't_max_ratio',
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


  export const Material_gradesScalarFieldEnum: {
    id: 'id',
    grade_name: 'grade_name',
    HB: 'HB',
    sigma_b: 'sigma_b',
    sigma_ch: 'sigma_ch',
    sigma_Hlim: 'sigma_Hlim',
    sigma_Flim: 'sigma_Flim'
  };

  export type Material_gradesScalarFieldEnum = (typeof Material_gradesScalarFieldEnum)[keyof typeof Material_gradesScalarFieldEnum]


  export const Standard_modulesScalarFieldEnum: {
    id: 'id',
    value: 'value'
  };

  export type Standard_modulesScalarFieldEnum = (typeof Standard_modulesScalarFieldEnum)[keyof typeof Standard_modulesScalarFieldEnum]


  export const Standard_center_distancesScalarFieldEnum: {
    id: 'id',
    value: 'value'
  };

  export type Standard_center_distancesScalarFieldEnum = (typeof Standard_center_distancesScalarFieldEnum)[keyof typeof Standard_center_distancesScalarFieldEnum]


  export const Standard_shaft_diametersScalarFieldEnum: {
    id: 'id',
    value: 'value'
  };

  export type Standard_shaft_diametersScalarFieldEnum = (typeof Standard_shaft_diametersScalarFieldEnum)[keyof typeof Standard_shaft_diametersScalarFieldEnum]


  export const Key_dimensionsScalarFieldEnum: {
    id: 'id',
    d_min: 'd_min',
    d_max: 'd_max',
    b: 'b',
    h: 'h',
    t1: 't1',
    t2: 't2'
  };

  export type Key_dimensionsScalarFieldEnum = (typeof Key_dimensionsScalarFieldEnum)[keyof typeof Key_dimensionsScalarFieldEnum]


  export const Standard_key_lengthsScalarFieldEnum: {
    id: 'id',
    value: 'value'
  };

  export type Standard_key_lengthsScalarFieldEnum = (typeof Standard_key_lengthsScalarFieldEnum)[keyof typeof Standard_key_lengthsScalarFieldEnum]


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
    series: 'series',
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


  export const material_gradesOrderByRelevanceFieldEnum: {
    grade_name: 'grade_name'
  };

  export type material_gradesOrderByRelevanceFieldEnum = (typeof material_gradesOrderByRelevanceFieldEnum)[keyof typeof material_gradesOrderByRelevanceFieldEnum]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


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
   * Deep Input Types
   */


  export type bearingsWhereInput = {
    AND?: bearingsWhereInput | bearingsWhereInput[]
    OR?: bearingsWhereInput[]
    NOT?: bearingsWhereInput | bearingsWhereInput[]
    id?: IntFilter<"bearings"> | number
    code?: StringFilter<"bearings"> | string
    type?: StringNullableFilter<"bearings"> | string | null
    inner_d?: FloatFilter<"bearings"> | number
    outer_D?: FloatFilter<"bearings"> | number
    width_B?: FloatFilter<"bearings"> | number
    C?: FloatNullableFilter<"bearings"> | number | null
    C0?: FloatNullableFilter<"bearings"> | number | null
    e?: FloatNullableFilter<"bearings"> | number | null
    Y?: FloatNullableFilter<"bearings"> | number | null
    alpha_deg?: FloatNullableFilter<"bearings"> | number | null
    is_active?: BoolNullableFilter<"bearings"> | boolean | null
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
    e?: SortOrderInput | SortOrder
    Y?: SortOrderInput | SortOrder
    alpha_deg?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    _relevance?: bearingsOrderByRelevanceInput
  }

  export type bearingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: bearingsWhereInput | bearingsWhereInput[]
    OR?: bearingsWhereInput[]
    NOT?: bearingsWhereInput | bearingsWhereInput[]
    type?: StringNullableFilter<"bearings"> | string | null
    inner_d?: FloatFilter<"bearings"> | number
    outer_D?: FloatFilter<"bearings"> | number
    width_B?: FloatFilter<"bearings"> | number
    C?: FloatNullableFilter<"bearings"> | number | null
    C0?: FloatNullableFilter<"bearings"> | number | null
    e?: FloatNullableFilter<"bearings"> | number | null
    Y?: FloatNullableFilter<"bearings"> | number | null
    alpha_deg?: FloatNullableFilter<"bearings"> | number | null
    is_active?: BoolNullableFilter<"bearings"> | boolean | null
  }, "id" | "code">

  export type bearingsOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrderInput | SortOrder
    inner_d?: SortOrder
    outer_D?: SortOrder
    width_B?: SortOrder
    C?: SortOrderInput | SortOrder
    C0?: SortOrderInput | SortOrder
    e?: SortOrderInput | SortOrder
    Y?: SortOrderInput | SortOrder
    alpha_deg?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
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
    inner_d?: FloatWithAggregatesFilter<"bearings"> | number
    outer_D?: FloatWithAggregatesFilter<"bearings"> | number
    width_B?: FloatWithAggregatesFilter<"bearings"> | number
    C?: FloatNullableWithAggregatesFilter<"bearings"> | number | null
    C0?: FloatNullableWithAggregatesFilter<"bearings"> | number | null
    e?: FloatNullableWithAggregatesFilter<"bearings"> | number | null
    Y?: FloatNullableWithAggregatesFilter<"bearings"> | number | null
    alpha_deg?: FloatNullableWithAggregatesFilter<"bearings"> | number | null
    is_active?: BoolNullableWithAggregatesFilter<"bearings"> | boolean | null
  }

  export type chainsWhereInput = {
    AND?: chainsWhereInput | chainsWhereInput[]
    OR?: chainsWhereInput[]
    NOT?: chainsWhereInput | chainsWhereInput[]
    id?: IntFilter<"chains"> | number
    pitch?: FloatFilter<"chains"> | number
    breaking_load?: FloatNullableFilter<"chains"> | number | null
    mass_per_m?: FloatNullableFilter<"chains"> | number | null
    A_mm2?: FloatNullableFilter<"chains"> | number | null
    s_allow?: FloatNullableFilter<"chains"> | number | null
    n_ref?: IntNullableFilter<"chains"> | number | null
    is_active?: BoolNullableFilter<"chains"> | boolean | null
  }

  export type chainsOrderByWithRelationInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrderInput | SortOrder
    mass_per_m?: SortOrderInput | SortOrder
    A_mm2?: SortOrderInput | SortOrder
    s_allow?: SortOrderInput | SortOrder
    n_ref?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
  }

  export type chainsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    pitch?: number
    AND?: chainsWhereInput | chainsWhereInput[]
    OR?: chainsWhereInput[]
    NOT?: chainsWhereInput | chainsWhereInput[]
    breaking_load?: FloatNullableFilter<"chains"> | number | null
    mass_per_m?: FloatNullableFilter<"chains"> | number | null
    A_mm2?: FloatNullableFilter<"chains"> | number | null
    s_allow?: FloatNullableFilter<"chains"> | number | null
    n_ref?: IntNullableFilter<"chains"> | number | null
    is_active?: BoolNullableFilter<"chains"> | boolean | null
  }, "id" | "pitch">

  export type chainsOrderByWithAggregationInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrderInput | SortOrder
    mass_per_m?: SortOrderInput | SortOrder
    A_mm2?: SortOrderInput | SortOrder
    s_allow?: SortOrderInput | SortOrder
    n_ref?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
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
    pitch?: FloatWithAggregatesFilter<"chains"> | number
    breaking_load?: FloatNullableWithAggregatesFilter<"chains"> | number | null
    mass_per_m?: FloatNullableWithAggregatesFilter<"chains"> | number | null
    A_mm2?: FloatNullableWithAggregatesFilter<"chains"> | number | null
    s_allow?: FloatNullableWithAggregatesFilter<"chains"> | number | null
    n_ref?: IntNullableWithAggregatesFilter<"chains"> | number | null
    is_active?: BoolNullableWithAggregatesFilter<"chains"> | boolean | null
  }

  export type motorsWhereInput = {
    AND?: motorsWhereInput | motorsWhereInput[]
    OR?: motorsWhereInput[]
    NOT?: motorsWhereInput | motorsWhereInput[]
    id?: IntFilter<"motors"> | number
    series?: StringNullableFilter<"motors"> | string | null
    code?: StringFilter<"motors"> | string
    P_dm?: DecimalFilter<"motors"> | Decimal | DecimalJsLike | number | string
    n_dm?: IntFilter<"motors"> | number
    efficiency?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    cos_phi?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
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
    series?: SortOrderInput | SortOrder
    code?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    efficiency?: SortOrderInput | SortOrder
    cos_phi?: SortOrderInput | SortOrder
    t_start_ratio?: SortOrderInput | SortOrder
    t_max_ratio?: SortOrderInput | SortOrder
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
    series?: StringNullableFilter<"motors"> | string | null
    P_dm?: DecimalFilter<"motors"> | Decimal | DecimalJsLike | number | string
    n_dm?: IntFilter<"motors"> | number
    efficiency?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    cos_phi?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: DecimalNullableFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
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
    series?: SortOrderInput | SortOrder
    code?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    efficiency?: SortOrderInput | SortOrder
    cos_phi?: SortOrderInput | SortOrder
    t_start_ratio?: SortOrderInput | SortOrder
    t_max_ratio?: SortOrderInput | SortOrder
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
    series?: StringNullableWithAggregatesFilter<"motors"> | string | null
    code?: StringWithAggregatesFilter<"motors"> | string
    P_dm?: DecimalWithAggregatesFilter<"motors"> | Decimal | DecimalJsLike | number | string
    n_dm?: IntWithAggregatesFilter<"motors"> | number
    efficiency?: DecimalNullableWithAggregatesFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    cos_phi?: DecimalNullableWithAggregatesFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: DecimalNullableWithAggregatesFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: DecimalNullableWithAggregatesFilter<"motors"> | Decimal | DecimalJsLike | number | string | null
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

  export type material_gradesWhereInput = {
    AND?: material_gradesWhereInput | material_gradesWhereInput[]
    OR?: material_gradesWhereInput[]
    NOT?: material_gradesWhereInput | material_gradesWhereInput[]
    id?: IntFilter<"material_grades"> | number
    grade_name?: StringFilter<"material_grades"> | string
    HB?: IntFilter<"material_grades"> | number
    sigma_b?: FloatFilter<"material_grades"> | number
    sigma_ch?: FloatFilter<"material_grades"> | number
    sigma_Hlim?: FloatFilter<"material_grades"> | number
    sigma_Flim?: FloatFilter<"material_grades"> | number
  }

  export type material_gradesOrderByWithRelationInput = {
    id?: SortOrder
    grade_name?: SortOrder
    HB?: SortOrder
    sigma_b?: SortOrder
    sigma_ch?: SortOrder
    sigma_Hlim?: SortOrder
    sigma_Flim?: SortOrder
    _relevance?: material_gradesOrderByRelevanceInput
  }

  export type material_gradesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    grade_name?: string
    AND?: material_gradesWhereInput | material_gradesWhereInput[]
    OR?: material_gradesWhereInput[]
    NOT?: material_gradesWhereInput | material_gradesWhereInput[]
    HB?: IntFilter<"material_grades"> | number
    sigma_b?: FloatFilter<"material_grades"> | number
    sigma_ch?: FloatFilter<"material_grades"> | number
    sigma_Hlim?: FloatFilter<"material_grades"> | number
    sigma_Flim?: FloatFilter<"material_grades"> | number
  }, "id" | "grade_name">

  export type material_gradesOrderByWithAggregationInput = {
    id?: SortOrder
    grade_name?: SortOrder
    HB?: SortOrder
    sigma_b?: SortOrder
    sigma_ch?: SortOrder
    sigma_Hlim?: SortOrder
    sigma_Flim?: SortOrder
    _count?: material_gradesCountOrderByAggregateInput
    _avg?: material_gradesAvgOrderByAggregateInput
    _max?: material_gradesMaxOrderByAggregateInput
    _min?: material_gradesMinOrderByAggregateInput
    _sum?: material_gradesSumOrderByAggregateInput
  }

  export type material_gradesScalarWhereWithAggregatesInput = {
    AND?: material_gradesScalarWhereWithAggregatesInput | material_gradesScalarWhereWithAggregatesInput[]
    OR?: material_gradesScalarWhereWithAggregatesInput[]
    NOT?: material_gradesScalarWhereWithAggregatesInput | material_gradesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"material_grades"> | number
    grade_name?: StringWithAggregatesFilter<"material_grades"> | string
    HB?: IntWithAggregatesFilter<"material_grades"> | number
    sigma_b?: FloatWithAggregatesFilter<"material_grades"> | number
    sigma_ch?: FloatWithAggregatesFilter<"material_grades"> | number
    sigma_Hlim?: FloatWithAggregatesFilter<"material_grades"> | number
    sigma_Flim?: FloatWithAggregatesFilter<"material_grades"> | number
  }

  export type standard_modulesWhereInput = {
    AND?: standard_modulesWhereInput | standard_modulesWhereInput[]
    OR?: standard_modulesWhereInput[]
    NOT?: standard_modulesWhereInput | standard_modulesWhereInput[]
    id?: IntFilter<"standard_modules"> | number
    value?: FloatFilter<"standard_modules"> | number
  }

  export type standard_modulesOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_modulesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    value?: number
    AND?: standard_modulesWhereInput | standard_modulesWhereInput[]
    OR?: standard_modulesWhereInput[]
    NOT?: standard_modulesWhereInput | standard_modulesWhereInput[]
  }, "id" | "value">

  export type standard_modulesOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    _count?: standard_modulesCountOrderByAggregateInput
    _avg?: standard_modulesAvgOrderByAggregateInput
    _max?: standard_modulesMaxOrderByAggregateInput
    _min?: standard_modulesMinOrderByAggregateInput
    _sum?: standard_modulesSumOrderByAggregateInput
  }

  export type standard_modulesScalarWhereWithAggregatesInput = {
    AND?: standard_modulesScalarWhereWithAggregatesInput | standard_modulesScalarWhereWithAggregatesInput[]
    OR?: standard_modulesScalarWhereWithAggregatesInput[]
    NOT?: standard_modulesScalarWhereWithAggregatesInput | standard_modulesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"standard_modules"> | number
    value?: FloatWithAggregatesFilter<"standard_modules"> | number
  }

  export type standard_center_distancesWhereInput = {
    AND?: standard_center_distancesWhereInput | standard_center_distancesWhereInput[]
    OR?: standard_center_distancesWhereInput[]
    NOT?: standard_center_distancesWhereInput | standard_center_distancesWhereInput[]
    id?: IntFilter<"standard_center_distances"> | number
    value?: IntFilter<"standard_center_distances"> | number
  }

  export type standard_center_distancesOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_center_distancesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    value?: number
    AND?: standard_center_distancesWhereInput | standard_center_distancesWhereInput[]
    OR?: standard_center_distancesWhereInput[]
    NOT?: standard_center_distancesWhereInput | standard_center_distancesWhereInput[]
  }, "id" | "value">

  export type standard_center_distancesOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    _count?: standard_center_distancesCountOrderByAggregateInput
    _avg?: standard_center_distancesAvgOrderByAggregateInput
    _max?: standard_center_distancesMaxOrderByAggregateInput
    _min?: standard_center_distancesMinOrderByAggregateInput
    _sum?: standard_center_distancesSumOrderByAggregateInput
  }

  export type standard_center_distancesScalarWhereWithAggregatesInput = {
    AND?: standard_center_distancesScalarWhereWithAggregatesInput | standard_center_distancesScalarWhereWithAggregatesInput[]
    OR?: standard_center_distancesScalarWhereWithAggregatesInput[]
    NOT?: standard_center_distancesScalarWhereWithAggregatesInput | standard_center_distancesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"standard_center_distances"> | number
    value?: IntWithAggregatesFilter<"standard_center_distances"> | number
  }

  export type standard_shaft_diametersWhereInput = {
    AND?: standard_shaft_diametersWhereInput | standard_shaft_diametersWhereInput[]
    OR?: standard_shaft_diametersWhereInput[]
    NOT?: standard_shaft_diametersWhereInput | standard_shaft_diametersWhereInput[]
    id?: IntFilter<"standard_shaft_diameters"> | number
    value?: IntFilter<"standard_shaft_diameters"> | number
  }

  export type standard_shaft_diametersOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_shaft_diametersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    value?: number
    AND?: standard_shaft_diametersWhereInput | standard_shaft_diametersWhereInput[]
    OR?: standard_shaft_diametersWhereInput[]
    NOT?: standard_shaft_diametersWhereInput | standard_shaft_diametersWhereInput[]
  }, "id" | "value">

  export type standard_shaft_diametersOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    _count?: standard_shaft_diametersCountOrderByAggregateInput
    _avg?: standard_shaft_diametersAvgOrderByAggregateInput
    _max?: standard_shaft_diametersMaxOrderByAggregateInput
    _min?: standard_shaft_diametersMinOrderByAggregateInput
    _sum?: standard_shaft_diametersSumOrderByAggregateInput
  }

  export type standard_shaft_diametersScalarWhereWithAggregatesInput = {
    AND?: standard_shaft_diametersScalarWhereWithAggregatesInput | standard_shaft_diametersScalarWhereWithAggregatesInput[]
    OR?: standard_shaft_diametersScalarWhereWithAggregatesInput[]
    NOT?: standard_shaft_diametersScalarWhereWithAggregatesInput | standard_shaft_diametersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"standard_shaft_diameters"> | number
    value?: IntWithAggregatesFilter<"standard_shaft_diameters"> | number
  }

  export type key_dimensionsWhereInput = {
    AND?: key_dimensionsWhereInput | key_dimensionsWhereInput[]
    OR?: key_dimensionsWhereInput[]
    NOT?: key_dimensionsWhereInput | key_dimensionsWhereInput[]
    id?: IntFilter<"key_dimensions"> | number
    d_min?: IntFilter<"key_dimensions"> | number
    d_max?: IntFilter<"key_dimensions"> | number
    b?: IntFilter<"key_dimensions"> | number
    h?: IntFilter<"key_dimensions"> | number
    t1?: FloatFilter<"key_dimensions"> | number
    t2?: FloatFilter<"key_dimensions"> | number
  }

  export type key_dimensionsOrderByWithRelationInput = {
    id?: SortOrder
    d_min?: SortOrder
    d_max?: SortOrder
    b?: SortOrder
    h?: SortOrder
    t1?: SortOrder
    t2?: SortOrder
  }

  export type key_dimensionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: key_dimensionsWhereInput | key_dimensionsWhereInput[]
    OR?: key_dimensionsWhereInput[]
    NOT?: key_dimensionsWhereInput | key_dimensionsWhereInput[]
    d_min?: IntFilter<"key_dimensions"> | number
    d_max?: IntFilter<"key_dimensions"> | number
    b?: IntFilter<"key_dimensions"> | number
    h?: IntFilter<"key_dimensions"> | number
    t1?: FloatFilter<"key_dimensions"> | number
    t2?: FloatFilter<"key_dimensions"> | number
  }, "id">

  export type key_dimensionsOrderByWithAggregationInput = {
    id?: SortOrder
    d_min?: SortOrder
    d_max?: SortOrder
    b?: SortOrder
    h?: SortOrder
    t1?: SortOrder
    t2?: SortOrder
    _count?: key_dimensionsCountOrderByAggregateInput
    _avg?: key_dimensionsAvgOrderByAggregateInput
    _max?: key_dimensionsMaxOrderByAggregateInput
    _min?: key_dimensionsMinOrderByAggregateInput
    _sum?: key_dimensionsSumOrderByAggregateInput
  }

  export type key_dimensionsScalarWhereWithAggregatesInput = {
    AND?: key_dimensionsScalarWhereWithAggregatesInput | key_dimensionsScalarWhereWithAggregatesInput[]
    OR?: key_dimensionsScalarWhereWithAggregatesInput[]
    NOT?: key_dimensionsScalarWhereWithAggregatesInput | key_dimensionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"key_dimensions"> | number
    d_min?: IntWithAggregatesFilter<"key_dimensions"> | number
    d_max?: IntWithAggregatesFilter<"key_dimensions"> | number
    b?: IntWithAggregatesFilter<"key_dimensions"> | number
    h?: IntWithAggregatesFilter<"key_dimensions"> | number
    t1?: FloatWithAggregatesFilter<"key_dimensions"> | number
    t2?: FloatWithAggregatesFilter<"key_dimensions"> | number
  }

  export type standard_key_lengthsWhereInput = {
    AND?: standard_key_lengthsWhereInput | standard_key_lengthsWhereInput[]
    OR?: standard_key_lengthsWhereInput[]
    NOT?: standard_key_lengthsWhereInput | standard_key_lengthsWhereInput[]
    id?: IntFilter<"standard_key_lengths"> | number
    value?: IntFilter<"standard_key_lengths"> | number
  }

  export type standard_key_lengthsOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_key_lengthsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    value?: number
    AND?: standard_key_lengthsWhereInput | standard_key_lengthsWhereInput[]
    OR?: standard_key_lengthsWhereInput[]
    NOT?: standard_key_lengthsWhereInput | standard_key_lengthsWhereInput[]
  }, "id" | "value">

  export type standard_key_lengthsOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    _count?: standard_key_lengthsCountOrderByAggregateInput
    _avg?: standard_key_lengthsAvgOrderByAggregateInput
    _max?: standard_key_lengthsMaxOrderByAggregateInput
    _min?: standard_key_lengthsMinOrderByAggregateInput
    _sum?: standard_key_lengthsSumOrderByAggregateInput
  }

  export type standard_key_lengthsScalarWhereWithAggregatesInput = {
    AND?: standard_key_lengthsScalarWhereWithAggregatesInput | standard_key_lengthsScalarWhereWithAggregatesInput[]
    OR?: standard_key_lengthsScalarWhereWithAggregatesInput[]
    NOT?: standard_key_lengthsScalarWhereWithAggregatesInput | standard_key_lengthsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"standard_key_lengths"> | number
    value?: IntWithAggregatesFilter<"standard_key_lengths"> | number
  }

  export type bearingsCreateInput = {
    code: string
    type?: string | null
    inner_d: number
    outer_D: number
    width_B: number
    C?: number | null
    C0?: number | null
    e?: number | null
    Y?: number | null
    alpha_deg?: number | null
    is_active?: boolean | null
  }

  export type bearingsUncheckedCreateInput = {
    id?: number
    code: string
    type?: string | null
    inner_d: number
    outer_D: number
    width_B: number
    C?: number | null
    C0?: number | null
    e?: number | null
    Y?: number | null
    alpha_deg?: number | null
    is_active?: boolean | null
  }

  export type bearingsUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    inner_d?: FloatFieldUpdateOperationsInput | number
    outer_D?: FloatFieldUpdateOperationsInput | number
    width_B?: FloatFieldUpdateOperationsInput | number
    C?: NullableFloatFieldUpdateOperationsInput | number | null
    C0?: NullableFloatFieldUpdateOperationsInput | number | null
    e?: NullableFloatFieldUpdateOperationsInput | number | null
    Y?: NullableFloatFieldUpdateOperationsInput | number | null
    alpha_deg?: NullableFloatFieldUpdateOperationsInput | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type bearingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    inner_d?: FloatFieldUpdateOperationsInput | number
    outer_D?: FloatFieldUpdateOperationsInput | number
    width_B?: FloatFieldUpdateOperationsInput | number
    C?: NullableFloatFieldUpdateOperationsInput | number | null
    C0?: NullableFloatFieldUpdateOperationsInput | number | null
    e?: NullableFloatFieldUpdateOperationsInput | number | null
    Y?: NullableFloatFieldUpdateOperationsInput | number | null
    alpha_deg?: NullableFloatFieldUpdateOperationsInput | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type bearingsCreateManyInput = {
    id?: number
    code: string
    type?: string | null
    inner_d: number
    outer_D: number
    width_B: number
    C?: number | null
    C0?: number | null
    e?: number | null
    Y?: number | null
    alpha_deg?: number | null
    is_active?: boolean | null
  }

  export type bearingsUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    inner_d?: FloatFieldUpdateOperationsInput | number
    outer_D?: FloatFieldUpdateOperationsInput | number
    width_B?: FloatFieldUpdateOperationsInput | number
    C?: NullableFloatFieldUpdateOperationsInput | number | null
    C0?: NullableFloatFieldUpdateOperationsInput | number | null
    e?: NullableFloatFieldUpdateOperationsInput | number | null
    Y?: NullableFloatFieldUpdateOperationsInput | number | null
    alpha_deg?: NullableFloatFieldUpdateOperationsInput | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type bearingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    type?: NullableStringFieldUpdateOperationsInput | string | null
    inner_d?: FloatFieldUpdateOperationsInput | number
    outer_D?: FloatFieldUpdateOperationsInput | number
    width_B?: FloatFieldUpdateOperationsInput | number
    C?: NullableFloatFieldUpdateOperationsInput | number | null
    C0?: NullableFloatFieldUpdateOperationsInput | number | null
    e?: NullableFloatFieldUpdateOperationsInput | number | null
    Y?: NullableFloatFieldUpdateOperationsInput | number | null
    alpha_deg?: NullableFloatFieldUpdateOperationsInput | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type chainsCreateInput = {
    pitch: number
    breaking_load?: number | null
    mass_per_m?: number | null
    A_mm2?: number | null
    s_allow?: number | null
    n_ref?: number | null
    is_active?: boolean | null
  }

  export type chainsUncheckedCreateInput = {
    id?: number
    pitch: number
    breaking_load?: number | null
    mass_per_m?: number | null
    A_mm2?: number | null
    s_allow?: number | null
    n_ref?: number | null
    is_active?: boolean | null
  }

  export type chainsUpdateInput = {
    pitch?: FloatFieldUpdateOperationsInput | number
    breaking_load?: NullableFloatFieldUpdateOperationsInput | number | null
    mass_per_m?: NullableFloatFieldUpdateOperationsInput | number | null
    A_mm2?: NullableFloatFieldUpdateOperationsInput | number | null
    s_allow?: NullableFloatFieldUpdateOperationsInput | number | null
    n_ref?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type chainsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pitch?: FloatFieldUpdateOperationsInput | number
    breaking_load?: NullableFloatFieldUpdateOperationsInput | number | null
    mass_per_m?: NullableFloatFieldUpdateOperationsInput | number | null
    A_mm2?: NullableFloatFieldUpdateOperationsInput | number | null
    s_allow?: NullableFloatFieldUpdateOperationsInput | number | null
    n_ref?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type chainsCreateManyInput = {
    id?: number
    pitch: number
    breaking_load?: number | null
    mass_per_m?: number | null
    A_mm2?: number | null
    s_allow?: number | null
    n_ref?: number | null
    is_active?: boolean | null
  }

  export type chainsUpdateManyMutationInput = {
    pitch?: FloatFieldUpdateOperationsInput | number
    breaking_load?: NullableFloatFieldUpdateOperationsInput | number | null
    mass_per_m?: NullableFloatFieldUpdateOperationsInput | number | null
    A_mm2?: NullableFloatFieldUpdateOperationsInput | number | null
    s_allow?: NullableFloatFieldUpdateOperationsInput | number | null
    n_ref?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type chainsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pitch?: FloatFieldUpdateOperationsInput | number
    breaking_load?: NullableFloatFieldUpdateOperationsInput | number | null
    mass_per_m?: NullableFloatFieldUpdateOperationsInput | number | null
    A_mm2?: NullableFloatFieldUpdateOperationsInput | number | null
    s_allow?: NullableFloatFieldUpdateOperationsInput | number | null
    n_ref?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type motorsCreateInput = {
    series?: string | null
    code: string
    P_dm: Decimal | DecimalJsLike | number | string
    n_dm: number
    efficiency?: Decimal | DecimalJsLike | number | string | null
    cos_phi?: Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: Decimal | DecimalJsLike | number | string | null
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
    series?: string | null
    code: string
    P_dm: Decimal | DecimalJsLike | number | string
    n_dm: number
    efficiency?: Decimal | DecimalJsLike | number | string | null
    cos_phi?: Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: Decimal | DecimalJsLike | number | string | null
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
    series?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
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
    series?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
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
    series?: string | null
    code: string
    P_dm: Decimal | DecimalJsLike | number | string
    n_dm: number
    efficiency?: Decimal | DecimalJsLike | number | string | null
    cos_phi?: Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: Decimal | DecimalJsLike | number | string | null
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
    series?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
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
    series?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
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

  export type material_gradesCreateInput = {
    grade_name: string
    HB: number
    sigma_b: number
    sigma_ch: number
    sigma_Hlim: number
    sigma_Flim: number
  }

  export type material_gradesUncheckedCreateInput = {
    id?: number
    grade_name: string
    HB: number
    sigma_b: number
    sigma_ch: number
    sigma_Hlim: number
    sigma_Flim: number
  }

  export type material_gradesUpdateInput = {
    grade_name?: StringFieldUpdateOperationsInput | string
    HB?: IntFieldUpdateOperationsInput | number
    sigma_b?: FloatFieldUpdateOperationsInput | number
    sigma_ch?: FloatFieldUpdateOperationsInput | number
    sigma_Hlim?: FloatFieldUpdateOperationsInput | number
    sigma_Flim?: FloatFieldUpdateOperationsInput | number
  }

  export type material_gradesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    grade_name?: StringFieldUpdateOperationsInput | string
    HB?: IntFieldUpdateOperationsInput | number
    sigma_b?: FloatFieldUpdateOperationsInput | number
    sigma_ch?: FloatFieldUpdateOperationsInput | number
    sigma_Hlim?: FloatFieldUpdateOperationsInput | number
    sigma_Flim?: FloatFieldUpdateOperationsInput | number
  }

  export type material_gradesCreateManyInput = {
    id?: number
    grade_name: string
    HB: number
    sigma_b: number
    sigma_ch: number
    sigma_Hlim: number
    sigma_Flim: number
  }

  export type material_gradesUpdateManyMutationInput = {
    grade_name?: StringFieldUpdateOperationsInput | string
    HB?: IntFieldUpdateOperationsInput | number
    sigma_b?: FloatFieldUpdateOperationsInput | number
    sigma_ch?: FloatFieldUpdateOperationsInput | number
    sigma_Hlim?: FloatFieldUpdateOperationsInput | number
    sigma_Flim?: FloatFieldUpdateOperationsInput | number
  }

  export type material_gradesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    grade_name?: StringFieldUpdateOperationsInput | string
    HB?: IntFieldUpdateOperationsInput | number
    sigma_b?: FloatFieldUpdateOperationsInput | number
    sigma_ch?: FloatFieldUpdateOperationsInput | number
    sigma_Hlim?: FloatFieldUpdateOperationsInput | number
    sigma_Flim?: FloatFieldUpdateOperationsInput | number
  }

  export type standard_modulesCreateInput = {
    value: number
  }

  export type standard_modulesUncheckedCreateInput = {
    id?: number
    value: number
  }

  export type standard_modulesUpdateInput = {
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type standard_modulesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type standard_modulesCreateManyInput = {
    id?: number
    value: number
  }

  export type standard_modulesUpdateManyMutationInput = {
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type standard_modulesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: FloatFieldUpdateOperationsInput | number
  }

  export type standard_center_distancesCreateInput = {
    value: number
  }

  export type standard_center_distancesUncheckedCreateInput = {
    id?: number
    value: number
  }

  export type standard_center_distancesUpdateInput = {
    value?: IntFieldUpdateOperationsInput | number
  }

  export type standard_center_distancesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
  }

  export type standard_center_distancesCreateManyInput = {
    id?: number
    value: number
  }

  export type standard_center_distancesUpdateManyMutationInput = {
    value?: IntFieldUpdateOperationsInput | number
  }

  export type standard_center_distancesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
  }

  export type standard_shaft_diametersCreateInput = {
    value: number
  }

  export type standard_shaft_diametersUncheckedCreateInput = {
    id?: number
    value: number
  }

  export type standard_shaft_diametersUpdateInput = {
    value?: IntFieldUpdateOperationsInput | number
  }

  export type standard_shaft_diametersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
  }

  export type standard_shaft_diametersCreateManyInput = {
    id?: number
    value: number
  }

  export type standard_shaft_diametersUpdateManyMutationInput = {
    value?: IntFieldUpdateOperationsInput | number
  }

  export type standard_shaft_diametersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
  }

  export type key_dimensionsCreateInput = {
    d_min: number
    d_max: number
    b: number
    h: number
    t1: number
    t2: number
  }

  export type key_dimensionsUncheckedCreateInput = {
    id?: number
    d_min: number
    d_max: number
    b: number
    h: number
    t1: number
    t2: number
  }

  export type key_dimensionsUpdateInput = {
    d_min?: IntFieldUpdateOperationsInput | number
    d_max?: IntFieldUpdateOperationsInput | number
    b?: IntFieldUpdateOperationsInput | number
    h?: IntFieldUpdateOperationsInput | number
    t1?: FloatFieldUpdateOperationsInput | number
    t2?: FloatFieldUpdateOperationsInput | number
  }

  export type key_dimensionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    d_min?: IntFieldUpdateOperationsInput | number
    d_max?: IntFieldUpdateOperationsInput | number
    b?: IntFieldUpdateOperationsInput | number
    h?: IntFieldUpdateOperationsInput | number
    t1?: FloatFieldUpdateOperationsInput | number
    t2?: FloatFieldUpdateOperationsInput | number
  }

  export type key_dimensionsCreateManyInput = {
    id?: number
    d_min: number
    d_max: number
    b: number
    h: number
    t1: number
    t2: number
  }

  export type key_dimensionsUpdateManyMutationInput = {
    d_min?: IntFieldUpdateOperationsInput | number
    d_max?: IntFieldUpdateOperationsInput | number
    b?: IntFieldUpdateOperationsInput | number
    h?: IntFieldUpdateOperationsInput | number
    t1?: FloatFieldUpdateOperationsInput | number
    t2?: FloatFieldUpdateOperationsInput | number
  }

  export type key_dimensionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    d_min?: IntFieldUpdateOperationsInput | number
    d_max?: IntFieldUpdateOperationsInput | number
    b?: IntFieldUpdateOperationsInput | number
    h?: IntFieldUpdateOperationsInput | number
    t1?: FloatFieldUpdateOperationsInput | number
    t2?: FloatFieldUpdateOperationsInput | number
  }

  export type standard_key_lengthsCreateInput = {
    value: number
  }

  export type standard_key_lengthsUncheckedCreateInput = {
    id?: number
    value: number
  }

  export type standard_key_lengthsUpdateInput = {
    value?: IntFieldUpdateOperationsInput | number
  }

  export type standard_key_lengthsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
  }

  export type standard_key_lengthsCreateManyInput = {
    id?: number
    value: number
  }

  export type standard_key_lengthsUpdateManyMutationInput = {
    value?: IntFieldUpdateOperationsInput | number
  }

  export type standard_key_lengthsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: IntFieldUpdateOperationsInput | number
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type bearingsCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    type?: SortOrder
    inner_d?: SortOrder
    outer_D?: SortOrder
    width_B?: SortOrder
    C?: SortOrder
    C0?: SortOrder
    e?: SortOrder
    Y?: SortOrder
    alpha_deg?: SortOrder
    is_active?: SortOrder
  }

  export type bearingsAvgOrderByAggregateInput = {
    id?: SortOrder
    inner_d?: SortOrder
    outer_D?: SortOrder
    width_B?: SortOrder
    C?: SortOrder
    C0?: SortOrder
    e?: SortOrder
    Y?: SortOrder
    alpha_deg?: SortOrder
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
    e?: SortOrder
    Y?: SortOrder
    alpha_deg?: SortOrder
    is_active?: SortOrder
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
    e?: SortOrder
    Y?: SortOrder
    alpha_deg?: SortOrder
    is_active?: SortOrder
  }

  export type bearingsSumOrderByAggregateInput = {
    id?: SortOrder
    inner_d?: SortOrder
    outer_D?: SortOrder
    width_B?: SortOrder
    C?: SortOrder
    C0?: SortOrder
    e?: SortOrder
    Y?: SortOrder
    alpha_deg?: SortOrder
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

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type chainsCountOrderByAggregateInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrder
    mass_per_m?: SortOrder
    A_mm2?: SortOrder
    s_allow?: SortOrder
    n_ref?: SortOrder
    is_active?: SortOrder
  }

  export type chainsAvgOrderByAggregateInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrder
    mass_per_m?: SortOrder
    A_mm2?: SortOrder
    s_allow?: SortOrder
    n_ref?: SortOrder
  }

  export type chainsMaxOrderByAggregateInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrder
    mass_per_m?: SortOrder
    A_mm2?: SortOrder
    s_allow?: SortOrder
    n_ref?: SortOrder
    is_active?: SortOrder
  }

  export type chainsMinOrderByAggregateInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrder
    mass_per_m?: SortOrder
    A_mm2?: SortOrder
    s_allow?: SortOrder
    n_ref?: SortOrder
    is_active?: SortOrder
  }

  export type chainsSumOrderByAggregateInput = {
    id?: SortOrder
    pitch?: SortOrder
    breaking_load?: SortOrder
    mass_per_m?: SortOrder
    A_mm2?: SortOrder
    s_allow?: SortOrder
    n_ref?: SortOrder
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
    series?: SortOrder
    code?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    efficiency?: SortOrder
    cos_phi?: SortOrder
    t_start_ratio?: SortOrder
    t_max_ratio?: SortOrder
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
    efficiency?: SortOrder
    cos_phi?: SortOrder
    t_start_ratio?: SortOrder
    t_max_ratio?: SortOrder
    mass_kg?: SortOrder
    price?: SortOrder
    deletedBy?: SortOrder
  }

  export type motorsMaxOrderByAggregateInput = {
    id?: SortOrder
    series?: SortOrder
    code?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    efficiency?: SortOrder
    cos_phi?: SortOrder
    t_start_ratio?: SortOrder
    t_max_ratio?: SortOrder
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
    series?: SortOrder
    code?: SortOrder
    P_dm?: SortOrder
    n_dm?: SortOrder
    efficiency?: SortOrder
    cos_phi?: SortOrder
    t_start_ratio?: SortOrder
    t_max_ratio?: SortOrder
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
    efficiency?: SortOrder
    cos_phi?: SortOrder
    t_start_ratio?: SortOrder
    t_max_ratio?: SortOrder
    mass_kg?: SortOrder
    price?: SortOrder
    deletedBy?: SortOrder
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

  export type material_gradesOrderByRelevanceInput = {
    fields: material_gradesOrderByRelevanceFieldEnum | material_gradesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type material_gradesCountOrderByAggregateInput = {
    id?: SortOrder
    grade_name?: SortOrder
    HB?: SortOrder
    sigma_b?: SortOrder
    sigma_ch?: SortOrder
    sigma_Hlim?: SortOrder
    sigma_Flim?: SortOrder
  }

  export type material_gradesAvgOrderByAggregateInput = {
    id?: SortOrder
    HB?: SortOrder
    sigma_b?: SortOrder
    sigma_ch?: SortOrder
    sigma_Hlim?: SortOrder
    sigma_Flim?: SortOrder
  }

  export type material_gradesMaxOrderByAggregateInput = {
    id?: SortOrder
    grade_name?: SortOrder
    HB?: SortOrder
    sigma_b?: SortOrder
    sigma_ch?: SortOrder
    sigma_Hlim?: SortOrder
    sigma_Flim?: SortOrder
  }

  export type material_gradesMinOrderByAggregateInput = {
    id?: SortOrder
    grade_name?: SortOrder
    HB?: SortOrder
    sigma_b?: SortOrder
    sigma_ch?: SortOrder
    sigma_Hlim?: SortOrder
    sigma_Flim?: SortOrder
  }

  export type material_gradesSumOrderByAggregateInput = {
    id?: SortOrder
    HB?: SortOrder
    sigma_b?: SortOrder
    sigma_ch?: SortOrder
    sigma_Hlim?: SortOrder
    sigma_Flim?: SortOrder
  }

  export type standard_modulesCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_modulesAvgOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_modulesMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_modulesMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_modulesSumOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_center_distancesCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_center_distancesAvgOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_center_distancesMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_center_distancesMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_center_distancesSumOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_shaft_diametersCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_shaft_diametersAvgOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_shaft_diametersMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_shaft_diametersMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_shaft_diametersSumOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type key_dimensionsCountOrderByAggregateInput = {
    id?: SortOrder
    d_min?: SortOrder
    d_max?: SortOrder
    b?: SortOrder
    h?: SortOrder
    t1?: SortOrder
    t2?: SortOrder
  }

  export type key_dimensionsAvgOrderByAggregateInput = {
    id?: SortOrder
    d_min?: SortOrder
    d_max?: SortOrder
    b?: SortOrder
    h?: SortOrder
    t1?: SortOrder
    t2?: SortOrder
  }

  export type key_dimensionsMaxOrderByAggregateInput = {
    id?: SortOrder
    d_min?: SortOrder
    d_max?: SortOrder
    b?: SortOrder
    h?: SortOrder
    t1?: SortOrder
    t2?: SortOrder
  }

  export type key_dimensionsMinOrderByAggregateInput = {
    id?: SortOrder
    d_min?: SortOrder
    d_max?: SortOrder
    b?: SortOrder
    h?: SortOrder
    t1?: SortOrder
    t2?: SortOrder
  }

  export type key_dimensionsSumOrderByAggregateInput = {
    id?: SortOrder
    d_min?: SortOrder
    d_max?: SortOrder
    b?: SortOrder
    h?: SortOrder
    t1?: SortOrder
    t2?: SortOrder
  }

  export type standard_key_lengthsCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_key_lengthsAvgOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_key_lengthsMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_key_lengthsMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type standard_key_lengthsSumOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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
    series?: string | null
    code: string
    P_dm: Decimal | DecimalJsLike | number | string
    n_dm: number
    efficiency?: Decimal | DecimalJsLike | number | string | null
    cos_phi?: Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: Decimal | DecimalJsLike | number | string | null
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
    series?: string | null
    code: string
    P_dm: Decimal | DecimalJsLike | number | string
    n_dm: number
    efficiency?: Decimal | DecimalJsLike | number | string | null
    cos_phi?: Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: Decimal | DecimalJsLike | number | string | null
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
    series?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
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
    series?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    P_dm?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    n_dm?: IntFieldUpdateOperationsInput | number
    efficiency?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    cos_phi?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_start_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    t_max_ratio?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
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