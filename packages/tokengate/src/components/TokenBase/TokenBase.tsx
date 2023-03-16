import {ReactNode} from 'react';
import {Text} from 'shared';

interface TokenBaseProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  icon: React.ReactNode;
  round: boolean;
  badge?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const TokenBase = ({
  title,
  subtitle,
  icon,
  round,
  badge,
  rightContent,
}: TokenBaseProps) => (
  <div className="sbc-flex sbc-w-full sbc-flex-row sbc-items-center sbc-gap-x-3">
    <div className="sbc-relative sbc-h-12 sbc-w-12">
      <div
        className={`sbc-h-full sbc-w-full sbc-overflow-hidden ${
          round ? 'sbc-rounded-full' : 'sbc-rounded'
        }`}
      >
        {icon}
      </div>

      {badge ? (
        <div className="sbc-absolute sbc-right-[-2px] sbc-bottom-[-2px] sbc-rounded-full sbc-bg-tokengate">
          {badge}
        </div>
      ) : null}
    </div>

    <div className="sbc-flex-grow">
      <Text as="p" className="sbc-capitalize" variant="bodyLg">
        {title}
      </Text>

      {subtitle ? (
        <Text
          as="p"
          className="sbc-capitalize"
          color="secondary"
          variant="bodyMd"
        >
          {subtitle}
        </Text>
      ) : null}
    </div>

    {rightContent}
  </div>
);

export {TokenBase};
