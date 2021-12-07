import * as React from 'react';
import styles from './MyInfo.module.scss';
import { IMyInfoProps } from './IMyInfoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Overview from './Overview';

export default class MyInfo extends React.Component<IMyInfoProps, {}> {
  public render(): React.ReactElement<IMyInfoProps> {
    return (
      <div className={ styles.myInfo }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <React.Fragment>
                  <Overview context= {this.props.context}>
                  </Overview>
                </React.Fragment>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
