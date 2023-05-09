import type {ComponentProps} from 'react';
import {Button, Text} from 'shared';

import {getYearFormatOption} from './utils';

import {useTranslation} from '~/hooks/useTranslation';

type TextColor = ComponentProps<typeof Text>['color'];

interface Translation {
  /**
   * The translation key to pass to the translate (t) function.
   *
   * @example: `description` for `SoldOutButton.description`
   * @example: 'description, {val: active?.start}'
   */
  key: string;
  /**
   * The dynamic value to pass to your translation key.
   *
   * Consider the `AvailableSoon` button as an example where
   * we pass a date as an additional value which is then
   * internationalized.
   *
   * @example `new Date(active.end)`
   */
  value?: any;
}

type ButtonComponentProps =
  | JSX.Element
  | {
      disabled?: boolean;
      /**
       * When passing a label, this component will make use of
       * the provided `translationNamespace` prop. This is to ensure
       * that the button rendered is aligned with our
       * i18n guiding principles.
       */
      label: Translation;
    };

interface ButtonWrapperProps {
  button: ButtonComponentProps;
  text?: Translation;
  textColor?: TextColor;
  /**
   * The translation namespace to use for component translations.
   *
   * @example: `SoldOutButton`
   * @example: `[AvailableSoonButton, SoldOutButton]`
   */
  translationNamespace?: string;
}

const FORMAT_OPTIONS = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export const ButtonWrapper = ({
  button,
  text,
  textColor,
  translationNamespace,
}: ButtonWrapperProps) => {
  const {t} = useTranslation(translationNamespace);

  return (
    <div className="sbc-w-full">
      {'label' in button ? (
        <Button
          {...button}
          aria-label={t(button.label.key, {value: button.label.value})}
          label={t(button.label.key, {
            value: button.label.value,
            formatParams: {
              value: {
                ...FORMAT_OPTIONS,
                year: getYearFormatOption(button.label.value),
              },
            },
          })}
          fullWidth
          size="Lg"
        />
      ) : (
        button
      )}

      {text ? (
        <Text
          as="p"
          color={textColor}
          className="sbc-mt-2 sbc-w-full sbc-cursor-default sbc-text-center"
          data-testid="button-wrapper-text"
          variant="bodyMd"
        >
          {t(text.key, {
            value: text.value,
            formatParams: {
              value: {
                ...FORMAT_OPTIONS,
                year: getYearFormatOption(text.value),
              },
            },
          })}
        </Text>
      ) : null}
    </div>
  );
};
