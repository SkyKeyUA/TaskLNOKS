/** @format */

import React from 'react';

import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div style={{ margin: '20px 0px' }} className={styles.root}>
      <div className={styles.body}>
        {[...Array(20)].map((_, i) => (
          <span key={i} style={{ '--i': i + 1 } as React.CSSProperties}></span>
        ))}
      </div>
    </div>
  );
};
