import type { PlainSearchParameters } from 'algoliasearch-helper';

type TaskBaseArgs = {
  application_id: string;
  index_name: string;
  nb_suggestions: number;
  nb_objects: number;
  output_application_id: string;
  wait: boolean;
};

export type ComparisonTaskArgs = TaskBaseArgs & { object_ids?: string[] };

export type ShoppingGuideTaskArgs = TaskBaseArgs & {
  search_parameters?: PlainSearchParameters;
};

export type Task = {
  /**
   * Arguments passed to the task.
   */
  args: ComparisonTaskArgs | ShoppingGuideTaskArgs;
  /**
   * Id of the task.
   */
  id: string;
  /**
   * Name of the task.
   */
  name: string;
  /**
   * Timestamp (in ns) of when the content was generated.
   */
  time_start: number;
};

export type TasksResponse = {
  tasks: Task[];
};
