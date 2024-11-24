import type { IIconProps } from './types/IIconProps';

function YandexIcon(props: IIconProps) {
  const { ...otherProps } = props;

  return (
    <svg viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'} {...otherProps}>
      <g clipPath={'url(#clip0_998_2189)'}>
        <path
          d={
            'M0 12C0 5.3724 5.3712 0 12 0C18.6264 0 24 5.3724 24 12C24 18.6276 18.6264 24 12 24C5.3712 24 0 18.6276 0 12Z'
          }
          fill={'#FF0000'}
        />
        <path
          d={
            'M13.3202 7.66606H12.3962C10.7022 7.66606 9.81123 8.52406 9.81123 9.78906C9.81123 11.2191 10.4272 11.8891 11.6922 12.7481L12.7372 13.4521L9.73423 17.9391H7.49023L10.1852 13.9251C8.63524 12.8141 7.76523 11.7351 7.76523 9.91006C7.76523 7.62206 9.36023 6.06006 12.3852 6.06006H15.3882V17.9281H13.3202V7.66606Z'
          }
          fill={'white'}
        />
      </g>
      <defs>
        <clipPath id={'clip0_998_2189'}>
          <rect fill={'white'} height={'24'} width={'24'} />
        </clipPath>
      </defs>
    </svg>
  );
}

export { YandexIcon };
