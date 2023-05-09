/* eslint-disable no-restricted-imports */
// Allow useTranslation only within this file.
import {Namespace} from 'i18next';
import {
  useTranslation as useI18nTranslation,
  UseTranslationOptions,
} from 'react-i18next';

import {i18n} from '~/providers/I18nProvider';

export function useTranslation(
  namespace: Namespace,
  options?: UseTranslationOptions,
) {
  return useI18nTranslation(namespace, {...options, i18n});
}
