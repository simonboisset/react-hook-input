import clsx from 'clsx';
import React from 'react';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Think in react',
    image: '/img/logo.svg',
    description: <>We are using hooks and contexts to have the best react compatibility and optimize rendering.</>,
  },
  {
    title: 'Yup schema validation',
    image: '/img/logo.svg',
    description: <>You can validate your inputs and nested inputs with yup schemas</>,
  },
  {
    title: '< 2kB',
    image: '/img/logo.svg',
    description: <>Bundle size : 1.3kB. You only need yup dependency for schema validation</>,
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
