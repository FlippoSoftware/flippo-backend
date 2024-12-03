import { type TLoadingIconProps } from './types/TLoadingIconProps';

function DotsFade(props: TLoadingIconProps) {
  return (
    <svg height={24} viewBox={'0 0 24 24'} width={24} xmlns={'http://www.w3.org/2000/svg'} {...props}>
      <circle cx={4} cy={12} fill={'currentColor'} r={3}>
        <animate
          attributeName={'opacity'}
          begin={'0;svgSpinners3DotsFade1.end-0.25s'}
          dur={'0.75s'}
          fill={'freeze'}
          id={'svgSpinners3DotsFade0'}
          values={'1;0.2'}
        ></animate>
      </circle>
      <circle cx={12} cy={12} fill={'currentColor'} opacity={0.4} r={3}>
        <animate
          attributeName={'opacity'}
          begin={'svgSpinners3DotsFade0.begin+0.15s'}
          dur={'0.75s'}
          fill={'freeze'}
          values={'1;0.2'}
        ></animate>
      </circle>
      <circle cx={20} cy={12} fill={'currentColor'} opacity={0.3} r={3}>
        <animate
          attributeName={'opacity'}
          begin={'svgSpinners3DotsFade0.begin+0.3s'}
          dur={'0.75s'}
          fill={'freeze'}
          id={'svgSpinners3DotsFade1'}
          values={'1;0.2'}
        ></animate>
      </circle>
    </svg>
  );
}

export default DotsFade;
