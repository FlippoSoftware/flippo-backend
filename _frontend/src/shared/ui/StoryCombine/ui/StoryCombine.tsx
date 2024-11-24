import { type TStoryCombineProps } from '../types/TStoryCombine';
import st from './StoryCombine.module.scss';

function StoryCombine<E extends object>(props: TStoryCombineProps<E>) {
  const { args, component, decorator, groups } = props;

  const Component = component;

  return (
    <ul className={st.groups}>
      {groups.map((group, index) => (
        <li className={st.group} key={group.name + index.toString()}>
          <h2 className={st.groupName}>{group.name}</h2>
          <div className={st.groupVariants}>
            {group.variants.map((variant, index) => (
              <div className={st.variant} key={group.name + variant.name + index.toString()}>
                <h3 className={st.variantName}>{variant.name}</h3>
                {variant.components.map((componentProps, index) => {
                  const componentArgs: E = {
                    ...args,
                    ...group.groupArgs,
                    ...variant.variantArgs,
                    ...componentProps
                  } as E;

                  return (
                    <div key={group.name + variant.name + index.toString() + '-component'}>
                      {decorator ? decorator(<Component {...componentArgs} />) : <Component {...componentArgs} />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default StoryCombine;
