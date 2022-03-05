import {v4 as uuidv4} from 'uuid';

/**
 * This is the pure data that TODO model gets.
 */
export interface TODOData {
  /**
   * The unique TODO's ID.
   */
  id: string;
  /**
   * The name of the TODO.
   */
  name: string;
  /**
   * The time that TODO is created.
   */
  createdAt: Date;
  /**
   * The time that TODO is modified last time.
   */
  modifiedAt: Date;
  /**
   * [FUTURE] The time that TODO is reminded.
   */
  remindAt?: Date;
  /**
   * Tagging.
   */
  tags: string[];
  /**
   * The description.
   */
  description: string;
  /**
   * Represents if the to-do is completed.
   */
  isCompleted: boolean;
}

export interface TODOConstructorOptions {
    /**
     * Declare if the TODO is newly created.
     *
     * If it's set to `true`,
     * a fresh new UUID(v4) will be created for the TODO's id.
     *
     * It will COVER THE OLD id even the raw data is assumed
     */
    newToDo?: boolean;
    /**
     * Assume the raw TODO data.
     */
    data?: TODOData;
}

export class TODO implements TODOData {
  id: string = '';

  name: string = '';

  createdAt: Date = new Date();

  modifiedAt: Date = new Date();

  remindAt?: Date = undefined;

  tags: string[] = [];

  description: string = '';

  isCompleted: boolean = false;

  constructor(options?: TODOConstructorOptions) {
    if (options) {
      if (options.data) { // If raw data in options.data exists
        // Then cover the raw data
        this.id = options.data.id;
        this.name = options.data.name;
        this.createdAt = options.data.createdAt;
        this.modifiedAt = options.data.modifiedAt;
        // Nullish Coalescing.
        // See https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html
        this.remindAt = options.data.remindAt;
        this.tags = options.data.tags;
        this.description = options.data.description;
        this.isCompleted = options.data.isCompleted;
      }
      this.id = options.newToDo ? uuidv4() : this.id;
    } else {
      this.id = uuidv4();
    }
  }

  static fromJSON(json: string): TODO {
    const rawData = JSON.parse(json);
    let error: unknown;
    try {
      const result = new TODO({
        newToDo: false,
        data: rawData,
      });
      return result;
    } catch (e) {
      if (e instanceof TypeError) {
        throw e;
      }
      error = e;
    }
    const result = new TODO();
    result.name = 'Error: read the description';
    result.description = String(error);
    return result;
  }
}
