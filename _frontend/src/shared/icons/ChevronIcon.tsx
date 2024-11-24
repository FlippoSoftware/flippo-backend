import type { IIconProps } from './types/IIconProps';

interface ChevronIconProps extends IIconProps {
  type?: 'bottom' | 'left' | 'right' | 'top';
}

const ChevronTypes = {
  bottom: 'M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z',
  left: 'M14 18L8 12L14 6L15.4 7.4L10.8 12L15.4 16.6L14 18Z',
  right: 'M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z',
  top: 'M12 10.8L7.4 15.4L6 14L12 8L18 14L16.6 15.4L12 10.8Z'
};

function ChevronIcon(props: ChevronIconProps) {
  const { isDefaultFill, type = 'left', ...otherProps } = props;

  return (
    <svg
      fill={isDefaultFill ? 'currentColor' : '--neutral-80'}
      viewBox={'0 0 24 24'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...otherProps}
    >
      <path d={ChevronTypes[type]} />
    </svg>
  );
}

export { ChevronIcon };
