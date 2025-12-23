import { GenericSetFilterConfig } from './generic-set-filter.component';

/**
 * Predefined filter configurations for common column types
 * These can be used directly in your column definitions
 */

export const FILTER_CONFIGS = {
  // Department filter configuration
  DEPARTMENT: {
    values: [
      'Sales',
      'Marketing',
      'Engineering',
      'Design',
      'Finance',
      'Accounting',
      'Human Resources',
      'Operations',
      'Logistics',
      'IT',
      'Support',
      'Legal',
      'Compliance',
      'UX',
      'Communications',
      'Security',
      'Recruiting',
      'Research',
      'Business Development',
      'Supply Chain',
      'Treasury',
      'Infrastructure',
      'DevOps',
      'Training',
      'Account Management',
      'Contracts',
      'Product',
      'Planning'
    ],
    searchPlaceholder: 'Search departments...',
    handleArrayValues: true
  } as GenericSetFilterConfig,

  // Status filter configuration
  STATUS: {
    values: ['Active', 'Inactive', 'Pending', 'Completed', 'Archived', 'Draft'],
    searchPlaceholder: 'Search status...',
    handleArrayValues: false,
    caseSensitive: false
  } as GenericSetFilterConfig,

  // Priority filter configuration
  PRIORITY: {
    values: ['Low', 'Medium', 'High', 'Critical'],
    searchPlaceholder: 'Search priority...',
    handleArrayValues: false
  } as GenericSetFilterConfig,

  // Role filter configuration
  ROLE: {
    values: ['Admin', 'Manager', 'Employee', 'Contractor', 'Viewer'],
    searchPlaceholder: 'Search roles...',
    handleArrayValues: true
  } as GenericSetFilterConfig,

  // Region filter configuration
  REGION: {
    values: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'],
    searchPlaceholder: 'Search regions...',
    handleArrayValues: false
  } as GenericSetFilterConfig,
};

/**
 * Helper function to create a custom set filter configuration
 * @param values - Array of values for the filter
 * @param options - Optional configuration options
 * @returns GenericSetFilterConfig object
 */
export function createSetFilterConfig(
  values: string[],
  options?: {
    searchPlaceholder?: string;
    field?: string;
    handleArrayValues?: boolean;
    caseSensitive?: boolean;
  }
): GenericSetFilterConfig {
  return {
    values,
    searchPlaceholder: options?.searchPlaceholder || 'Search...',
    field: options?.field,
    handleArrayValues: options?.handleArrayValues !== false,
    caseSensitive: options?.caseSensitive || false
  };
}

/**
 * Helper function to create filter params for AG Grid column definition
 * @param config - The filter configuration
 * @returns Object to be used in column definition's filter property
 */
export function createFilterParams(config: GenericSetFilterConfig) {
  return {
    config
  };
}
